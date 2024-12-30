import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorList from "./DoctorList";
import PatientList from "./PatientList";
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [adminEmail, setAdminEmail] = useState("");
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);

  // Fetch admin email
  const fetchAdminEmail = () => {
    axios
      .get("http://localhost:8080/api/admin/get-welcome-email")
      .then((response) => {
        setAdminEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching email:", error);
        setAdminEmail("Error fetching email");
      });
  };

  // Fetch total doctors count
  const fetchDoctorsCount = () => {
    axios
      .get("http://localhost:8080/api/admin/doctors")
      .then((response) => {
        setDoctorsCount(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching doctors count:", error);
      });
  };

  // Fetch total patients count
  const fetchPatientsCount = () => {
    axios
      .get("http://localhost:8080/api/admin/patients")
      .then((response) => {
        setPatientsCount(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching patients count:", error);
      });
  };

  // Initial data fetch
  useEffect(() => {
    fetchAdminEmail();
    fetchDoctorsCount();
    fetchPatientsCount();
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <img src="assets/img/admin.png" alt="Admin" className="profile-picture" />
          <p className="admin-email">{adminEmail || "Loading Email..."}</p>
        </div>
        <ul className="menu-list">
          {["Dashboard", "Manage Doctors", "Manage Patients"].map((menu) => (
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
              <div className="Admin-navbar">
          <ul>
            <li><a href="/admin-dashboard">Home</a></li>
            <li><span>Welcome {adminEmail || "Loading..."}</span></li>
            <li><a href="/WelcomePage">Logout</a></li>
          </ul>
        </div>


        <div className="cards-container">
          {selectedMenu === "Dashboard" && (
            <>
              <div className="card">
                <h2>Total Doctors</h2>
                <p>{doctorsCount}</p>
              </div>
              <div className="card">
                <h2>Total Patients</h2>
                <p>{patientsCount}</p>
              </div>
            </>
          )}
          {selectedMenu === "Manage Doctors" && (
            <DoctorList />
          )}
          {selectedMenu === "Manage Patients" && (
            <PatientList />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
