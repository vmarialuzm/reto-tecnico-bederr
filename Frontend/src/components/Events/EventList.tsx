import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  date_time: string;
  place: string;
  category: string;
  is_virtual: boolean;
}

interface EventListProps {
  filters: any;
}

const EventList: React.FC<EventListProps> = ({ filters }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/events/', { params: filters });
        setEvents(response.data);
      } catch (error) {
        console.error('Error al obtener eventos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [filters]);

  if (loading) return <p>Cargando eventos...</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <h3 className="text-xl mb-2">{event.title}</h3>
            <p className="mb-2">{event.description.substring(0, 100) + '...'}</p>
            <p className="mb-2">
              <strong>Fecha y Hora:</strong> {new Date(event.date_time).toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>Lugar:</strong> {event.place} {event.is_virtual ? '(Virtual)' : ''}
            </p>
            <Link to={`/events/${event.id}`} className="text-blue-500">
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

