import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup'

const validationSchema = Yup.object({
    passing: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    shooting: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    dribbling: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    defense: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    physical: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    speed: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    vision: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
    goalkeeping: Yup.number().min(0, "No debe ser menor a 0").max(100, "No debe ser mayor a 100"),
  });

  const translateSkill = (skill) => {
    const translations = {
        passing: 'Pase',
        shooting: 'Tiro',
        dribbling: 'Regate',
        defense: 'Defensa',
        physical: 'Físico',
        speed: 'Velocidad',
        vision: 'Visión',
        goalkeeping: 'Arquería',
    };
    return translations[skill] || skill;
};

export const SkillsModalForm = ({ show, onClose, playerId, player, onSave }) => {

    if(!show) return null

    const [initialValues, setInitialValues] = useState({
        passing: 0,
        shooting: 0,
        dribbling: 0,
        defense: 0,
        physical: 0,
        speed: 0,
        vision: 0,
        goalkeeping: 0,
    })

    const handleSubmit = async(values) => {
        try{
            await onSave(values)
            onClose()
        }catch(error){
            console.error("Error al guardar habilidades")
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <div className='text-center text-green-600 font-bold'><p>El jugador ha sido creado!</p></div>
      <h2 className="text-2xl font-bold text-center my-2">{player.first_name} {player.last_name}</h2>
      <div className='text-center text-gray-500 font-bold mt-3 mb-4'><p>Evalúa sus habilidades del 0 al 100</p></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.keys(initialValues).map((skill) => (
                <div key={skill} className="mb-4">
                  <label htmlFor={skill} className="block text-gray-700 text-sm font-bold mb-2 capitalize">
                  {translateSkill(skill)}
                  </label>
                  <Field
                    type="number"
                    id={skill}
                    name={skill}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors[skill] && touched[skill] && (
                    <div className="text-red-500 text-xs mt-1">{errors[skill]}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center space-x-4">
              <div className='font-bold text-slate-600 w-64'><span>Estos datos son actualizables en cualquier momento</span></div>
              <button
                type="submit"
                className="bg-indigo font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-900"
              >
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  )
}








