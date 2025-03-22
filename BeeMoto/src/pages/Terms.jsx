import React from "react";

const TermsAndConditions = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", marginTop: "135px", marginBottom: "135px"}}>
      <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>Terms and Conditions</h2>
        <p><strong>Last Updated:</strong> [Insert Date]</p>
        <p>Welcome to [Your Shop Name]. By using our website and services, you agree to comply with the following terms and conditions.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>1. Services</h3>
        <p>We provide motorcycle detailing services, including washing, polishing, waxing, and more.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>2. Appointments and Cancellations</h3>
        <p>Bookings must be made in advance. Cancellations should be done 24 hours before the appointment.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>3. Pricing and Payments</h3>
        <p>Prices are listed on our website and may change without notice.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>4. Liability and Damage</h3>
        <p>We are not responsible for pre-existing damage or personal belongings left on the motorcycle.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>5. Warranties and Guarantees</h3>
        <p>We strive for satisfaction but do not guarantee specific results.</p>
        
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>6. Governing Law</h3>
        <p>These terms are governed by the laws of [Your State/Country].</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;