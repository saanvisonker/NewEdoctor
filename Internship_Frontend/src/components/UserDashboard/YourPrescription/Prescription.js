

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Prescription.css";
import jsPDF from "jspdf";

const Prescription = () => {
  const appointmentId = localStorage.getItem("appointmentId"); // Get appointmentId from localStorage
  const [prescription, setPrescription] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!appointmentId) {
      setError("Appointment ID is missing!");
      return;
    }

    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/prescriptions/${appointmentId}`
        );
        console.log(response.data); // Log the full response to check the structure
        setPrescription(response.data);
      } catch (err) {
        setError(`Error fetching prescription: ${err.response?.data?.message || err.message}`);
        console.error(err);
      }
    };

    fetchPrescription();
  }, [appointmentId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Your Prescription", 90, 10);

    doc.setFontSize(12);
    doc.text(`Doctor: Dr. ${prescription?.doctorName || "N/A"}`, 10, 30);
    doc.text(`Specialization: ${prescription?.doctorSpeciality || "N/A"}`, 10, 40);
    doc.text(`Charge: ${prescription?.doctorCharge || "N/A"}`, 10, 50);
    doc.text(`Email: ${prescription?.doctorEmail || "N/A"}`, 10, 60);

    doc.text(`Patient Name: ${prescription?.patientName || "N/A"}`, 10, 70);
    doc.text(`Patient Age: ${prescription?.patientAge || "N/A"}`, 10, 80);
    doc.text(`Reason: ${prescription?.reason || "N/A"}`, 10, 90);
    doc.text(`Advice: ${prescription?.advice || "N/A"}`, 10, 100);

    doc.text("Follow the advice properly to ensure a speedy recovery.", 10, 120);
    doc.text("Get Well Soon!", 10, 130);

    doc.save("prescription.pdf");
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!prescription) {
    return <div className="loading-message">Loading prescription...</div>;
  }

  return (
    <div className="prescription-component">
      <div className="prescription-container">
        <header>
          <h1>Your Prescription</h1>
        </header>
        <div className="prescription-card">
          <div className="header-section">
            <h2>E-DOCTOR</h2>
            <hr />
            <div className="doctor-details">
              <div className="doctor-details-column">
                <p>
                  <strong>Doctor Name:</strong> Dr. {prescription.doctorName || "N/A"}
                </p>
                <p>
                  <strong>Specialization:</strong> {prescription.doctorSpeciality || "N/A"}
                </p>
              </div>
              <div className="doctor-details-column">
                <p>
                  <strong>Fees:</strong> {prescription.doctorCharge || "N/A"}
                </p>
                <p>
                  <strong>Doctor Email:</strong> {prescription.doctorEmail || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="patient-section">
            <p>
              <strong>Patient Name:</strong> {prescription.patientName || "N/A"}
            </p>
            <p>
              <strong>Patient Email:</strong> {prescription.patientEmail || "N/A"}
            </p>
            <p>
              <strong>Patient Age:</strong> {prescription.patientAge || "N/A"}
            </p>
            <p>
              <strong>Patient Gender:</strong> {prescription.patientGender || "N/A"}
            </p>
          </div>

          <div className="details-section">
            <p>
              <strong>Reason:</strong> {prescription.reason || "N/A"}
            </p>
            <p>
              <strong>Advice:</strong> {prescription.advice || "N/A"}
            </p>
          </div>

          <div className="footer-section">
            <p>
              <strong>Note:</strong> Follow the advice properly to ensure a speedy recovery.
            </p>
            <p>
              <strong>Get Well Soon!</strong>
            </p>
            <button onClick={handleDownloadPDF} className="download-button">
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
