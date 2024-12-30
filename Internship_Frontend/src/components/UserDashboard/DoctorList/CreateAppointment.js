import React, { useState, useEffect } from "react";
import './CreateAppointment.css';

const CreateAppointment = ({ doctorEmail, doctorAvailability, onBack }) => {
  const [formData, setFormData] = useState({
    doctorEmail: doctorEmail,
    appointmentDate: "",
    reason: "",
    remarks: "",
    paymentmode: "ONLINE_PAY",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentDate = new Date(formData.appointmentDate);
    const availableFromDate = new Date(doctorAvailability.availableFromDate);
    const availableEndDate = new Date(doctorAvailability.availableEndDate);

    if (appointmentDate < availableFromDate || appointmentDate > availableEndDate) {
      setError(`Appointment date must be between ${doctorAvailability.availableFromDate} and ${doctorAvailability.availableEndDate}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text(); // Backend may return plain text or URL

      if (formData.paymentmode === "CASH") {
        setSuccessMessage("Appointment booked successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else if (formData.paymentmode === "ONLINE_PAY") {
        window.location.href = data; // Redirect to the payment URL
      } else {
        setError("Invalid payment mode selected.");
      }

      setFormData({
        doctorEmail: doctorEmail,
        appointmentDate: "",
        reason: "",
        remarks: "",
        paymentmode: "ONLINE_PAY",
      });
      setError(null);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError("Failed to create appointment. Please try again.");
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const success = queryParams.get("success");
    const appointmentId = queryParams.get("appointmentId");

    if (success === "true" && appointmentId) {
      setSuccessMessage(`Payment successful for appointment ID: ${appointmentId}`);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

  return (
    <div className="create-appointment-container">
      <h2>Create Appointment</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorEmail">Doctor Email:</label>
          <input type="email" id="doctorEmail" name="doctorEmail" value={formData.doctorEmail} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentmode">Payment Mode:</label>
          <select
            id="paymentmode"
            name="paymentmode"
            value={formData.paymentmode}
            onChange={handleChange}
            required
          >
            <option value="ONLINE_PAY">Online Payment</option>
            <option value="CASH">Cash</option>
          </select>
        </div>

        <button type="submit">Book Appointment</button>
        <button type="button" onClick={onBack} className="back-button">Back to Doctor List</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
