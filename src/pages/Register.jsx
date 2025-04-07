import React from 'react'
import * as Yup from "yup"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { useNavigate } from 'react-router-dom'
import api from '../api'
import toast from 'react-hot-toast'

export const Register = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nombre de usuario requerido"),
    password: Yup.string().required("Contraseña es requerida"),
    confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar la contraseña es requerido"),
    first_name: Yup.string().required("Nombre es requerido"),
    last_name: Yup.string().required("Apellido es requerido"),
    email: Yup.string().email("Email invalido")
  })

  const handleSubmit = async(values, { setSubmitting }) => {
    try{
      await api.post("/api/user/register/", values)
      toast.success("Te registraste con éxito", {
        position: 'top-right',
        duration: 3000
      })
      navigate("/login")
    }catch(error){
      console.log("Error en el registro:", error)
    }
    setSubmitting(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white my-7 p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="font-serif text-4xl font-bold mb-6 text-center text-gray-900">Registro</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirm_password: "",
          first_name: "",
          last_name: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form className="grid grid-cols-1 gap-y-6">
            <div className="grid grid-cols-1 gap-y-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <Field 
                  type="text" 
                  name="first_name" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="first_name">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                <Field 
                  type="text" 
                  name="last_name" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="last_name">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="email">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                <Field 
                  type="text" 
                  name="username" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="username">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="password">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                <Field 
                  type="password" 
                  name="confirm_password" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
                <ErrorMessage name="confirm_password">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={isSubmitting}
            >
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
      <p className='mt-4'>¿Ya tienes una cuenta? <a href="/login"><span className='font-semibold text-blue-950 underline'>Inicia sesión</span></a></p>
    </div>
  </div>
  )
}
