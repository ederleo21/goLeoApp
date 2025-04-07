import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast  from "react-hot-toast";
import api from "../../../api";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  home_team: Yup.string().required("El equipo local es obligatorio"),
  away_team: Yup.string()
    .required("El equipo visitante es obligatorio")
    .notOneOf([Yup.ref("home_team")], "No pueden ser el mismo equipo"),
  date: Yup.date().required("La fecha es obligatoria"),
});

export const MatchCreateFormModal = ({onClose, tournament, setMatches, isToUpdate = false, match, setMatch}) => {
  const [initialValues, setInitialValues] = useState({
    tournament: tournament.id,
    home_team: "",
    away_team: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if(isToUpdate && match){
      setInitialValues({
        home_team: match.home_team,
        away_team: match.away_team,
        description: match.description,
        date: match.date ? match.date : ""
      })
    }
  }, [isToUpdate, match])
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if(!isToUpdate && !match){
        var resCreate = await api.post(`/tournaments/matches/create/`, values);
        handleMatchCreated(resCreate.data);
      }else{
        var resUpdate = await api.patch(`/tournaments/match/${match.id}/`, values)
        setMatch(resUpdate.data);
      }
      toast.success(isToUpdate ? 'Partido actualizado con éxito' : 'Partido creado con éxito');
      onClose();
    } catch (error) {
      toast.error("Ocurrió un error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMatchCreated = (newMatch) => {
    setMatches((prevMatches) => [newMatch, ...prevMatches]);
  };

  return (
<div className="fixed inset-0 flex items-center justify-center font-[Poppins] bg-black bg-opacity-50">
  <div className="bg-white rounded-lg p-8 mx-3 mt-14 w-full max-w-[95vw] md:max-w-[600px] shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[90vh] overflow-auto">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center col-span-2">
      {isToUpdate ? "Actualizar partido" : "Crear partido"}
    </h2>
    <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-700 text-center col-span-2">
      {tournament.name}
    </h2>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6 col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm sm:text-lg text-gray-700 mb-2">
                Club Local
              </label>
              <Field
                as="select"
                name="home_team"
                className="w-full border rounded p-3 pr-10 text-sm sm:text-base"
              >
                <option value="">Selecciona un equipo</option>
                {tournament?.clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="home_team"
                component="p"
                className="text-red-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-lg text-gray-700 mb-2">
                Club Visitante
              </label>
              <Field
                as="select"
                name="away_team"
                className="w-full border rounded p-3 pr-10 text-sm sm:text-base"
              >
                <option value="">Selecciona un equipo</option>
                {tournament?.clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="away_team"
                component="p"
                className="text-red-500 text-xs sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm sm:text-lg text-gray-700 mb-2"
              >
                Descripción (Opcional)
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Descripción del torneo (opcional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-lg text-gray-700 mb-2">
                Fecha
              </label>
              <Field
                type="date"
                name="date"
                className="w-full border rounded p-3 text-sm sm:text-base"
              />
              <ErrorMessage
                name="date"
                component="p"
                className="text-red-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4 col-span-2">
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 font-semibold text-white py-2 px-4 sm:py-3 sm:px-6 rounded text-sm sm:text-base"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="bg-indigo hover:bg-indigo_dark font-semibold text-white py-2 px-4 sm:py-3 sm:px-6 rounded text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : isToUpdate ? "Actualizar Partido" : "Crear partido"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
</div>

  );
};
