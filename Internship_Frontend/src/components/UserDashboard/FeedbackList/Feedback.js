import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css"; // Custom CSS for Feedback

const FeedbackList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feedback, setFeedback] = useState({ rating: "", comment: "" });
  const [successMessage, setSuccessMessage] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // State to hold logged-in user's email

  useEffect(() => {
    // Fetch doctor's data
    axios
      .get("http://localhost:8080/api/doctor/get-all-doctors")
      .then((response) => {
        console.log("Doctor data:", response.data);
        setDoctors(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Failed to fetch doctor list.");
      });

    // Fetch logged-in user's email
    axios
      .get("http://localhost:8080/api/patient/get-welcome-email") // Adjust API URL as per your backend
      .then((response) => {
        setUserEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching user email:", error);
        setUserEmail("Error fetching email");
      });
  }, []);

  const handleAddFeedbackClick = (doctorEmail) => {
    setSelectedDoctor(doctorEmail); // Set the selected doctor's email
    setFeedback({ rating: "", comment: "" }); // Reset feedback form
    setSuccessMessage(null);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    if (!userEmail) {
      setError("User email is required.");
      return;
    }

    const payload = {
      patientEmail: userEmail, // Dynamically fetch the logged-in user's email
      doctorEmail: selectedDoctor,
      rating: feedback.rating,
      comment: feedback.comment,
    };

    axios
      .post("http://localhost:8080/feedback/add", payload)
      .then((response) => {
        setSuccessMessage("Feedback submitted successfully!");
        setSelectedDoctor(null); // Close feedback form
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        setError("Failed to submit feedback.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

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

  return (
    <div className="feedback-list-container">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="feedback-cards">
        {doctors.map((doctor, index) => (
          <div className="feedback-card" key={index}>
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
  
              {isProfileComplete(doctor) && (
                <button
                  className="feedback-button"
                  onClick={() => handleAddFeedbackClick(doctor.email)}
                >
                  Give Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
  
      {selectedDoctor && (
        <div className="feedback-form-container">
          <h3>Submit Feedback for Doctor</h3>
          <form onSubmit={handleSubmitFeedback}>
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                value={feedback.rating}
                onChange={handleInputChange}
                min="1"
                max="5"
                required
              />
            </label>
            <label>
              Comment:
              <textarea
                name="comment"
                value={feedback.comment}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit" className="submit-feedback-button">
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;

