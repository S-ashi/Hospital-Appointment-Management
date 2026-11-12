import React from 'react';
import { useState } from 'react';

export default function AppointmentForm({ patients, doctors, onSubmit }) {
  const [form, setForm] = useState({
    patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', reason: ''
  });
  const [message, setMessage] = useState('');

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    try {
      await onSubmit({
        ...form,
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId)
      });
      setForm({ patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', reason: '' });
      setMessage('Appointment booked successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="panel form-grid" onSubmit={submit}>
      <h2>Book an appointment</h2>
      <select name="patientId" value={form.patientId} onChange={update} required>
        <option value="">Select patient</option>
        {patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name}</option>)}
      </select>
      <select name="doctorId" value={form.doctorId} onChange={update} required>
        <option value="">Select doctor</option>
        {doctors.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>)}
      </select>
      <label>Appointment date<input type="date" name="appointmentDate" value={form.appointmentDate} onChange={update} required /></label>
      <label>Appointment time<input type="time" name="appointmentTime" value={form.appointmentTime} onChange={update} required /></label>
      <textarea name="reason" placeholder="Reason for visit (optional)" value={form.reason} onChange={update} />
      <button type="submit" disabled={!patients.length || !doctors.length}>Confirm appointment</button>
      {message && <p className="message">{message}</p>}
      {(!patients.length || !doctors.length) && <p className="hint">Register a patient and make sure doctors are available before booking.</p>}
    </form>
  );
}
