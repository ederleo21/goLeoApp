import React from 'react'
import { ModalUpdatePLayer } from './ModalUpdatePlayer'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from "yup"
import { updatePlayerSkillsData } from '../../api/playersApi'
import { useDispatch } from 'react-redux'
import { getPlayerById } from '../../api/playersApi'
import toast from 'react-hot-toast'

export const ModalSkillsUpdate = ({ isOpen, onClose, skills, playerId }) => {

  const dispatch = useDispatch()

  const validationSchema = Yup.object(
    Object.keys(skills).reduce((schema, skill) => {
      schema[skill] = Yup.number()
        .min(0, "Debe ser al menos 0")
        .max(100, "Debe ser como máximo 100")
        .required("Requerido");
      return schema;
    }, {})
  );

  const handleSubmit = async(values) => {
    try{
      const payload = {...values, player: playerId}
      await dispatch(updatePlayerSkillsData(playerId, payload))
      await dispatch(getPlayerById(playerId))                        
      toast.success("Habilidades actualizadas con éxito")               
      onClose()
    }catch(error){
      console.error("Error al actualizar las habilidades")
      toast.error("Error al actualizar habilidades")
    }
  };

  return (
<ModalUpdatePLayer isOpen={isOpen} onClose={onClose} title="Habilidades">
  <Formik
    initialValues={skills}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
        {/* Contenedor responsivo en cuadrícula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(skills).map((skill) => (
            <div key={skill} className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </label>
              <Field
                name={skill}
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name={skill}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          ))}
        </div>

        {/* Botones al final */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo text-white font-semibold py-2 px-7 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
          Guardar
          </button>
        </div>
      </Form>
    )}
  </Formik>
</ModalUpdatePLayer>

  )
}
