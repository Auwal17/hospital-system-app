import { useState } from 'react';
import api from '../api/axiosConfig';

function RegisterPatient({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('patients/', formData)
      .then((response) => {
        onPatientAdded(response.data);
        setFormData({ first_name: '', last_name: '', date_of_birth: '', phone_number: '' });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card">
      <h3>Register New Patient</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>First Name</label>
            <input className="input-field" type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div>
            <label>Last Name</label>
            <input className="input-field" type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div>
            <label>Date of Birth</label>
            <input className="input-field" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone Number</label>
            <input className="input-field" type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn-primary" type="submit">Add Patient Record</button>
      </form>
    </div>
  );
}

export default RegisterPatient;