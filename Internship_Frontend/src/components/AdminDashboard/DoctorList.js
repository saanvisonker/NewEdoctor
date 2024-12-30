import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./DoctorList.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/get-all-doctors")
      .then((response) => {
        console.log("Doctor data:", response.data);
        const fetchedDoctors = response.data || [];
        fetchedDoctors.forEach((doctor) => {
          axios
            .get(`http://localhost:8080/api/doctor/availability?email=${doctor.email}`)
            .then((availabilityResponse) => {
              doctor.availability = availabilityResponse.data;
              setDoctors((prevDoctors) =>
                [...prevDoctors.filter((d) => d.email !== doctor.email), doctor]
              );
            })
            .catch((error) => {
              console.error(`Error fetching availability for doctor ${doctor.email}:`, error);
            });
        });
        setDoctors(fetchedDoctors);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Failed to fetch doctor list.");
      });
  }, []);

  const deleteDoctor = (doctorEmail) => {
    if (window.confirm(`Are you sure you want to delete the doctor with email ${doctorEmail}?`)) {
      axios
        .delete(`http://localhost:8080/api/admin/delete?email=${doctorEmail}`)
        .then(() => {
          alert("Doctor deleted successfully!");
          setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.email !== doctorEmail));
        })
        .catch((error) => {
          console.error(`Error deleting doctor with email ${doctorEmail}:`, error);
          alert("Failed to delete the doctor. Please try again later.");
        });
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // if (doctors.length === 0) {
  //   return <div className="loading">Loading doctor list...</div>;
  // }

  return (
    <div className="doctor-list-container">
      <h1>Doctor List</h1>
      <div className="doctor-cards">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <div className="doctor-image-container">
              <img
                src={`assets/img/${
                  doctor.email.includes("male") ? "femaledoctor.png" : "maledoctor.png"
                }`}
                alt="Doctor"
                className="doctor-image"
              />
            </div>
            <div className="doctor-details">
              <p><strong>Name:</strong> {doctor.doctorName || "Profile Not Updated"}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Speciality:</strong> {doctor.speciality || "Not specified"}</p>
              <p><strong>Location:</strong> {doctor.location || "Not specified"}</p>
              <p><strong>Mobile:</strong> {doctor.mobileNo || "Not provided"}</p>
              <p><strong>Hospital:</strong> {doctor.hospitalName || "Not specified"}</p>
              <p><strong>Charge per Visit:</strong> ₹{doctor.chargedPerVisit || 0}</p>

              {doctor.availability ? (
                <div className="doctor-availability">
                  <p><strong>Available From:</strong> {doctor.availability.availableFromDate}</p>
                  <p><strong>Available To:</strong> {doctor.availability.availableEndDate}</p>
                  <p><strong>AM Slot:</strong> {doctor.availability.amSlotTiming}</p>
                  <p><strong>PM Slot:</strong> {doctor.availability.pmSlotTiming}</p>
                </div>
              ) : (
                <p><strong>Schedule Not Updated.</strong></p>
              )}

              <button
                className="delete-doctor-button"
                onClick={() => deleteDoctor(doctor.email)}
              >
                Delete Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
