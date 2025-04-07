import React, { useState } from 'react';
import { Pagination } from '../utils/Pagination';
import { NavLink } from 'react-router-dom';

const PlayerCard = ({ player, statType, index }) => {
    const statLabels = {
        goals: "Goles",
        assists: "Asistencias",
        recoveries: "Robos",
        saves: "Atajadas"
    };

    return (
        <div className="relative w-60 sm:w-40 md:w-48 lg:w-64 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col mb-2">
            <div className={`absolute top-2 right-2 font-bold rounded-full flex items-center justify-center
                ${index === 0 ? "bg-yellow-400 text-gray-900 text-lg w-12 h-12" : "bg-gray-500 text-sm text-white w-12 h-12"}`}>
                <span className='text-xl'>{index + 1}</span>
            </div>

            <div className="w-full h-52 sm:h-48 md:h-48 lg:h-64 overflow-hidden rounded-t-xl">
                <img className="w-full h-full object-cover" src={player.player_photo_url} alt="Player Photo" />
            </div>
            <div className="p-3 flex flex-col flex-grow text-center">
                <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                    {player.player_participation__player__first_name} <br /> {player.player_participation__player__last_name}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                    <span className="font-bold text-semibold text-cyan-300">{player.player_participation__player__club__name}</span>
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400">
                    {statLabels[statType]}: <span className="font-bold text-xl text-yellow-300">{player[`total_${statType}`]}</span>
                </p>
                <NavLink to={`/players/player/${player.player_participation__player__id}`}>
                    <button className="mt-1 text-sm bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">
                        Ver jugador
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export const SectionTopsPlayers = ({ statsPlayers }) => {
    const statCategories = [
        { key: "top_goalscorers", label: "Goleadores", type: "goals" },
        { key: "top_assists", label: "Asistentes", type: "assists" },
        { key: "top_recoveries", label: "Recuperadores", type: "recoveries" },
        { key: "top_saves", label: "Arqueros", type: "saves" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = statCategories.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const { key, label, type } = statCategories[currentPage - 1];

    return (
        <div className="flex flex-col items-center mt-6 font-[Poppins] w-full">
            <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">{label}</h2>

                <div className="flex flex-wrap justify-center gap-4 w-full">
                    {statsPlayers[key]?.map((player, index) => (
                        <PlayerCard key={index} player={player} statType={type} index={index} />
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                maxPageNumbersToShow={3}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        </div>
    );
};
