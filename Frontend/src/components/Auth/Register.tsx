import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

      // Validar que las contraseñas coincidan antes de enviar
      if (password !== password2) {
        setErrors({ password2: 'Las contraseñas no coinciden.' });
        return;
      }

    try {
      await api.post('/users/register/', { email, password, password2 });
      alert('Registro exitoso');
      navigate('/login');
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert('Error en el registro');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Registro</h2>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className={`w-full border px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          className={`w-full border px-3 py-2 ${errors.password ? 'border-red-500' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Confirmar Contraseña</label>
        <input
          type="password"
          className={`w-full border px-3 py-2 ${errors.password2 ? 'border-red-500' : ''}`}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
      </div>

      <button type="submit" className="w-full bg-green-500 text-white py-2">
        Registrarse
      </button>
    </form>
  );
};

export default Register;
