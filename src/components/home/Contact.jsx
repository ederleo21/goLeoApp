import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";
import img from "../../assets/img/g_contact.jpg";
import toast from 'react-hot-toast'

export const Contact = () => {

    const initialValues = {
        userName: "",
        userEmail: "",
        userMessage: "",
    }

  const validationSchema = Yup.object({
    userName: Yup.string().required("Tu nombre es requerido"),
    userEmail: Yup.string()
      .email("Correo inválido")
      .required("Tu email es requerido"),
    userMessage: Yup.string().required("Tu mensaje es requerido"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {

      const response = await api.post("send-email/", values)
      if(response.status == 200){
        toast.success("Emil sent succesfully!");
      }
      resetForm();

    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen font-[Poppins] flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full lg:w-2/5 space-y-7 bg-[#f2f2f2] p-5 rounded-xl">
              <h1 className="text-4xl font-bold text-center mt-8 text-gray-800">
                Contacta con nosotros!
              </h1>
              <div className="flex flex-col">
                <label htmlFor="userName" className="text-lg">
                  Nombres
                </label>
                <Field
                  className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Ingresa tu nombre"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="userEmail" className="text-lg">
                  Correo electrónico
                </label>
                <Field
                  className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="Ingresa tu email"
                />
                <ErrorMessage
                  name="userEmail"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="userMessage" className="text-lg">
                  Mensaje
                </label>
                <Field
                  as="textarea"
                  className="py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
                  name="userMessage"
                  id="userMessage"
                  cols="30"
                  rows="3"
                  placeholder="Ingresa tu mensaje"
                />
                <ErrorMessage
                  name="userMessage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-row justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo hover:bg-indigo_dark text-white text-xl rounded-lg font-semibold py-2 px-8"
                >
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col items-center w-full lg:w-2/4 my-5"> 
          <img className="rounded-lg" src={img} alt="img" />
          <p className="text-center text-sm pt-4 text-[#898888]">
            Mándanos un mensaje contándonos tu experiencia en GoLeo, o si tienes alguna duda o sugerencia.
          </p>
        </div>
      </div>
    </div>
  );
};

