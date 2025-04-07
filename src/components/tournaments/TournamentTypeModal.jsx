import React from "react";
import { useNavigate } from "react-router-dom";
import league from "../../assets/img/g_league.jpg";
import friendly from "../../assets/img/g_friendly.jpg";
import copa from "../../assets/img/g_cup.jpg";

export const TournamentTypeModal = ({ onClose }) => {
  const navigate = useNavigate();

  const tournamentsTypes = [
    { value: "LEAGUE", label: "Liga", image: league },
    { value: "CUP", label: "Copa", image: copa },
    { value: "FRIENDLY", label: "Amistoso", image: friendly },
  ];

  const handleSelectType = (typeSelected) => {
    navigate(`/tournaments/create?typeSelected=${typeSelected}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto relative m-4 sm:m-6 md:m-8">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-center mb-6 text-gray-900">
          Selecciona un tipo de torneo
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournamentsTypes.map((type) => (
            <div
              key={type.value}
              className="relative group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gray-100"
            >
              <button
                onClick={() => handleSelectType(type.value)}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 border border-gray-300 font-bold py-3 px-5 text-xs sm:text-lg rounded-lg shadow-md transition-all hover:bg-gray-100 hover:border-gray-400 hover:text-indigo"
              >
                {type.label}
              </button>

              <img
                src={type.image}
                alt={type.label}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white font-bold bg-red-500 border py-3 px-4 text-sm rounded-full shadow-md transition-all hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
