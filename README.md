# Hospital Appointment Management System

A beginner-friendly full-stack starter project.

## Technology
- Frontend: HTML, CSS, JavaScript, React (Vite)
- Backend: Core Java, Spring Boot, Spring Web, Spring Data JPA, Hibernate
- Database: Oracle SQL
- PL/SQL: sample stored procedures for appointment cancellation and status reporting

## MVP features
1. Register patients
2. Add, view, update and delete doctors
3. Book appointments
4. View appointments
5. Cancel appointments

## Project structure
```text
HospitalAppointmentManagement/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/hospital/appointment/
│       ├── HospitalAppointmentApplication.java
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── exception/
│       ├── repository/
│       └── service/
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       ├── services/
│       ├── App.jsx
│       ├── main.jsx
│       └── style.css
└── database/
    ├── hospital_schema.sql
    └── hospital_plsql.sql
```

## 1. Create the Oracle database objects
Open Oracle SQL Developer or SQL*Plus and connect to your application schema (for example, FREEPDB1).
Run these scripts in order:
1. `database/hospital_schema.sql`
2. `database/hospital_plsql.sql`

The schema script creates PATIENT, DOCTOR and APPOINTMENT tables and inserts sample doctors.

## 2. Configure the backend
Open `backend/src/main/resources/application.properties` and update:
- `spring.datasource.username`
- `spring.datasource.password`
- `spring.datasource.url` if your service name differs

The default URL is:
`jdbc:oracle:thin:@localhost:1521/FREEPDB1`

The Oracle user must have permission to create/read/update/delete tables if you use Hibernate schema validation. The included SQL script creates the tables, and Hibernate is configured with `ddl-auto=validate`.

Run from the `backend` folder:
```bash
mvn clean spring-boot:run
```
Backend base URL: `http://localhost:8080`

## 3. Run the React frontend
Install Node.js (LTS), then run:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite (normally `http://localhost:5173`).

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/patients` | Register a patient |
| GET | `/api/patients` | List patients |
| GET | `/api/doctors` | List doctors |
| GET | `/api/doctors/{id}` | Get one doctor |
| POST | `/api/doctors` | Add doctor |
| PUT | `/api/doctors/{id}` | Update doctor |
| DELETE | `/api/doctors/{id}` | Delete doctor |
| POST | `/api/appointments` | Book appointment |
| GET | `/api/appointments` | List appointments |
| PATCH | `/api/appointments/{id}/cancel` | Cancel appointment |

## Sample requests

Register patient:
```json
{
  "name": "Rahul Das",
  "email": "rahul@example.com",
  "phone": "9876543210"
}
```

Add doctor:
```json
{
  "name": "Dr. Ananya Rao",
  "specialization": "Cardiology",
  "email": "ananya@example.com",
  "consultationFee": 700
}
```

Book appointment:
```json
{
  "patientId": 1,
  "doctorId": 1,
  "appointmentDate": "2026-12-01",
  "appointmentTime": "10:30",
  "reason": "Regular check-up"
}
```

## Important learning points
- Core Java: classes, objects, constructors, encapsulation, enums, exception handling, collections and LocalDate/LocalTime.
- Spring: dependency injection through constructor injection, REST controllers, service layer, repositories and validation.
- JPA: `@Entity`, `@Id`, `@GeneratedValue`, `@ManyToOne`, `@JoinColumn`.
- Oracle SQL: primary keys, foreign keys, constraints and sequences/identity columns.
- PL/SQL: stored procedures, exception handling and explicit transaction control.

## Notes
- This is a learning/portfolio starter, not a production-ready medical system.
- Authentication, role-based authorization, doctor availability/slot conflict checks, audit logs and deployment are intentionally left as future enhancements.
- Do not store real patient medical data in this demo.
