
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import EditPatientProfile from "../EditProfile/EditPatientProfile";
import AppointmentsList from "../Appointment/AppointmentsList";
import DoctorList from "../DoctorList/DoctorList";
import Feedback from "../FeedbackList/Feedback";
import Chatbot from "../Chatbot/Chatbot";
import Prescription from "../YourPrescription/Prescription";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState({
    patientName: "",
    mobileNo: "",
    bloodGroup: "",
    gender: "",
    age: "",
    address: "",
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const socketUrl = "http://localhost:8080/ws";

  // Fetch user's email
  const fetchUserEmail = () => {
    axios
      .get("http://localhost:8080/api/patient/get-welcome-email")
      .then((response) => {
        setUserEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching email:", error);
        setUserEmail("Error fetching email");
      });
  };

  // Fetch user's profile
  const fetchUserProfile = () => {
    axios
      .get("http://localhost:8080/api/patient/profile")
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };

  // Fetch unread notifications
  const fetchNotifications = useCallback(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:8080/notifications/${userEmail}`)
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [userEmail]);

  // Mark notification as read
  const markAsRead = (id) => {
    axios
      .post(`http://localhost:8080/notifications/read/${id}`)
      .then(() => {
        setNotifications(notifications.filter((n) => n.id !== id));
      })
      .catch((error) =>
        console.error("Error marking notification as read:", error)
      );
  };

  // WebSocket for real-time notifications
  useEffect(() => {
    if (userEmail) {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/notifications/${userEmail}`, (message) => {
          const newNotification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        });
      });

      return () => {
        if (stompClient) {
          stompClient.disconnect();
        }
      };
    }
  }, [userEmail]);

  // Fetch data on component load
  useEffect(() => {
    fetchUserEmail();
    fetchUserProfile();
  }, []);

  // Fetch notifications after email is available
  useEffect(() => {
    if (userEmail) {
      fetchNotifications();
    }
  }, [userEmail, fetchNotifications]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <img
            src="assets/img/maleuser.png"
            alt="User"
            className="profile-picture"
          />
          <p className="user-name">
            {userProfile.patientName || "Loading Name..."}
          </p>
        </div>
        <ul className="menu-list">
          {["Dashboard", "Edit Profile", "My Appointments", "Prescriptions", "Doctors List"].map((menu) => (
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

      {/* Main Content */}
      <div className="main-content">
        <div className="User-navbar">
          <ul>
            <li>
              <a href="/user-dashboard">Home</a>
            </li>
            <li>
              <span>Welcome {userEmail || "Loading..."}</span>
            </li>
            <li>
              <div className="notification-container">
                <button
                  className="notification-bell"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.message}</p>
                          {notification.status !== "READ" && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                            >
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
            <li>
              <a href="/WelcomePage">Logout</a>
            </li>
          </ul>
        </div>

        {/* Render based on selected menu */}
        <div className="cards-container">
          {selectedMenu === "Dashboard" && (
            <>
              <div className="card">
                <h2>Appointments</h2>
                <p>2</p>
              </div>
              <div className="card">
                <h2>Upcomming Appointments</h2>
                <p>2</p>
              </div>
              <div className="card">
                <h2>Prescriptions</h2>
                <p>1</p>
              </div>
            </>
          )}

          {selectedMenu === "Edit Profile" && (
            <EditPatientProfile
              refreshData={() => {
                fetchUserEmail();
                fetchUserProfile();
              }}
            />
          )}

          {selectedMenu === "Doctors List" && <DoctorList />}

          {selectedMenu === "My Appointments" && (
            <AppointmentsList setSelectedMenu={setSelectedMenu} />
          )}

          {selectedMenu === "Feedback" && <Feedback />}

          {selectedMenu === "Prescriptions" && <Prescription />}
        </div>
      </div>

      {/* Chatbot Icon */}
      <div
        className="chatbot-icon"
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        💬
      </div>

      {/* Chatbot Component */}
      {isChatbotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
