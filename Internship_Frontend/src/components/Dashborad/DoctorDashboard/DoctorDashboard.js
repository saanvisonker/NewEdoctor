// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";
// import "./DoctorDashboard.css";
// import EditProfile from "../EditDoctorProfile/EditProfile";
// import YourSchedule from "../UpdateAvialblity/YourSchedule";
// import ApproveAppointments from "../ApproveAppoinments/ApproveAppointments";
// import Appointments from "../ApproveAppoinments/Appointments";
// import AddPrescription from "../Prescription/AddPrescription";

// const DoctorDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [doctorEmail, setDoctorEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [doctorProfile, setDoctorProfile] = useState({
//     doctorName: "",
//     speciality: "",
//     location: "",
//     mobileNo: "",
//     hospitalName: "",
//     chargedPerVisit: "",
//   });
//   const [appointments, setAppointments] = useState([]);
//   const [appointmentRequestsCount, setAppointmentRequestsCount] = useState(0);
//   const [patientsCount, setPatientsCount] = useState(0);
//   const [appointmentForPrescription, setAppointmentForPrescription] = useState(null);

//   const socketUrl = "http://localhost:8080/ws"; // WebSocket endpoint URL

//   // Fetch doctor's email
//   const fetchDoctorEmail = () => {
//     axios
//       .get("http://localhost:8080/api/doctor/get-welcome-email")
//       .then((response) => {
//         setDoctorEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setDoctorEmail("Error fetching email");
//       });
//   };

//   // Fetch doctor's profile
//   const fetchDoctorProfile = () => {
//     axios
//       .get("http://localhost:8080/api/doctor/profile")
//       .then((response) => {
//         setDoctorProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch notifications
//   const fetchNotifications = useCallback(() => {
//     if (doctorEmail) {
//       axios
//         .get(`http://localhost:8080/notifications/${doctorEmail}`)
//         .then((response) => {
//           setNotifications(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   }, [doctorEmail]);

//   // Fetch appointment requests count
//   const fetchAppointmentRequestsCount = () => {
//     axios
//       .get("http://localhost:8080/api/doctor/appointment-requests-count")
//       .then((response) => {
//         setAppointmentRequestsCount(response.data.count || 0);
//       })
//       .catch((error) => {
//         console.error("Error fetching appointment requests count:", error);
//       });
//   };

//   // Fetch patients count
//   const fetchPatientsCount = () => {
//     axios
//       .get("http://localhost:8080/api/doctor/patients-count")
//       .then((response) => {
//         setPatientsCount(response.data.count || 0);
//       })
//       .catch((error) => {
//         console.error("Error fetching patients count:", error);
//       });
//   };

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // WebSocket for real-time notifications
//   useEffect(() => {
//     if (doctorEmail) {
//       const socket = new SockJS(socketUrl);
//       const stompClient = Stomp.over(socket);

//       stompClient.connect({}, () => {
//         stompClient.subscribe(`/topic/notifications/${doctorEmail}`, (message) => {
//           const newNotification = JSON.parse(message.body);
//           setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
//         });
//       });

//       return () => {
//         if (stompClient) {
//           stompClient.disconnect();
//         }
//       };
//     }
//   }, [doctorEmail]);

//   // Fetch accepted appointments
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/doctor/accepted-appointments")
//       .then((response) => {
//         setAppointments(response.data || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching accepted appointments:", error);
//       });
//   }, []);

//   // Handle marking an appointment as completed
//   const markAsCompleted = (id) => {
//     axios
//       .put(`http://localhost:8080/api/doctor/appointments/complete/${id}`)
//       .then(() => {
//         alert("Appointment marked as completed!");
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error completing appointment:", error);
//         alert("Failed to mark the appointment as completed.");
//       });
//   };

//   // Handle navigating to Add Prescription page
//   const handleAddPrescription = (appointment) => {
//     setSelectedMenu("Add Prescriptions");
//     setAppointmentForPrescription(appointment);
//   };

//   // Initial data fetch
//   useEffect(() => {
//     fetchDoctorEmail();
//     fetchDoctorProfile();
//     fetchAppointmentRequestsCount();
//     fetchPatientsCount();
//   }, []);

//   useEffect(() => {
//     if (doctorEmail) {
//       fetchNotifications();
//     }
//   }, [doctorEmail, fetchNotifications]);

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="profile-section">
//           <img src="assets/img/maledoctor.png" alt="Doctor" className="profile-picture" />
//           <p className="doctor-name">
//             {doctorProfile.doctorName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {[
//             "Dashboard",
//             "Edit Profile",
//             "Your Schedule",
//             "Approve Appointments",
//             "Accepted Appointments",
//             "Add Prescriptions",
//           ].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="Doctor-navbar">
//           <ul>
//             <li><a href="/doctor-dashboard">Home</a></li>
//             <li><span>Welcome {doctorEmail || "Loading..."}</span></li>
//             <li>
//               <div className="notification-container">
//                 <button
//                   className="notification-bell"
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">{notifications.length}</span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           {notification.status !== "READ" && (
//                             <button onClick={() => markAsRead(notification.id)}>
//                               Mark As Read
//                             </button>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li><a href="/WelcomePage">Logout</a></li>
//           </ul>
//         </div>

//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Appointment requests</h2>
//                 <p>{appointmentRequestsCount}</p>
//               </div>
//               <div className="card">
//                 <h2>Accepted Appointments</h2>
//                 <p>{appointments.length}</p>
//               </div>
             

//               <div className="card">
//                 <h2>Your Patients</h2>
//                 <p>{patientsCount}</p>
//               </div>

             
//             </>
//           )}
//           {selectedMenu === "Edit Profile" && (
//             <EditProfile doctorProfile={doctorProfile} setDoctorProfile={setDoctorProfile} />
//           )}
//           {selectedMenu === "Your Schedule" && <YourSchedule />}
//           {selectedMenu === "Approve Appointments" && <ApproveAppointments />}
//           {selectedMenu === "Accepted Appointments" && (
//             <Appointments
//               setSelectedMenu={setSelectedMenu}
//               setAppointmentForPrescription={setAppointmentForPrescription}
//               appointments={appointments}
//               markAsCompleted={markAsCompleted}
//               handleAddPrescription={handleAddPrescription}
//             />
//           )}
//           {selectedMenu === "Add Prescriptions" && (
//             <AddPrescription
//               setSelectedMenu={setSelectedMenu}
//               appointment={appointmentForPrescription}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;



import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./DoctorDashboard.css";
import EditProfile from "../EditDoctorProfile/EditProfile";
import YourSchedule from "../UpdateAvialblity/YourSchedule";
import ApproveAppointments from "../ApproveAppoinments/ApproveAppointments";
import Appointments from "../ApproveAppoinments/Appointments";
import AddPrescription from "../Prescription/AddPrescription";
const DoctorDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({
    doctorName: "",
    speciality: "",
    location: "",
    mobileNo: "",
    hospitalName: "",
    chargedPerVisit: "",
  });
  const [appointments, setAppointments] = useState([]);
  const [appointmentRequestsCount, setAppointmentRequestsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentForPrescription, setAppointmentForPrescription] = useState(null);

  const socketUrl = "http://localhost:8080/ws"; // WebSocket endpoint URL

  // Fetch doctor's email
  const fetchDoctorEmail = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctor/get-welcome-email");
      setDoctorEmail(response.data.email || "Unknown Email");
    } catch (error) {
      console.error("Error fetching email:", error);
      setDoctorEmail("Error fetching email");
    }
  };

  // Fetch doctor's profile
  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctor/profile");
      setDoctorProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (doctorEmail) {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${doctorEmail}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  }, [doctorEmail]);

  // Fetch appointment requests count
  const fetchAppointmentRequestsCount = async () => {
    if (doctorEmail) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/doctor/appointment-requests-count/${doctorEmail}`
        );
        setAppointmentRequestsCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching appointment requests count:", error);
      }
    }
  };

  // Fetch patients count
  const fetchPatientsCount = async () => {
    if (doctorEmail) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/doctor/patients-count/${doctorEmail}`
        );
        setPatientsCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching patients count:", error);
      }
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/notifications/read/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // WebSocket for real-time notifications
  useEffect(() => {
    if (doctorEmail) {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/notifications/${doctorEmail}`, (message) => {
          const newNotification = JSON.parse(message.body);
          setNotifications((prev) => [newNotification, ...prev]);
        });
      });

      return () => {
        if (stompClient) {
          stompClient.disconnect();
        }
      };
    }
  }, [doctorEmail]);

  // Fetch accepted appointments
  useEffect(() => {
    if (doctorEmail) {
      axios
        .get(`http://localhost:8080/api/doctor/accepted-appointments/${doctorEmail}`)
        .then((response) => {
          setAppointments(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching accepted appointments:", error);
        });
    }
  }, [doctorEmail]);

  // Handle marking an appointment as completed
  const markAsCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/doctor/appointments/complete/${id}`);
      alert("Appointment marked as completed!");
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error completing appointment:", error);
      alert("Failed to mark the appointment as completed.");
    }
  };

  // Handle navigating to Add Prescription page
  const handleAddPrescription = (appointment) => {
    setSelectedMenu("Add Prescriptions");
    setAppointmentForPrescription(appointment);
  };

  // Initial data fetch
  useEffect(() => {
    fetchDoctorEmail();
    fetchDoctorProfile();
  }, []);

  useEffect(() => {
    if (doctorEmail) {
      fetchNotifications();
      fetchAppointmentRequestsCount();
      fetchPatientsCount();
    }
  }, [doctorEmail, fetchNotifications]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <img src="assets/img/maledoctor.png" alt="Doctor" className="profile-picture" />
          <p className="doctor-name">
            {doctorProfile.doctorName || "Loading Name..."}
          </p>
        </div>
        <ul className="menu-list">
          {[
            "Dashboard",
            "Edit Profile",
            "Your Schedule",
            "Approve Appointments",
            "Accepted Appointments",
            "Add Prescriptions",
          ].map((menu) => (
            <li
              key={menu}
              className={selectedMenu === menu ? "menu-item active" : "menu-item"}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <div className="Doctor-navbar">
          <ul>
            <li><a href="/doctor-dashboard">Home</a></li>
            <li><span>Welcome {doctorEmail || "Loading..."}</span></li>
            <li>
              <div className="notification-container">
                <button
                  className="notification-bell"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="notification-badge">{notifications.length}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.message}</p>
                          {notification.status !== "READ" && (
                            <button onClick={() => markAsRead(notification.id)}>
                              Mark As Read
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No new notifications</p>
                    )}
                  </div>
                )}
              </div>
            </li>
            <li><a href="/WelcomePage">Logout</a></li>
          </ul>
        </div>

        <div className="cards-container">
          {selectedMenu === "Dashboard" && (
            <>
              <div className="card">
                <h2>Appointment Requests</h2>
                <p>{appointmentRequestsCount}</p>
              </div>
              <div className="card">
                <h2>Accepted Appointments</h2>
                <p>{appointments.length}</p>
              </div>
              <div className="card">
                <h2>Your Patients</h2>
                <p>{patientsCount}</p>
              </div>
            </>
          )}
          {selectedMenu === "Edit Profile" && (
            <EditProfile doctorProfile={doctorProfile} setDoctorProfile={setDoctorProfile} />
          )}
          {selectedMenu === "Your Schedule" && <YourSchedule />}
          {selectedMenu === "Approve Appointments" && <ApproveAppointments />}
          {selectedMenu === "Accepted Appointments" && (
            <Appointments
              setSelectedMenu={setSelectedMenu}
              setAppointmentForPrescription={setAppointmentForPrescription}
              appointments={appointments}
              markAsCompleted={markAsCompleted}
              handleAddPrescription={handleAddPrescription}
            />
          )}
          {selectedMenu === "Add Prescriptions" && (
            <AddPrescription
              setSelectedMenu={setSelectedMenu}
              appointment={appointmentForPrescription}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
