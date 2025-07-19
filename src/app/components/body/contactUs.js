"use client"; // Mark this as a Client Component
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const whatsappId = "9779815817938"; 
  // Function to handle sending the message via WhatsApp
  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    const whatsappUrl = `https://wa.me/${whatsappId}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank"); // Open WhatsApp in a new tab
  };

  return (
    <div className="mx-5 md:mx-12 lg:mx-32 mt-5">

    <div className=" flex items-center justify-center p-2">
      <div className="bg-white rounded-lg shadow-lg w-full flex flex-col md:flex-row">

        {/* Contact Form Section (Right Side) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            Contact Us
          </h2>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52aa4d]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52aa4d]"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52aa4d]"
              rows="4"
              placeholder="Enter your message"
            />
          </div>

          {/* Send Message Button with WhatsApp Icon */}
          <button
            onClick={handleSendMessage}
            className="w-full bg-[#52aa4d] text-white py-2 px-4 rounded-lg hover:bg-[#428a3d] transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="text-xl" /> {/* WhatsApp Icon */}
            <span>Send Message via WhatsApp</span>
          </button>
          
        </div>
                {/* Map Section (Left Side) */}
                <div className="w-full md:w-1/2 h-96 md:h-auto">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.150681931219!2d-77.0368736844035!3d38.89767627957071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7bcdecbb1df%3A0x715969d6d1b8c7a1!2sWhite%20House%2C%20Washington%2C%20DC%2C%20USA!5e0!3m2!1sen!2sin!4v1698765432105!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
    </div>
  );
};

export default ContactUs;