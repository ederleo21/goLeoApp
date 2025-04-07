import React, { useState, useContext } from 'react';
import { MatchCard } from '../MatchCard';
import { MatchCreateFormModal } from '../tournamentFriendly/MatchCreateFormModal';
import { UserContext } from '../../../context/userContext';

export const AdditionalMatchesContainer = ({ matches: additionalMatches, tournament }) => {
  const [matches, setMatches] = useState(additionalMatches);
  const [isOpenModal, setIsOpenModal]  = useState(false);
  const { user } = useContext(UserContext);

  let additonalMatches = matches.filter((match) => match.round === 0)
  
  return (
    <div className='mt-8'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='text-center text-3xl text-gray-800 font-bold'>Partidos adicionales</h1>
        {user.permissions.add_match && 
          <button 
            className='bg-indigo hover:bg-indigo_dark py-3 px-4 font-bold text-white rounded-md'
            onClick={() => setIsOpenModal(true)}
            >Crear partido</button>
        }
      </div>

        <div className="max-h-[550px] font-[Poppins] overflow-y-auto grid grid-cols-1 mx-12 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 pb-10 border-b-2 py-2 px-2">
          {additonalMatches.length > 0 
          ? (
              additonalMatches.map((match) => 
                <MatchCard key={match.id} match={match} tournament={tournament}/>)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
                No hay partidos adicionales programados.
            </p>
          )}
        </div>
        {isOpenModal && (
          <MatchCreateFormModal tournament={tournament} setMatches={setMatches} onClose={() => setIsOpenModal(false)} />
        )}
    </div>
  )
}
