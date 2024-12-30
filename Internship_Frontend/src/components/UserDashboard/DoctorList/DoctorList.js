import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css"; // Custom CSS for Doctor List
import CreateAppointment from './CreateAppointment';


const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/get-all-doctors")
      .then((response) => {
        console.log("Doctor data:", response.data);
        setDoctors(response.data || []);
        response.data.forEach((doctor) => {
          axios
            .get(`http://localhost:8080/api/doctor/availability?email=${doctor.email}`)
            .then((availabilityResponse) => {
              doctor.availability = availabilityResponse.data;
              setDoctors((prevDoctors) => [...prevDoctors]);
            })
            .catch((error) => {
              console.error(`Error fetching availability for doctor ${doctor.email}:`, error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Failed to fetch doctor list.");
      });
  }, []);

  const handleCreateAppointmentClick = (doctorEmail) => {
    setSelectedDoctor(doctorEmail); // Set the selected doctor's email
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (selectedDoctor) {
    const selectedDoctorData = doctors.find(doctor => doctor.email === selectedDoctor);
    return (
      <CreateAppointment
        doctorEmail={selectedDoctor} // Pass the selected doctor's email
        doctorAvailability={selectedDoctorData?.availability} // Pass the selected doctor's availability
        onBack={() => setSelectedDoctor(null)} // Allow navigating back to the doctor list
      />
    );
  }

  if (doctors.length === 0) {
    return <div className="loading">Loading doctor list...</div>;
  }

  const isProfileComplete = (doctor) => {
    return (
      doctor.doctorName &&
      doctor.speciality &&
      doctor.location &&
      doctor.mobileNo &&
      doctor.hospitalName &&
      doctor.chargedPerVisit
    );
  };

  const isAvailabilityUpdated = (doctor) => {
    return doctor.availability && doctor.availability.availableFromDate && doctor.availability.availableEndDate;
  };

  return (
    <div className="doctor-list-container">
      {error && <p>{error}</p>}
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
              <p><strong>{doctor.doctorName || "Profile Not Updated"}</strong></p>
              <p>Email: {doctor.email}</p>
              <p>Speciality: {doctor.speciality || "Not specified"}</p>
              <p>Location: {doctor.location || "Not specified"}</p>
              <p>Mobile: {doctor.mobileNo || "Not provided"}</p>
              <p>Hospital: {doctor.hospitalName || "Not specified"}</p>
              <p>Charge per Visit: ₹{doctor.chargedPerVisit || 0}</p>

              {doctor.availability ? (
                <div className="doctor-availability">
                  <p>Doctor Available From: {doctor.availability.availableFromDate}</p>
                  <p>Doctor Available To: {doctor.availability.availableEndDate}</p>
                  <p>AM Slot: {doctor.availability.amSlotTiming}</p>
                  <p>PM Slot: {doctor.availability.pmSlotTiming}</p>
                </div>
              ) : (
                <p><strong>Schedule Not Updated.</strong></p>
              )}

              {isProfileComplete(doctor) && isAvailabilityUpdated(doctor) && (
                <button
                  className="create-appointment-button"
                  onClick={() => handleCreateAppointmentClick(doctor.email)}
                >
                  Create Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
