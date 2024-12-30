import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("Payment Successful!");
  const navigate = useNavigate();

  const appointmentId = searchParams.get("appointmentId");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/payment-success?appointmentId=${appointmentId}`
        );
        setSuccessMessage(response.data || "Payment Successful!");
      } catch (error) {
        console.error("Error fetching payment success:", error);
        setSuccessMessage("Payment successful! Thank you for your booking.");
      }
    };

    if (appointmentId) fetchPaymentStatus();
  }, [appointmentId]);

  const handleGoHome = () => {
    navigate("/user-dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <div>
          {/* Use public assets path */}
          <img
            src="/assets/img/success.gif" // Path relative to the public folder
            alt="Payment Success"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <h2 style={{ color: "#4caf50", margin: "20px 0" }}>Payment Success!</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>{successMessage}</p>
        <button
          onClick={handleGoHome}
          style={{
            marginTop: "20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
