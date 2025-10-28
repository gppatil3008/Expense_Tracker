// src/pages/Contact.js

import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Contact Us</h2>
      <p className="text-gray-700 mb-4">
        Thank you for using our Finance Tracker. For support or business inquiries, please reach out.
      </p>
      <div className="space-y-3">
        <p><strong>Email:</strong> support@financetrackerapp.com</p>
        <p><strong>Phone:</strong> +91 123 456 7890</p>
        <p><strong>Address:</strong> Technology Park, Bangalore, India</p>
      </div>
    </div>
  );
};

export default Contact;