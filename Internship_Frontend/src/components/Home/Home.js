import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="main-nav">
        <ul>
          <li><a href="#" className='home-name'>E-Doctor</a></li>
          <li><a href="./">Home</a></li>
          {/* <li><a href="#">Feedback List</a></li> */}
          <li><a href="./feedback-list">Feedback List</a></li>
          <li><a href="./WelcomePage">Login</a></li>
          <li><a href="/registration">Registration</a></li>
        </ul>
      </nav>
      <div>
        <img 
          src="assets/img/hhome-bg.png" 
          alt="E-Doctor Banner" 
          className="home-bg" 
        />
      </div>
      <div className="categories-container">
        <h2 className="section-title">
          Explore by our <span className="highlight">category</span>
        </h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="icon-container">
              <img src="assets/img/maledoctor.png" alt="Doctor Icon" className="icon" />
            </div>
            <p>Find popular specialist doctors.</p>
          </div>
          <div className="category-card active">
            <div className="icon-container">
              <img src="assets/img/Appointment.png" alt="Lab Icon" className="icon" />
            </div>
            <p>Book Appointment Online.</p>
          </div>
          <div className="category-card">
            <div className="icon-container">
              <img src="assets/img/login.png" alt="Emergency Icon" className="icon" />
            </div>
            <p>Profile Management.</p>
          </div>
          <div className="category-card">
            <div className="icon-container">
              <img src="assets/img/Prescription.png" alt="Insurance Icon" className="icon" />
            </div>
            <p>Prescription Alerts.</p>
          </div>
        </div>
      </div>
      <div className='foot'>
        <footer> <p>© 2024 E-Doctor. All rights reserved.</p></footer>
      </div>
    </div>
  );
};

export default Home;
