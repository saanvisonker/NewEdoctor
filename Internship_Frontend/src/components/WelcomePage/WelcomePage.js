import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/${role}-login`);  // Redirect to the appropriate login page based on the selected role
  };

  return (
    <div className="welcome-page">
  
      <main id="main"> {} 
  
        <section id="services" className="services section-bg">
          <div className="container-home" data-aos="fade-up" >
            <div className="section-title" >
              <h2 style={{ fontFamily: 'aladin' }}>Three Different Logins with New Registration</h2>
            </div>
            <div className="mid_body2">
              <div className="details">
                {/* Admin Card */}
                <div 
                  className="detail_1" 
                  style={{ backgroundColor: ' #233852', marginRight: '5%' }}
                >
                  <h2 
                    style={{ fontWeight: 'bolder', fontSize: '35px', fontFamily: 'aladin', marginTop: '5%', color: '#fff' }}
                  >
                    Admin Login
                  </h2>
                  <div className="circle" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10%' }}>
                    <img src="assets/img/admin.png" width="130" height="130" alt="Admin" />
                  </div>
                  <button 
                    onClick={() => handleNavigation('admin')} 
                    className="btn btn-primary"
                    style={{ marginTop: '20px', padding: '10px 20px' }}
                  >
                    Go to Admin Login
                  </button>
                </div>

                {/* Doctor Card */}
                <div 
                  className="detail_2" 
                  style={{ backgroundColor: ' #233852', marginRight: '5%' }}
                >
                  <h2 
                    style={{ fontWeight: 'bolder', fontSize: '35px', fontFamily: 'aladin', marginTop: '5%', color: '#fff' }}
                  >
                    Doctor Login
                  </h2>
                  <div className="circle" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10%' }}>
                    <img src="assets/img/maledoctor.png" width="130" height="130" alt="Doctor" />
                  </div>
                  <button 
                    onClick={() => handleNavigation('doctor')} 
                    className="btn btn-primary"
                    style={{ marginTop: '20px', padding: '10px 20px' }}
                  >
                    Go to Doctor Login
                  </button>
                </div>

                {/* User Card */}
                <div 
                  className="detail_3" 
                  style={{ backgroundColor: ' #233852', marginRight: '5%' }}
                >
                  <h2 
                    style={{ fontWeight: 'bolder', fontSize: '35px', fontFamily: 'aladin', marginTop: '5%', color: '#fff' }}
                  >
                    User Login
                  </h2>
                  <div className="circle" style={{ borderRadius: '50%', backgroundColor: 'white', padding: '10%' }}>
                    <img src="assets/img/maleuser.png" width="130" height="130" alt="User" />
                  </div>
                  <button 
                    onClick={() => handleNavigation('user')} 
                    className="btn btn-primary"
                    style={{ marginTop: '20px', padding: '10px 20px' }}
                  >
                    Go to User Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
