// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (e.g., services.json, logo.png) from the public folder
app.use(express.static('public'));

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

// Define a master list of timeslots (static)
const masterTimeslots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

// Path to the JSON file that stores bookings persistently
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// Helper function to read bookings from the JSON file
const readBookings = async () => {
  try {
    const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {}; // Return an empty object if file doesn't exist
  }
};

// Helper function to write bookings to the JSON file
const writeBookings = async (bookings) => {
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
};

// GET endpoint: Return available timeslots for a given date
app.get('/api/timeslots/:date', async (req, res) => {
  const { date } = req.params;
  const bookings = await readBookings();
  const bookedTimes = bookings[date] || [];
  const availableTimes = masterTimeslots.filter(time => !bookedTimes.includes(time));
  res.json(availableTimes);
});

// POST endpoint: Book an appointment
app.post('/api/book', async (req, res) => {
  const { name, email, service, date, time } = req.body;
  if (!name || !email || !service || !date || !time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const bookings = await readBookings();
  if (bookings[date]?.includes(time)) {
    return res.status(400).json({ message: 'Time slot already taken' });
  }

  // Add the booking
  bookings[date] = [...(bookings[date] || []), time];
  await writeBookings(bookings);

  // Broadcast via WebSockets so other users get the update in real time
  io.emit('timeslotBooked', { date, time });
  res.json({ message: 'Booking confirmed' });
});

// Setup Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
