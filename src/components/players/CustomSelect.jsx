import React, { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ clubs, selectedClub, handleChange }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (clubId) => {
    handleChange(clubId);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedClubData = clubs.find(club => club.id === selectedClub);

  return (
    <div className='relative max-w-sm mt-2 mx-auto font-[Poppins]' ref={selectRef}>
      <label htmlFor="club_select" className='sr-only'>Selecciona un club</label>
      <div
        id='club_select'
        onClick={toggleDropdown}
        className="flex items-center py-4 px-6 cursor-pointer text-lg text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm"
      >
        {selectedClubData && (
          <img
            src={selectedClubData.logo}
            alt={`${selectedClubData.name} logo`}
            className="w-8 h-8 mr-3"
          />
        )}
        <span className="flex-1">{selectedClubData?.name || 'Selecciona un club'}</span>
        <svg
          className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {clubs.map(club => (
            <div
              key={club.id}
              onClick={() => handleOptionClick(club.id)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img src={club.logo} alt={`${club.name} logo`} className="w-8 h-8 mr-3"/>
              {club.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
