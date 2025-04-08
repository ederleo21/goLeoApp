import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import toast from 'react-hot-toast';

export const ModalUpdateUserProfile = ({ user, onUpdateUser, onClose }) => {
  const [previewImage, setPreviewImage] = useState(user.image || null);

  const validationSchema = Yup.object({
    username: Yup.string().required("Requerido"),
    email: Yup.string().email("Email inválido").required("Requerido"),
    first_name: Yup.string().required("Requerido"),
    last_name: Yup.string().required("Requerido"),
    dni: Yup.string().required("Ingresa tu dni"),
  })

  const initialValues = {
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    image: null,
    address: user.address || "", 
    dni: user.dni || "",
    phone: user.phone || "",
  }

  const handleSubmit = async(values, { setSubmitting }) => {
    try{
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key !== "image") { 
          formData.append(key, values[key]);
        }
      });

      if (values.image) {
        formData.append("image", values.image);
      }     
      const res = await api.patch(`/core/users/${user.id}/update/`, formData);
      onUpdateUser(res.data);
      toast.success("Perfil actualizado correctamente.");
      onClose();
    }catch(err){
      toast.error("Ocurrió un error al enviar los datos.");
    }finally{
      setSubmitting(false);
    }
  }

  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg py-4 px-8 w-full max-w-4xl max-h-[75vh] overflow-auto">
    <h2 className="text-2xl font-bold m-2 mb-8 text-center text-indigo_dark">Actualizar Perfil</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div className="mb-2">
              <label htmlFor="username" className="block text-base">Username:</label>
              <Field
                id="username"
                name="username"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 mt-2 text-sm" />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-base">Email:</label>
              <Field
                id="email"
                name="email"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className="mb-2">
              <label htmlFor="first_name" className="block text-base">Nombre:</label>
              <Field
                id="first_name"
                name="first_name"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="first_name" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className="mb-2">
              <label htmlFor="last_name" className="block text-base">Apellido:</label>
              <Field
                id="last_name"
                name="last_name"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="last_name" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-gray-700 font-medium">Imagen del usuario</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFieldValue("image", file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              {previewImage && (
                <img src={previewImage} alt="Vista previa" className="mt-4 rounded-lg shadow-md w-40 h-40 object-cover" />
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="dni" className="block text-base">DNI:</label>
              <Field
                id="dni"
                name="dni"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
              <ErrorMessage name="dni" component="div" className="text-red-500 mt-2 text-sm" />
            </div>

            <div className="mb-2">
              <label htmlFor="address" className="block text-base">Dirección:</label>
              <Field
                id="address"
                name="address"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="phone" className="block text-base">Teléfono:</label>
              <Field
                id="phone"
                name="phone"
                type="text"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              />
            </div>
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
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
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
  )
}
