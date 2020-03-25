import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Login() {
  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.ong.name);

      history.push('/profile');
    } catch {
      alert('wrong credentials');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>login</h1>

          <input
            placeholder="your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button">go</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            don't have an account
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
