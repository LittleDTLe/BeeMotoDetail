import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", marginTop: "135px", marginBottom: "135px" }}>
      <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>Privacy Policy</h2>
        <p><strong>Last Updated:</strong> [Insert Date]</p>
        <p>We are committed to protecting your privacy. This policy outlines how we collect, use, and protect your data.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>1. Information We Collect</h3>
        <p>We collect personal, vehicle, and usage data to provide services and improve our website.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>2. How We Use Your Information</h3>
        <p>Data is used for service processing, communication, and legal compliance.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>3. Data Protection</h3>
        <p>We implement security measures but cannot guarantee absolute security.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>4. Third-Party Sharing</h3>
        <p>We do not sell your data but may share it for payment processing and compliance.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>5. Cookies and Tracking</h3>
        <p>Our website may use cookies for functionality and analytics.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>6. Your Rights</h3>
        <p>You can access, update, or delete your data and opt out of marketing communications.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;