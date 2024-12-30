import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const [profile, setProfile] = useState({
        doctorName: "",
        speciality: "",
        location: "",
        mobileNo: "",
        hospitalName: "",
        chargedPerVisit: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();


    // Fetch the existing profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/doctor/profile");
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    setError("Failed to fetch profile.");
                }
            } catch (err) {
                setError("An error occurred while fetching the profile.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch("http://localhost:8080/api/doctor/edit-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                // setSuccessMessage("Profile updated successfully.");
                alert('Profile updated successfully');
                navigate('/doctor-dashboard');

            } else {
                setError("Failed to update profile");
            }
        } catch (err) {
            setError("An error occurred while updating the profile.");
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    

    return (
        <div className="edit-profile-container">
            <h2>Update Your Profile</h2>
            {successMessage && <div className="success">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="doctorName">Name:</label>
                    <input
                        type="text"
                        id="doctorName"
                        name="doctorName"
                        value={profile.doctorName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="speciality">Speciality:</label>
                    <input
                        type="text"
                        id="speciality"
                        name="speciality"
                        value={profile.speciality}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNo">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        value={profile.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hospitalName">Hospital Name:</label>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={profile.hospitalName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="chargedPerVisit">Charge Per Visit:</label>
                    <input
                        type="number"
                        id="chargedPerVisit"
                        name="chargedPerVisit"
                        value={profile.chargedPerVisit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;