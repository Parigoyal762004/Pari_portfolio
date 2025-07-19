// src/components/contact/ContactForm.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Removed onSubmit, loading, error props as they are now handled by parent
const ContactForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const feedbackOptions = [
    "General Inquiry",
    "Brilliant Idea",
    "Bug Report",
    "Collaboration Opportunity",
    "Just Saying Hi",
    "Other"
  ];

  return (
    // Removed <motion.form> tag, now just a div
    <div
      className="space-y-6 p-6 pb-0" // Reduced bottom padding, as button moves out
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-dark dark:text-light">
        Share Your Thoughts
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-light mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-ivory dark:bg-dark/30 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink"
          // disabled={loading} // Removed disabled prop as it's not passed here anymore
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark dark:text-light mb-2">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-ivory dark:bg-dark/30 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink"
          // disabled={loading} // Removed disabled prop
        />
      </div>

      <div>
        <label htmlFor="feedbackType" className="block text-sm font-medium text-dark dark:text-light mb-2">
          What's on your mind?
        </label>
        <select
          id="feedbackType"
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-ivory dark:bg-dark/30 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink appearance-none"
          // disabled={loading} // Removed disabled prop
        >
          {feedbackOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark dark:text-light mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          className="w-full p-3 rounded-md bg-ivory dark:bg-dark/30 border border-peach dark:border-blue text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-pink resize-y"
          // disabled={loading} // Removed disabled prop
        ></textarea>
      </div>

      {/* Removed submit button and error message from here */}
    </div>
  );
};

export default ContactForm;