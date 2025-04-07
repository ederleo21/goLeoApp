import React from 'react';

export const ClubStatsHeader = ({ club }) => {

  if (!club) return null; 

  return (
    <>
    <h1 className='w-full max-w-64 text-center rounded-t-3xl p-2 pb-3 text-4xl mt-1 mx-auto font-[Gustep] font-bold'>{club.name}</h1>
    <div className="flex justify-center items-center">
      <img
        className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-md mx-auto md:mx-0"
        src={club.logo}
        alt={`${club.name} logo`}
      />
    </div>
    </>
  );
};