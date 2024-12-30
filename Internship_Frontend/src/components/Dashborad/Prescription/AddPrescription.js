// import React, { useState } from "react";
// import axios from "axios"; // Import axios
// import './AddPrescription.css';

// const AddPrescription = ({ appointment }) => {
//   const [patientName, setPatientName] = useState(appointment?.patient?.patientName || "");
//   const [patientEmail, setPatientEmail] = useState(appointment?.patient?.email || "");
//   const [reason, setReason] = useState(appointment?.reason || "");
//   const [advice, setAdvice] = useState("");
//   const [message, setMessage] = useState(""); // For success/error messages
//   const [messageType, setMessageType] = useState(""); // Success or error type

//   // Handle the form submission for the prescription
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const prescriptionData = {
//       patientName,
//       patientEmail,
//       reason,
//       advice,
//     };

//     try {
//       // Make a POST request to the backend
//       const response = await axios.post("http://localhost:8080/api/doctor/prescriptions", prescriptionData);

//       if (response.status === 201) {
//         setMessage("Prescription added successfully!");
//         setMessageType("success");
//       }
//     } catch (error) {
//       console.error("Error adding prescription:", error);
//       setMessage("Failed to add prescription. Please try again.");
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className="add-prescription">
//       {/* Message */}
//       {message && (
//         <div className={`message ${messageType}`}>
//           {message}
//         </div>
//       )}

//       <h2>Add Prescription</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Patient Details */}
//         <div>
//           <label>Patient Name</label>
//           <input
//             type="text"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             readOnly
//           />
//         </div>
//         <div>
//           <label>Patient Email</label>
//           <input
//             type="email"
//             value={patientEmail}
//             onChange={(e) => setPatientEmail(e.target.value)}
//             readOnly
//           />
//         </div>

//         <div>
//           <label>Reason</label>
//           <input
//             type="text"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             readOnly
//           />
//         </div>

//         {/* Prescription Advice */}
//         <div>
//           <label>Advice</label>
//           <textarea
//             value={advice}
//             onChange={(e) => setAdvice(e.target.value)}
//             placeholder="Write your prescription advice here..."
//             required
//           />
//         </div>

//         <button type="submit">Submit Prescription</button>
//       </form>
//     </div>
//   );
// };

// export default AddPrescription;




import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import './AddPrescription.css';

const AddPrescription = ({ appointment }) => {
  const [appointmentId, setAppointmentId] = useState(appointment?.id || ""); // Store the appointment ID
  const [patientName, setPatientName] = useState(appointment?.patient?.patientName || "");
  const [patientEmail, setPatientEmail] = useState(appointment?.patient?.email || "");
  const [reason, setReason] = useState(appointment?.reason || "");
  const [advice, setAdvice] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages
  const [messageType, setMessageType] = useState(""); // Success or error type

  // Handle the form submission for the prescription
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure appointmentId is included when submitting prescription
    const prescriptionData = {
      appointmentId, // Send appointment ID as part of the prescription
      patientEmail,  // Ensure the patient email is included
      reason,
      advice,
    };

    try {
      // Make a POST request to the backend with the prescription data
      const response = await axios.post(`http://localhost:8080/prescriptions/${appointmentId}`, prescriptionData);

      if (response.status === 201) {
        setMessage("Prescription added successfully!");
        setMessageType("success");
      }
    } catch (error) {
      console.error("Error adding prescription:", error);
      setMessage("Failed to add prescription. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="add-prescription">
      {/* Message */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient Details */}
        <div>
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            readOnly
          />
        </div>
        <div>
          <label>Patient Email</label>
          <input
            type="email"
            value={patientEmail}
            readOnly
          />
        </div>

        <div>
          <label>Reason</label>
          <input
            type="text"
            value={reason}
            readOnly
          />
        </div>

        {/* Prescription Advice */}
        <div>
          <label>Advice</label>
          <textarea
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            placeholder="Write your prescription advice here..."
            required
          />
        </div>

        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default AddPrescription;