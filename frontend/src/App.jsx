import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import PatientForm from './components/PatientForm';
import DoctorList from './components/DoctorList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';

export default function App() {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    async function loadData() {
        try {
            setError('');

            const [patientData, doctorData, appointmentData] =
                await Promise.all([
                    api.patients(),
                    api.doctors(),
                    api.appointments()
                ]);

            setPatients(patientData);
            setDoctors(doctorData);
            setAppointments(appointmentData);

        } catch (err) {
            setError(
                `${err.message} Confirm that Spring Boot and Oracle are running.`
            );
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function registerPatient(data) {
        await api.registerPatient(data);
        await loadData();
    }

    async function bookAppointment(data) {
        await api.bookAppointment(data);
        await loadData();
    }

    async function cancelAppointment(id) {
        try {
            await api.cancelAppointment(id);
            await loadData();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <header className="hero">
                <nav>
                    <span className="brand">✚ CarePoint</span>
                    <span>Hospital Appointment Management</span>
                </nav>

                <div className="hero-content">
                    <p className="eyebrow">YOUR HEALTH, OUR PRIORITY</p>
                    <h1>
                        Healthcare made<br />
                        simple and accessible.
                    </h1>
                    <p>
                        Find a doctor and manage your hospital appointments
                        in one place.
                    </p>
                    <a href="#booking" className="hero-link">
                        Book an appointment
                    </a>
                </div>
            </header>

            <main className="container">
                {error && <div className="error">{error}</div>}

                <div className="stats">
                    <div>
                        <strong>{doctors.length}</strong>
                        <span>Doctors</span>
                    </div>
                    <div>
                        <strong>{patients.length}</strong>
                        <span>Registered patients</span>
                    </div>
                    <div>
                        <strong>
                            {appointments.filter(
                                a => a.status === 'BOOKED'
                            ).length}
                        </strong>
                        <span>Active appointments</span>
                    </div>
                </div>

                <div className="section-heading">
                    <p className="eyebrow">GET STARTED</p>
                    <h2>Manage your care</h2>
                </div>

                <div className="two-column">
                    <PatientForm onSubmit={registerPatient} />
                    <AppointmentForm
                        patients={patients}
                        doctors={doctors}
                        onSubmit={bookAppointment}
                    />
                </div>

                <div className="section-heading">
                    <p className="eyebrow">OUR TEAM</p>
                    <h2>Meet our doctors</h2>
                </div>

                <DoctorList doctors={doctors} />

                <div id="booking" className="section-heading">
                    <p className="eyebrow">YOUR SCHEDULE</p>
                    <h2>Appointment overview</h2>
                </div>

                <AppointmentList
                    appointments={appointments}
                    onCancel={cancelAppointment}
                />
            </main>

            <footer>
                CarePoint Hospital · Learning project built with React,
                Spring Boot and Oracle SQL
            </footer>
        </>
    );
}