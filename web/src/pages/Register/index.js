import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post('/ongs', {
        name,
        email,
        whatsapp,
        city,
        uf
      });

      alert(`your access ID: ${response.data.id}`);
      history.push('/');
    } catch {
      alert(`something went wrong`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>register</h1>
          <p>enter the platform and help people find the cases of your NGO.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            already have an account
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO's name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="whatsApp"
            value={whatsapp}
            onChange={e => {
              setWhatsapp(e.target.value);
            }}
          />

          <div className="input-group">
            <input
              placeholder="city"
              value={city}
              onChange={e => {
                setCity(e.target.value);
              }}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => {
                setUf(e.target.value);
              }}
            />
          </div>

          <button className="button" type="submit">
            register
          </button>
        </form>
      </div>
    </div>
  );
}
