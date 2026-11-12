import React from 'react';
export default function DoctorList({ doctors }) {
  return (
    <section className="panel">
      <h2>Our doctors</h2>
      {doctors.length === 0 ? <p>No doctors found. Check your backend/database connection.</p> : (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <div className="avatar">{doctor.name?.charAt(0) || 'D'}</div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <strong>₹{doctor.consultationFee}</strong>
              <small>{doctor.email}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
