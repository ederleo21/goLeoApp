import React from "react";
import api from "../../api";
import { Formik, Form, Field } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const ModalSelectPlayers = ({ match, playersHomeTeam, playersAwayTeam, loadingPlayers, onClose }) => {
  const navigate = useNavigate();

  const initialValues = {
    homePlayers: [],
    awayPlayers: [],
  };

  const validate = (values) => {
    const errors = {};
    if (values.homePlayers.length < 11) {
      errors.homePlayers =
        "Debe seleccionar al menos 11 jugadores para el equipo local.";
    }
    if (values.awayPlayers.length < 11) {
      errors.awayPlayers =
        "Debe seleccionar al menos 11 jugadores para el equipo visitante.";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    const listPlayers = values.homePlayers.concat(values.awayPlayers);
    try {
      await api.post(`/tournaments/match/participations_players/`, {
        match_id: match.id,
        players: listPlayers,
      });
      toast.success("Torneo iniciado con éxito");
      navigate(`/tournaments/match/${match.id}`);
    }catch(error) {
      toast.error("Error al iniciar el torneo: ", error);
    }finally{
      onClose();
    }
  };

  if (loadingPlayers) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <p className="text-indigo text-xl font-semibold">Cargando jugadores...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center font-[Poppins] justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6">
        <div className="flex items-center justify-between px-4 py-3 mb-3 bg-indigo text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">
            Seleccionar Jugadores para iniciar el partido
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <h3 className="text-base font-semibold">
          Elija con cuidado los jugadores, esto no se puede corregir
        </h3>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {/* Club Local */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-lg">
                      <img
                        src={match.home_team_logo || "/default-logo.png"}
                        alt={match.home_team_name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">
                      {match.home_team_name || "Club Local"}
                    </h3>
                  </div>
                  <div className="flex flex-col space-y-2 mt-3 w-full">
                    {playersHomeTeam.length > 0 ? playersHomeTeam.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center space-x-2"
                      >
                        <Field
                          type="checkbox"
                          name="homePlayers"
                          value={player.id}
                          id={`homePlayer-${player.id}`}
                          className="h-5 w-5 text-blue-600"
                          onChange={() => {
                            const isChecked = values.homePlayers.includes(
                              player.id
                            );
                            const newSelectedPlayers = isChecked
                              ? values.homePlayers.filter(
                                  (id) => id !== player.id
                                )
                              : [...values.homePlayers, player.id];

                            setFieldValue("homePlayers", newSelectedPlayers);
                          }}
                        />
                        <label
                          htmlFor={`homePlayer-${player.id}`}
                          className="text-gray-700 font-semibold"
                        >
                          {player.first_name} {player.last_name}
                        </label>
                      </div>
                    )) : (
                      <div className="flex  flex-col justify-center items-center gap-1 mb-2">
                        <p className="text-red-600">No hay jugadores en este club</p>
                        <NavLink to={'/players'} className="underline text-indigo_dark font-semibold">Registrar jugadores</NavLink>      
                      </div>
                    )}
                    {errors.homePlayers && touched.homePlayers && (
                      <div className="text-red-500 text-sm">
                        {errors.homePlayers}
                      </div>
                    )}
                  </div>
                </div>

                {/* Club Visitante */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-lg">
                      <img
                        src={match.away_team_logo || "/default-logo.png"}
                        alt={match.away_team_name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">
                      {match.away_team_name || "Club Visitante"}
                    </h3>
                  </div>
                  <div className="flex flex-col space-y-2 mt-3 w-full">
                    {playersAwayTeam.length > 0 ? playersAwayTeam.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center space-x-2"
                      >
                        <Field
                          type="checkbox"
                          name="awayPlayers"
                          value={player.id}
                          id={`awayPlayer-${player.id}`}
                          className="h-5 w-5 text-blue-600"
                          onChange={() => {
                            const isChecked = values.awayPlayers.includes(
                              player.id
                            );
                            const newSelectedPlayers = isChecked
                              ? values.awayPlayers.filter(
                                  (id) => id !== player.id
                                )
                              : [...values.awayPlayers, player.id];

                            setFieldValue("awayPlayers", newSelectedPlayers);
                          }}
                        />
                        <label
                          htmlFor={`awayPlayer-${player.id}`}
                          className="text-gray-700 font-semibold"
                        >
                          {player.first_name} {player.last_name}
                        </label>
                      </div>
                    )) : (
                      <div className="flex  flex-col justify-center items-center gap-1 mb-2">
                        <p className="text-red-600">No hay jugadores en este club</p>
                        <NavLink to={'/players'} className="underline text-indigo_dark font-semibold">Registrar jugadores</NavLink>      
                      </div>
                    )}
                    {errors.awayPlayers && touched.awayPlayers && (
                      <div className="text-red-500 text-sm">
                        {errors.awayPlayers}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo text-white rounded hover:bg-indigo_dark font-semibold"
                >
                  Iniciar partido
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
