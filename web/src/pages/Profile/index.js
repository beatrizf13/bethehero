import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';

import api from '../../services/api';

export default function Profile() {
  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function handleLoadIncidents() {
      const response = await api.get('/profile', {
        headers: {
          Authorization: ongId
        }
      });

      response && setIncidents(response.data.incidents);
    }

    handleLoadIncidents();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch {
      alert(`something went wrong`);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        {ongName && <span>welcome, {ongName}</span>}

        <Link className="button" to="/incidents/new">
          new incident
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>registered incidents</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>case:</strong>
            <p>{incident.title}</p>

            <strong>description</strong>
            <p>{incident.description}</p>

            <strong>value</strong>
            <p>
              {Intl.NumberFormat('pt-BT', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
