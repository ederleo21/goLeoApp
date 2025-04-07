import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast'
import api from '../../api';


export const ModalUpdateMatchStatistics = ({ player, onClose, setMatch }) => {
  const validationSchema = Yup.object({
    goals_scored: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    assists: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    shots_on_target: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    completed_passes: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    duel_wins: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    ball_recoveries: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    blocks: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    fouls_drawn: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    fouls_committed: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    yellow_cards: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    red_cards: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
    saves: Yup.number().min(0, "Debe ser un número positivo").required("Requerido"),
  });

  const initialValues = {
    goals_scored: player.goals_scored,
    assists: player.assists,
    shots_on_target: player.shots_on_target,
    completed_passes: player.completed_passes,
    duel_wins: player.duel_wins,
    ball_recoveries: player.ball_recoveries,
    blocks: player.blocks,
    fouls_drawn: player.fouls_drawn,
    fouls_committed: player.fouls_committed,
    yellow_cards: player.yellow_cards,
    red_cards: player.red_cards,
    saves: player.saves,
  };

  const statsFields = [
    { name: "goals_scored", label: "Goles Marcados" },
    { name: "assists", label: "Asistencias" },
    { name: "shots_on_target", label: "Tiros al arco" },
    { name: "completed_passes", label: "Pases completados" },
    { name: "duel_wins", label: "Duelos ganados" },
    { name: "ball_recoveries", label: "Recuperación de balón" },
    { name: "blocks", label: "Bloqueos" },
    { name: "fouls_drawn", label: "Faltas recibidas" },
    { name: "fouls_committed", label: "Faltas cometidas" },
    { name: "yellow_cards", label: "Tarjetas Amarillas" },
    { name: "red_cards", label: "Tarjetas Rojas" },
    { name: "saves", label: "Atajadas" },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await api.put(`/performance/player-statistics/${player.id}/update/`, values);
      setMatch((prevMatch) => ({
        ...prevMatch,
        home_team_statistics: prevMatch.home_team_statistics.map((stat) =>
          stat.id === player.id ? { ...stat, ...values } : stat
        ),
        away_team_statistics: prevMatch.away_team_statistics.map((stat) =>
          stat.id === player.id ? { ...stat, ...values } : stat
        ),
      }));
      toast.success("Estadísticas actualizadas");
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error al actualizar", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg py-4 px-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold m-2 text-center text-indigo_dark">Actualizar Estadísticas</h2>
        <p className="text-lg font-bold text-gray-700 mb-4 text-center">
          {player.player_first_name} {player.player_last_name}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {statsFields.map(({ name, label }) => (
                  <div key={name} className="mb-4">
                    <label htmlFor={name} className="block text-gray-700 font-medium">
                      {label}
                    </label>
                    <Field
                      name={name}
                      type="number"
                      className="mt-1 p-2 w-full border rounded"
                      min={0}
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 font-medium text-white rounded transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo hover:bg-indigo_dark font-semibold text-white rounded transition-all"
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
