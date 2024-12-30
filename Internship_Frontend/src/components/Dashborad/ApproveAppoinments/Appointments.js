
import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = ({ setSelectedMenu, setAppointmentForPrescription }) => {
  const [appointments, setAppointments] = useState([]);

  // Fetch accepted appointments from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/accepted-appointments")
      .then((response) => {
        setAppointments(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching accepted appointments:", error);
      });
  }, []);

  // Handle marking an appointment as completed and navigating to Add Prescription
  const handleCompleteAndAddPrescription = (appointment) => {
    axios
      .put(`http://localhost:8080/api/doctor/appointments/complete/${appointment.id}`)
      .then(() => {
        alert("Appointment marked as completed!");
        
        // Mark the appointment as completed locally by filtering it out from the list
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app.id !== appointment.id)
        );

        // Redirect to Add Prescription page and pass the appointment data
        setSelectedMenu("Add Prescriptions");
        setAppointmentForPrescription(appointment);
      })
      .catch((error) => {
        console.error("Error completing appointment:", error);
        alert("Failed to mark the appointment as completed.");
      });
  };

  return (
    <div className="appointments-container">
      <h2>Accepted Appointments</h2>
      {appointments.length === 0 ? (
        <p>You don't have any accepted appointments.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Appointment Date</th>
              <th>Reason</th>
              <th>Remarks</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient.patientName}</td>
                <td>{appointment.patient.email}</td>
                <td>{appointment.patient.mobileNo}</td>
                <td>{appointment.patient.age}</td>
                <td>{appointment.patient.gender}</td>
                <td>{appointment.patient.bloodGroup}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.remarks || "N/A"}</td>
                <td>
                  <span
                    className={`${
                      appointment.paymentmode === "ONLINE_PAY"
                        ? "online-pay"
                        : "cash"
                    }`}
                  >
                    {appointment.paymentmode === "ONLINE_PAY"
                      ? "Online Pay"
                      : "Cash"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleCompleteAndAddPrescription(appointment)}
                    className="complete-button"
                  >
                    Complete & Add Prescription
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;




