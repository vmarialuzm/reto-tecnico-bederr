import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

interface Registration {
  id: number;
  event: {
    id: number;
    title: string;
    date_time: string;
    place: string;
  };
  status: string;
}

const MyRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchRegistrations = async () => {
        try {
          const response = await api.get('/events/my-registrations/');
          setRegistrations(response.data);
        } catch (error) {
          console.error('Error al obtener inscripciones', error);
        }
      };
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>Debes iniciar sesión para ver tus inscripciones.</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Mis Inscripciones</h2>
      {registrations.length === 0 ? (
        <p>No tienes inscripciones.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id} className="border p-4 mb-2 rounded">
              <h3 className="text-xl">{reg.event.title}</h3>
              <p>
                <strong>Fecha y Hora:</strong> {new Date(reg.event.date_time).toLocaleString()}
              </p>
              <p>
                <strong>Lugar:</strong> {reg.event.place}
              </p>
              <p>
                <strong>Estado:</strong> {reg.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRegistrations;
