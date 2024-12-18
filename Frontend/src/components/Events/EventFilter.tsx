import React, { useState, useEffect } from 'react';

interface FilterProps {
  onFilter: (filters: any) => void;
}

const EventFilter: React.FC<FilterProps> = ({ onFilter }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isVirtual, setIsVirtual] = useState<string>('');

  useEffect(() => {
    // Define las categorías estáticas o extrae de la API si está disponible
    setCategories(['CONFERENCE', 'WORKSHOP', 'MEETUP', 'WEBINAR', 'NETWORKING', 'PARTY', 'FESTIVAL', 'EXHIBITION']);
  }, []);

  const handleFilter = () => {
    onFilter({
      category: selectedCategory,
      is_virtual: isVirtual,
    });
  };

  return (
    <div className="mb-4 flex space-x-4">
      <select
        className="border px-3 py-2"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Todas las Categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        className="border px-3 py-2"
        value={isVirtual}
        onChange={(e) => setIsVirtual(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="true">Virtuales</option>
        <option value="false">Presenciales</option>
      </select>
      <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2">
        Filtrar
      </button>
    </div>
  );
};

export default EventFilter;
