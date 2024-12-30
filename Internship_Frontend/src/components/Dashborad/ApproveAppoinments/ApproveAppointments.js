// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ApproveAppointments.css";

// const ApproveAppointments = () => {
//   const [appointments, setAppointments] = useState([]);

//   // Fetch appointments from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/doctor/appointments")
//       .then((response) => {
//         setAppointments(response.data || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching appointments:", error);
//       });
//   }, []);

//   // Handle appointment approval
//   const handleApprove = (id) => {
//     axios
//       .put(`http://localhost:8080/api/doctor/appointments/approve/${id}`)
//       .then(() => {
//         alert("Appointment approved successfully!");
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error approving appointment:", error);
//         alert("Failed to approve the appointment.");
//       });
//   };

//   // Handle appointment rejection
//   const handleReject = (id) => {
//     axios
//       .put(`http://localhost:8080/api/doctor/appointments/reject/${id}`)
//       .then(() => {
//         alert("Appointment rejected successfully!");
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error rejecting appointment:", error);
//         alert("Failed to reject the appointment.");
//       });
//   };

//   return (
//     <div className="approve-appointments-container">
//       <h2>Approve Appointments</h2>
//       {appointments.length === 0 ? (
//         <div className="no-appointments">
//           <h3>You don't have any appointment requests from patients.</h3>
//         </div>
//       ) : (
//         <table className="appointments-table">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Email</th>
//               <th>Phone No</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th className="blood-group-column">Blood Group</th>
//               <th>Appointment Date</th>
//               <th>Reason</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <tr key={appointment.id}>
//                 <td>{appointment.patient.patientName}</td>
//                 <td>{appointment.patient.email}</td>
//                 <td>{appointment.patient.mobileNo}</td>
//                 <td>{appointment.patient.age}</td>
//                 <td>{appointment.patient.gender}</td>
//                 <td className="blood-group-column">{appointment.patient.bloodGroup}</td>
//                 <td>{appointment.appointmentDate}</td>
//                 <td>{appointment.reason}</td>
//                 <td className="status-actions">
//                   <button
//                     onClick={() => handleApprove(appointment.id)}
//                     disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleReject(appointment.id)}
//                     disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ApproveAppointments;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ApproveAppointments.css";

// const ApproveAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState(null);

//   // Fetch appointments from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/doctor/appointments")
//       .then((response) => {
//         setAppointments(response.data || []);
//         setError(null); // Clear any previous error
//       })
//       .catch((error) => {
//         console.error("Error fetching appointments:", error);
//         setError("Failed to fetch appointments.");
//       });
//   }, []);

//   // Handle appointment approval
//   const handleApprove = (id) => {
//     axios
//       .put(`http://localhost:8080/api/doctor/appointments/approve/${id}`)
//       .then(() => {
//         alert("Appointment approved successfully!");
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error approving appointment:", error);
//         alert("Failed to approve the appointment.");
//       });
//   };

//   // Handle appointment rejection
//   const handleReject = (id) => {
//     axios
//       .put(`http://localhost:8080/api/doctor/appointments/reject/${id}`)
//       .then(() => {
//         alert("Appointment rejected successfully!");
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error rejecting appointment:", error);
//         alert("Failed to reject the appointment.");
//       });
//   };

//   return (
//     <div className="approve-appointments-container">
//       <h2>Approve Appointments</h2>
//       {error && <div className="error">{error}</div>}
//       {appointments.length === 0 ? (
//         <div className="no-appointments">
//           <h3>You don't have any appointment requests from patients.</h3>
//         </div>
//       ) : (
//         <table className="appointments-table">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Email</th>
//               <th>Phone No</th>
//               <th>Age</th>
//               <th>Gender</th>
//               <th className="blood-group-column">Blood Group</th>
//               <th>Appointment Date</th>
//               <th>Reason</th>
//               <th>Payment Mode</th> {/* New Column for Payment Mode */}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => (
//               <tr key={appointment.id}>
//                 <td>{appointment.patient ? appointment.patient.patientName : 'N/A'}</td>
//                 <td>{appointment.patient ? appointment.patient.email : 'N/A'}</td>
//                 <td>{appointment.patient ? appointment.patient.mobileNo : 'N/A'}</td>
//                 <td>{appointment.patient ? appointment.patient.age : 'N/A'}</td>
//                 <td>{appointment.patient ? appointment.patient.gender : 'N/A'}</td>
//                 <td className="blood-group-column">
//                   {appointment.patient ? appointment.patient.bloodGroup : 'N/A'}
//                 </td>
//                 <td>{appointment.appointmentDate}</td>
//                 <td>{appointment.reason}</td>
//                 {/* Display payment mode */}
//                 <td>
//                   <span
//                     className={`${
//                       appointment.paymentMode === "ONLINE_PAY"
//                         ? "online-pay"
//                         : "cash"
//                     }`}
//                   >
//                     {appointment.paymentMode === "ONLINE_PAY"
//                       ? "Online Pay"
//                       : "Cash"}
//                   </span>
//                 </td>
//                 <td className="status-actions">
//                   <button
//                     onClick={() => handleApprove(appointment.id)}
//                     disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleReject(appointment.id)}
//                     disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ApproveAppointments;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApproveAppointments.css";

const ApproveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch appointments from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/appointments")
      .then((response) => {
        console.log(response.data); // Log the response to check data structure
        setAppointments(response.data || []);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments.");
      });
  }, []);

  // Handle appointment approval
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:8080/api/doctor/appointments/approve/${id}`)
      .then(() => {
        alert("Appointment approved successfully!");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving appointment:", error);
        alert("Failed to approve the appointment.");
      });
  };

  // Handle appointment rejection
  const handleReject = (id) => {
    axios
      .put(`http://localhost:8080/api/doctor/appointments/reject/${id}`)
      .then(() => {
        alert("Appointment rejected successfully!");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error rejecting appointment:", error);
        alert("Failed to reject the appointment.");
      });
  };

  return (
    <div className="approve-appointments-container">
      <h2>Approve Appointments</h2>
      {error && <div className="error">{error}</div>}
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <h3>You don't have any appointment requests from patients.</h3>
        </div>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Age</th>
              <th>Gender</th>
              <th className="blood-group-column">Blood Group</th>
              <th>Appointment Date</th>
              <th>Reason</th>
              <th>Payment Mode</th> {/* New Column for Payment Mode */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient ? appointment.patient.patientName : 'N/A'}</td>
                <td>{appointment.patient ? appointment.patient.email : 'N/A'}</td>
                <td>{appointment.patient ? appointment.patient.mobileNo : 'N/A'}</td>
                <td>{appointment.patient ? appointment.patient.age : 'N/A'}</td>
                <td>{appointment.patient ? appointment.patient.gender : 'N/A'}</td>
                <td className="blood-group-column">
                  {appointment.patient ? appointment.patient.bloodGroup : 'N/A'}
                </td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.reason}</td>
                {/* Display payment mode */}
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
                <td className="status-actions">
                  <button
                    onClick={() => handleApprove(appointment.id)}
                    disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(appointment.id)}
                    disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
                  >
                    Reject
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

export default ApproveAppointments;
