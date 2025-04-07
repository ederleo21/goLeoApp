import { useState } from "react";
import { FaTrophy, FaCalendarAlt, FaUsers, FaFutbol } from "react-icons/fa";
import { ClubsPositionsTableModal } from "../tournaments/ClubsPositionsTableModal";
import { SectionsMenu } from "./SectionsMenu";

export const HeaderTournament = ({ tournament, clubStatistics }) => {
  const { name, type, start_date, end_date, photo, active, description, league } = tournament;
  const [openModal, setOpenModal] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);

  return (
    <>
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 px-6 font-[Poppins]">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">

        <div className="w-full md:w-1/2 h-64 md:h-80 relative rounded-lg overflow-hidden shadow-lg md:block hidden">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-between space-y-4 md:w-1/2 md:ml-8 relative">
          <h1 className="text-3xl md:text-4xl font-semibold">{name}</h1>
          <p className="text-lg md:text-xl text-gray-300">
            <FaTrophy className="inline text-gray-400" /> {type === "LEAGUE" ? "Liga" : "Amistoso"}
          </p>
          {description && description.trim() !== "" && (
            <p className="text-gray-300 mt-4">{description}</p>
          )}
          <p className="text-lg text-gray-400 flex items-center gap-2">
            <FaCalendarAlt /> {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
          </p>
          <span className={`text-base font-semibold ${active ? "text-green-400" : "text-red-500"}`}>
            {active ? "Activo" : "Inactivo"}
          </span>
        
          {(type === "LEAGUE" || type === "CUP") && (
            <div>
              <button onClick={() => setOpenModal(true)} className="bg-emerald-700 rounded-lg px-4 py-2 font-semibold">
                Ver más
              </button>
            </div>
          )}

          {openModal && (
            <ModalInfo type={type} info={league} onClose={() => setOpenModal(false)} />
          )}
        </div>
        
      </div>
    </div>

    <SectionsMenu setOpenTableModal={setOpenTableModal} tournament={tournament} />

    {openTableModal && (
      <ClubsPositionsTableModal 
      statistics={clubStatistics} 
      pointsSystem={type === "LEAGUE" ? tournament.league.points_system : {"victory": 3, "draw": 1, "loss": 0}} 
      onClose={() => setOpenTableModal(false)} />
    )}
    </>
  );
};


export const ModalInfo = ({ type, info, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl mx-2 relative">

      <button
          className="absolute top-1 right-4 text-white text-4xl"
          onClick={onClose}
        >
          &times;
      </button>

        {type === "LEAGUE" && (
          <>
            <h2 className="text-2xl font-semibold text-white">Información de Liga</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 max-w-xl mx-auto px-4 py-2 rounded-lg">
              <p className="flex items-center gap-2">
                <FaFutbol className="text-gray-400" /> Formato: <span className="font-semibold">{info.league_format === "SINGLE" ? "Solo ida" : "Ida y vuelta"}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaUsers className="text-gray-400" /> Equipos: <span className="font-semibold">{info.teams_count}</span>
              </p>
              <p className="flex items-center gap-2">
                Rondas: <span className="font-semibold">{info.rounds}</span>
              </p>
              <p className="flex items-center gap-2">
                Puntos: <span className="font-semibold">{info.points_system.victory}V / {info.points_system.draw}E / {info.points_system.loss}D</span>
              </p>
            </div>
          </>
        )}
        
        {type === "CUP" && (
          <h1 className="text-2xl font-semibold text-white">Información de la Copa</h1>
        )}

      </div>
    </div>
  );
};
