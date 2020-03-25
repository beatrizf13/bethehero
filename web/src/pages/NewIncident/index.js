import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleRegisterIncident(e) {
    e.preventDefault();

    try {
      await api.post(
        '/incidents',
        {
          title,
          description,
          value
        },
        {
          headers: {
            Authorization: ongId
          }
        }
      );

      alert(`incident registered`);
      history.push('/profile');
    } catch {
      alert(`something went wrong`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>register new incident</h1>
          <p>describe the incident in detail to find a hero to solve it</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            back to home
          </Link>
        </section>

        <form onSubmit={handleRegisterIncident}>
          <input
            placeholder="title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />

          <textarea
            placeholder="description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />

          <input
            placeholder="value"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />

          <button className="button" type="submit">
            register
          </button>
        </form>
      </div>
    </div>
  );
}
