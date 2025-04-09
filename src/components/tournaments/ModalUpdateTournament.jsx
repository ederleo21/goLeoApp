import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from 'react-hot-toast';
import api from "../../api";

export const ModalUpdateTournament = ({ onClose, tournament, setTournament }) => {
  const [preview, setPreview] = useState(tournament.photo || null);

  const initialValues = {
    name: tournament.name,
    start_date: tournament.start_date,
    end_date: tournament.end_date,
    photo: null,
    active: tournament.active,
    description: tournament.description,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key !== "photo") { 
          formData.append(key, values[key]);
        }
      });

      if (values.photo) {
        formData.append("photo", values.photo);
      }      

      const response = await api.patch(`/tournaments/tournament/update/${tournament.id}/`, formData);
      setTournament(response.data);
      toast.success("Torneo actualizado correctamente.");
      onClose();  
    } catch (err) {
      console.error("Error al actualizar el torneo:", err);
      toast.error("Ocurrió un error al enviar los datos.");
    }finally{
      setSubmitting(false);
    }
  };
  


  return (
    <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-11/12 md:w-8/12 lg:w-6/12 max-h-[80vh] overflow-y-auto shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">✖</button>
        </div>
        <h2 className="text-3xl font-bold text-indigo_dark text-center mb-2">Actualizar Torneo</h2>
        <p className="text-center text-slate-600 mb-6">Modifica la información general de este torneo</p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6 text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium">Nombre</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="start_date" className="block text-gray-700 font-medium">Fecha de Inicio</label>
                  <Field
                    id="start_date"
                    name="start_date"
                    type="date"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="end_date" className="block text-gray-700 font-medium">Fecha de Fin</label>
                  <Field
                    id="end_date"
                    name="end_date"
                    type="date"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-gray-700 font-medium">Descripción</label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    rows="3"
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="photo" className="block text-gray-700 font-medium">Imagen del Torneo</label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue("photo", file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {preview && (
                    <img src={preview} alt="Vista previa" className="mt-4 rounded-lg shadow-md w-40 h-40 object-cover" />
                  )}
                </div>
                <div className="flex items-center space-x-3 md:col-span-2">
                  <Field
                    id="active"
                    name="active"
                    type="checkbox"
                    className="h-5 w-5 text-indigo border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="active" className="text-gray-700 font-medium">Activo</label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 font-bold">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400">
                  Cancelar
                </button>
                <button 
                 type="submit" 
                 className={`px-4 py-2 bg-indigo text-white rounded-lg shadow hover:bg-indigo_dark ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                 disabled={isSubmitting}
                 >
                  Guardar
                </button>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};
