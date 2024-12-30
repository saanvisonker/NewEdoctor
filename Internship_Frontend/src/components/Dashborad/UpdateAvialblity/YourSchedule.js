import React, { useState, useEffect } from "react";
import axios from "axios";
import './YourSchedule.css';

const YourSchedule = () => {
  const [availability, setAvailability] = useState({
    availableFromDate: "",
    availableEndDate: "",
    amSlotTiming: "",
    pmSlotTiming: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch the doctor's email first
    axios
      .get("http://localhost:8080/api/doctor/get-welcome-email")
      .then((response) => {
        // Now fetch the availability using the email
        return axios.get(
          `http://localhost:8080/api/doctor/availability?email=${response.data.email}`
        );
      })
      .then((response) => {
        setAvailability(response.data); // Populate availability data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even on error
      });
  }, []); // This will run only once when the component mounts

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    const { availableFromDate, availableEndDate, amSlotTiming, pmSlotTiming } = availability;

    if (!availableFromDate || !availableEndDate || !amSlotTiming || !pmSlotTiming) {
      newErrors.required = "All fields are required!";
    }

    if (availableFromDate && availableEndDate) {
      if (new Date(availableFromDate) > new Date(availableEndDate)) {
        newErrors.dateRange = "From Date cannot be later than To Date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for updating availability
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    axios
      .put("http://localhost:8080/api/doctor/availability", availability)
      .then((response) => {
        setAvailability(response.data); // Update state with the new data
        setIsEditing(false); // Exit editing mode
        setSuccessMessage("Changes saved successfully!"); // Show success message
        setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
      })
      .catch((error) => {
        console.error("Error updating availability:", error);
      });
  };

  // Handle entering edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({}); // Reset any validation errors
  };

  if (loading) {
    return <div>Loading your schedule...</div>;
  }

  return (
    <div className="schedule-container">
      <h2>Set Your Available Dates</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}

      {!isEditing ? (
        <div>
          <p>
            <strong>From:</strong> {availability.availableFromDate || "Not Set"}
          </p>
          <p>
            <strong>To:</strong> {availability.availableEndDate || "Not Set"}
          </p>
          <p>
            <strong>AM Slot:</strong> {availability.amSlotTiming || "Not Set"}
          </p>
          <p>
            <strong>PM Slot:</strong> {availability.pmSlotTiming || "Not Set"}
          </p>
          <button className="edit-btn" onClick={handleEditClick}>
            Edit Schedule
          </button>
        </div>
      ) : (
        <div className="modal-container">
          <div className="modal">
            <h3>Edit Schedule</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>From Date</label>
                <input
                  type="date"
                  name="availableFromDate"
                  value={availability.availableFromDate}
                  onChange={handleInputChange}
                  className={errors.required ? "input-error" : ""}
                />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input
                  type="date"
                  name="availableEndDate"
                  value={availability.availableEndDate}
                  onChange={handleInputChange}
                  className={errors.required ? "input-error" : ""}
                />
              </div>
              <div className="form-group">
                <label>AM Slot Timing</label>
                <input
                  type="text"
                  name="amSlotTiming"
                  value={availability.amSlotTiming}
                  onChange={handleInputChange}
                  className={errors.required ? "input-error" : ""}
                />
              </div>
              <div className="form-group">
                <label>PM Slot Timing</label>
                <input
                  type="text"
                  name="pmSlotTiming"
                  value={availability.pmSlotTiming}
                  onChange={handleInputChange}
                  className={errors.required ? "input-error" : ""}
                />
              </div>
              {errors.required && <div className="error-text">{errors.required}</div>}
              {errors.dateRange && <div className="error-text">{errors.dateRange}</div>}
              <div className="modal-actions">
                <button className="save-btn" type="submit">Save</button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourSchedule;
