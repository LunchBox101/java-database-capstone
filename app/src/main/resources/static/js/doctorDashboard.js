// doctorDashboard.js
import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

const appointmentTableBody = document.getElementById('patientTableBody');
const selectedDateInput = new Date().toISOString().split('T')[0];
let selectedDate = selectedDateInput;
const token = localStorage.getItem('token');
let patientName = 'null';

document.getElementById('searchBar').addEventListener('input', (e) => {
  const value = e.target.value.trim();
  patientName = value.length > 0 ? value : 'null';
  loadAppointments();
});

document.getElementById('todayButton').addEventListener('click', () => {
  selectedDate = new Date().toISOString().split('T')[0];
  document.getElementById('datePicker').value = selectedDate;
  loadAppointments();
});

document.getElementById('datePicker').addEventListener('change', (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

async function loadAppointments() {
  try {
    const data = await getAllAppointments(selectedDate, patientName, token);
    const appointments = data.appointments || data || [];

    appointmentTableBody.innerHTML = '';

    if (!appointments || appointments.length === 0) {
      appointmentTableBody.innerHTML =
        '<tr><td colspan="5">No Appointments found for today.</td></tr>';
      return;
    }

    appointments.forEach(appointment => {
      const patient = {
        id: appointment.patient.id,
        name: appointment.patient.name,
        phone: appointment.patient.phone,
        email: appointment.patient.email
      };
      const row = createPatientRow(patient, appointment.id, appointment.doctor.id);
      appointmentTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading appointments:', error);
    appointmentTableBody.innerHTML =
      '<tr><td colspan="5">Error loading appointments. Try again later.</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  loadAppointments();
});
