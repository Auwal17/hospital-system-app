import { useState, useEffect } from 'react'
import api from './api/axiosConfig'
import RegisterPatient from './components/RegisterPatient'
import Login from './components/Login' // 👈 Import the Login Screen
import useAuthStore from './store/useAuthStore' // 👈 Import our memory store
import { Activity, Users, LayoutDashboard, Settings, LogOut } from 'lucide-react'

function App() {
  // Grab the authentication state and logout function from Zustand
  const { isAuthenticated, logout } = useAuthStore();
  
  const [patients, setPatients] = useState([]);

  // Only try to fetch patients if the user is authenticated!
  useEffect(() => {
    if (isAuthenticated) {
      api.get('patients/')
        .then((response) => setPatients(response.data))
        .catch((err) => console.error("Failed to fetch patients", err));
    }
  }, [isAuthenticated]); // Rerun this if authentication status changes

  const handleNewPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  // 🛡️ THE BOUNCER: If they aren't logged in, ONLY show the Login screen
  if (!isAuthenticated) {
    return <Login />;
  }

  // 🎉 If they are logged in, show the full Dashboard!
  return (
    <div className="dashboard-layout">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <Activity size={28} color="#3b82f6" />
            HMS Core
          </div>
          
          <nav>
            <div className="nav-item">
              <LayoutDashboard size={20} /> Dashboard
            </div>
            <div className="nav-item active">
              <Users size={20} /> Patient Records
            </div>
            <div className="nav-item">
              <Settings size={20} /> System Admin
            </div>
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <div style={{ marginTop: 'auto', padding: '0 20px' }}>
          <div className="nav-item" onClick={logout} style={{ color: '#ef4444' }}>
            <LogOut size={20} /> Sign Out
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1 className="page-title">Patient Management</h1>
        
        <RegisterPatient onPatientAdded={handleNewPatient} />

        <div className="card">
          <h3>Current Roster</h3>
          <ul className="patient-list">
            {patients.map((patient) => (
              <li key={patient.id} className="patient-item">
                <div>
                  <strong>{patient.first_name} {patient.last_name}</strong> 
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                    DOB: {patient.date_of_birth}
                  </div>
                </div>
                <div style={{ fontWeight: '500' }}>
                  {patient.phone_number}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  )
}

export default App