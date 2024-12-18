import React, { useState } from 'react';
import EventList from '../components/Events/EventList';
import EventFilter from '../components/Events/EventFilter';

const Home: React.FC = () => {
  const [filters, setFilters] = useState<any>({});

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <EventFilter onFilter={handleFilter} />
      <EventList filters={filters} />
    </div>
  );
};

export default Home;
