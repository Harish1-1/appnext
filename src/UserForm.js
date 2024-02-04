import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    review: '',
    reviewType: 'good', // Assume this is determined somehow
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <textarea name="review" value={formData.review} onChange={handleChange} placeholder="Review" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
