import React from 'react';
export default function AppointmentList({ appointments, onCancel }) {
  return (
    <section className="panel">
      <h2>Appointments</h2>
      {appointments.length === 0 ? <p>No appointments booked yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.patient?.name}</td>
                  <td>{item.doctor?.name}</td>
                  <td>{item.appointmentDate}</td>
                  <td>{String(item.appointmentTime).slice(0, 5)}</td>
                  <td><span className={`status ${item.status?.toLowerCase()}`}>{item.status}</span></td>
                  <td>
                    {item.status === 'BOOKED'
                      ? <button className="danger small" onClick={() => onCancel(item.id)}>Cancel</button>
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
