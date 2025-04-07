import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  score_home: Yup.number()
    .min(0, "Debe ser un número positivo")
    .required("Requerido"),
  score_away: Yup.number()
    .min(0, "Debe ser un número positivo")
    .required("Requerido"),
});

export const UpdateScoreMatchModal = ({ match, setMatch, onClose }) => {
  const initialValues = {
    score_home: match.score_home,
    score_away: match.score_away,
  };

  const handleSubmit = async(values, { setSubmitting }) => {
    try{
      await api.patch(`/tournaments/matches/${match.id}/update_score/`, values)
      toast.success("Marcador actualizado con éxito");
      setMatch(prevMatch => ({...prevMatch, score_home: values.score_home, score_away: values.score_away}));
      onClose();
    }catch(error){
      console.error(error.message);
      toast.error("Ocurrió un error al actualizar")
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-2xl font-bold text-indigo_dark mb-4 text-center">
          Actualizar Marcador
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="score_home"
                  className="block text-gray-700 font-medium"
                >
                  {match.home_team_name}
                </label>
                <Field
                  name="score_home"
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="score_home"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="score_away"
                  className="block text-gray-700 font-medium"
                >
                  {match.away_team_name}
                </label>
                <Field
                  name="score_away"
                  type="number"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="score_away"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium transition-all"
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
