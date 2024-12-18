import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

interface Event {
  id: number;
  title: string;
  description: string;
  date_time: string;
  place: string;
  category: string;
  is_virtual: boolean;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error al obtener el evento', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await api.post('/events/register/', { event: id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Inscripción exitosa');
    } catch (error) {
      alert('Error al inscribirse en el evento');
    }
  };

  if (loading) return <p>Cargando evento...</p>;
  if (!event) return <p>Evento no encontrado</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">{event.title}</h2>
      <p className="mb-2">{event.description}</p>
      <p className="mb-2">
        <strong>Fecha y Hora:</strong> {new Date(event.date_time).toLocaleString()}
      </p>
      <p className="mb-2">
        <strong>Lugar:</strong> {event.place} {event.is_virtual ? '(Virtual)' : ''}
      </p>
      {isAuthenticated && (
        <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 mt-4">
          Inscribirse
        </button>
      )}
    </div>
  );
};

export default EventDetail;
