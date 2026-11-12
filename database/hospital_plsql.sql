-- PL/SQL practice: cancel an appointment safely.
CREATE OR REPLACE PROCEDURE CANCEL_HOSPITAL_APPOINTMENT (
    p_appointment_id IN NUMBER
)
AS
    v_status APPOINTMENT.STATUS%TYPE;
BEGIN
    SELECT STATUS
    INTO v_status
    FROM APPOINTMENT
    WHERE APPOINTMENT_ID = p_appointment_id
    FOR UPDATE;

    IF v_status = 'CANCELLED' THEN
        RAISE_APPLICATION_ERROR(-20002, 'Appointment is already cancelled.');
    END IF;

    UPDATE APPOINTMENT
    SET STATUS = 'CANCELLED'
    WHERE APPOINTMENT_ID = p_appointment_id;

    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20001, 'Appointment not found.');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

-- PL/SQL practice: count appointments for a doctor.
CREATE OR REPLACE PROCEDURE GET_DOCTOR_APPOINTMENT_COUNT (
    p_doctor_id IN NUMBER,
    p_total OUT NUMBER
)
AS
BEGIN
    SELECT COUNT(*)
    INTO p_total
    FROM APPOINTMENT
    WHERE DOCTOR_ID = p_doctor_id
      AND STATUS = 'BOOKED';
END;
/

-- Example calls:
-- EXEC CANCEL_HOSPITAL_APPOINTMENT(1);
-- DECLARE
--   v_total NUMBER;
-- BEGIN
--   GET_DOCTOR_APPOINTMENT_COUNT(1, v_total);
--   DBMS_OUTPUT.PUT_LINE('Booked appointments: ' || v_total);
-- END;
-- /
