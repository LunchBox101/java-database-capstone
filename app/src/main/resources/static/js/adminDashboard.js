// adminDashboard.js
import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

document.addEventListener('DOMContentLoaded', () => {
  const addDocBtn = document.getElementById('addDocBtn');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', () => openModal('addDoctor'));
  }

  loadDoctorCards();

  document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
  document.getElementById('filterTime').addEventListener('change', filterDoctorsOnChange);
  document.getElementById('filterSpecialty').addEventListener('change', filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    doctors.forEach(doctor => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
}

function filterDoctorsOnChange() {
  const searchBar = document.getElementById('searchBar').value.trim();
  const filterTime = document.getElementById('filterTime').value;
  const filterSpecialty = document.getElementById('filterSpecialty').value;

  const name = searchBar.length > 0 ? searchBar : null;
  const time = filterTime.length > 0 ? filterTime : null;
  const specialty = filterSpecialty.length > 0 ? filterSpecialty : null;

  filterDoctors(name, time, specialty)
    .then(response => {
      const doctors = response.doctors;
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = '';
      if (doctors.length > 0) {
        doctors.forEach(doctor => {
          const card = createDoctorCard(doctor);
          contentDiv.appendChild(card);
        });
      } else {
        contentDiv.innerHTML = '<p>No doctors found with the given filters.</p>';
      }
    })
    .catch(error => {
      console.error('Failed to filter doctors:', error);
      alert('An error occurred while filtering doctors.');
    });
}

export function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';
  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

window.adminAddDoctor = async function () {
  const name = document.getElementById('doctorName').value;
  const specialty = document.getElementById('specialization').value;
  const email = document.getElementById('doctorEmail').value;
  const password = document.getElementById('doctorPassword').value;
  const phone = document.getElementById('doctorPhone').value;

  const checked = document.querySelectorAll('input[name="availability"]:checked');
  const availableTimes = Array.from(checked).map(cb => cb.value);

  const token = localStorage.getItem('token');
  if (!token) {
    alert('No authentication token found. Please log in again.');
    return;
  }

  const doctor = { name, specialty, email, password, phone, availableTimes };

  const { success, message } = await saveDoctor(doctor, token);
  if (success) {
    alert(message || 'Doctor added successfully!');
    document.getElementById('modal').style.display = 'none';
    loadDoctorCards();
  } else {
    alert(message || 'Failed to add doctor.');
  }
};
