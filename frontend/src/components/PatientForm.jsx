import React from 'react';
import { useState } from 'react';

export default function PatientForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    try {
      await onSubmit(form);
      setForm({ name: '', email: '', phone: '' });
      setMessage('Patient registered successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <h2>Patient registration</h2>
      <input name="name" placeholder="Patient name" value={form.name} onChange={update} required />
      <input name="email" type="email" placeholder="Email address" value={form.email} onChange={update} required />
      <input name="phone" placeholder="Phone number" value={form.phone} onChange={update} required />
      <button type="submit">Register patient</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}
