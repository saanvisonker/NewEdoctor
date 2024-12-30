// import React, { useEffect, useState } from "react";
// import "./Chatbot.css";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const welcomeMessage = {
//       sender: "bot",
//       text: "Hi, welcome to E-Doctor! How can I assist you today? You can ask about appointments, doctors, or general queries.",
//     };
//     setMessages([welcomeMessage]);
//   }, []);

//   const handleSendMessage = (text = "") => {
//     const inputText = text || userInput.trim();
//     if (inputText === "") return;

//     // Add user's message
//     const userMessage = { sender: "user", text: inputText };
//     setMessages((prev) => [...prev, userMessage]);
//     setUserInput("");
//     setIsTyping(true);

//     setTimeout(() => {
//       const botResponse = generateBotResponse(inputText);
//       setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
//       setIsTyping(false);
//     }, 1000);
//   };

//   const generateBotResponse = (input) => {
//     input = input.toLowerCase();

//     if (input.includes("appointment"))
//       return "You can book an appointment with our available doctors by visiting the 'Book Appointment' section.";
//     if (input.includes("doctor"))
//       return "We have specialists in various fields like Cardiology, Pediatrics, and more. Which specialist are you looking for?";
//     if (input.includes("contact"))
//       return "You can contact us at support@edoctor.com or call us at +1-234-567-890.";
//     if (input.includes("timing"))
//       return "Our doctors are available from 9:00 AM to 5:00 PM, Monday to Saturday.";
//     if (input.includes("emergency"))
//       return "For emergencies, please visit the 'Emergency Services' section or call the emergency helpline at +1-911.";
//     if (input.includes("navigate to user dashboard"))
//       return "To navigate to the user dashboard, please click on the 'User Dashboard' link in the main menu.";
//     if (input.includes("login"))
//       return "To login, please click on the 'Login' button at the top right corner of the homepage.";
//     if (input.includes("register"))
//       return "To register, please click on the 'Register' button at the top right corner of the homepage and fill in the required details.";
//     if (input.includes("app timings"))
//       return "Our application is available 24/7. You can access it anytime.";
//     if (input.includes("navigate to appointments"))
//       return "To navigate to your appointments, please click on the 'My Appointments' link in the user dashboard.";
//     if (input.includes("available doctors"))
//       return "You can view the list of available doctors by visiting the 'Doctors List' section in the user dashboard.";

//     return "I'm here to help! You can ask about booking appointments, doctor details, clinic timings, or navigating the website.";
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="chatbot-container">
//       {/* Header */}
//       <div className="chatbot-header">
//         <span>E-DocBot</span>
//         <button className="close-button" onClick={() => setIsVisible(false)}>
//           ❌
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="chatbot-messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.sender === "user" ? "user" : "bot"}`}
//           >
//             {msg.sender === "bot" && <span className="avatar">🤖</span>}
//             <div className="text">{msg.text}</div>
//           </div>
//         ))}
//         {isTyping && (
//           <div className="message bot">
//             <span className="avatar">🤖</span>
//             <div className="text typing">...</div>
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="chatbot-input-area">
//         <div className="input-container">
//           <input
//             type="text"
//             className="chatbot-input"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="Ask me about appointments, doctors, etc."
//           />
//           <button className="send-button" onClick={() => handleSendMessage()}>
//             ⟫
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;



import React, { useEffect, useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      text: "Hi, welcome to E-Doctor! How can I assist you today? You can ask about appointments, doctors, or your patient dashboard.",
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = (text = "") => {
    const inputText = text || userInput.trim();
    if (inputText === "") return;

    // Add user's message
    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (input) => {
    input = input.toLowerCase();

    if (input.includes("appointment"))
      return "You can book an appointment with our available doctors by visiting the 'Book Appointment' section.";
    if (input.includes("doctor"))
      return "We have specialists in various fields like Cardiology, Pediatrics, and more. Which specialist are you looking for?";
    if (input.includes("contact"))
      return "You can contact us at support@edoctor.com or call us at +1-234-567-890.";
    if (input.includes("timing"))
      return "Our doctors are available from 9:00 AM to 5:00 PM, Monday to Saturday.";
    if (input.includes("emergency"))
      return "For emergencies, please visit the 'Emergency Services' section or call the emergency helpline at +1-911.";
    if (input.includes("navigate to user dashboard"))
      return "To navigate to the user dashboard, please click on the 'User Dashboard' link in the main menu.";
    if (input.includes("login"))
      return "To login, please click on the 'Login' button at the top right corner of the homepage.";
    if (input.includes("register"))
      return "To register, please click on the 'Register' button at the top right corner of the homepage and fill in the required details.";
    if (input.includes("app timings"))
      return "Our application is available 24/7. You can access it anytime.";
    if (input.includes("navigate to appointments"))
      return "To navigate to your appointments, please click on the 'My Appointments' link in the user dashboard.";
    if (input.includes("available doctors"))
      return "You can view the list of available doctors by visiting the 'Doctors List' section in the user dashboard.";

    // Adding patient dashboard related responses
    if (input.includes("patient dashboard") || input.includes("view my dashboard"))
      return "You can access your patient dashboard from the main menu. There, you can view your appointments, medical history, and prescriptions.";

    if (input.includes("view my prescriptions"))
      return "You can view your prescriptions under the 'Prescriptions' section in your patient dashboard.";

    if (input.includes("view my medical history"))
      return "Your medical history is available under the 'Medical History' section in the patient dashboard.";

    if (input.includes("upcoming appointments"))
      return "To view your upcoming appointments, navigate to the 'My Appointments' section in the patient dashboard.";

    if (input.includes("past appointments"))
      return "You can view past appointments in the 'Appointment History' section of your patient dashboard.";

    if (input.includes("update personal details"))
      return "To update your personal details, please go to the 'Profile Settings' section in your dashboard.";

    return "I'm here to help! You can ask about booking appointments, doctor details, patient dashboard, medical records, or navigating the website.";
  };

  if (!isVisible) return null;

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <span>E-DocBot</span>
        <button className="close-button" onClick={() => setIsVisible(false)}>
          ❌
        </button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.sender === "bot" && <span className="avatar">🤖</span>}
            <div className="text">{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <span className="avatar">🤖</span>
            <div className="text typing">...</div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="chatbot-input-area">
        <div className="input-container">
          <input
            type="text"
            className="chatbot-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me about appointments, doctors, or your patient dashboard."
          />
          <button className="send-button" onClick={() => handleSendMessage()}>
            ⟫
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
