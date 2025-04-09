import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import api from "../../api";
import { createTournament } from "../../api/tournamentApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormField } from "./FormField";
import { ClubSelection } from "./ClubSelection";
import { useDispatch } from "react-redux";

const getValidationSchema = (typeSelected) => {
  const baseSchema = Yup.object({
    name: Yup.string()
      .max(100, "El nombre no debe exceder los 100 carácteres")
      .required("El nombre es requerido"),
    type: Yup.string().required("El tipo de torneo es requerido"),
    start_date: Yup.date().required("La fecha de inicio es requerida"),
    end_date: Yup.date()
      .required("La fecha de fin es requerida")
      .min(
        Yup.ref("start_date"),
        "La fecha de fin debe ser posterior a la de inicio"
      ),
    photo: Yup.mixed().nullable(),
    active: Yup.boolean(),
    description: Yup.string().nullable(),
    selectedClubs: Yup.array()
      .min(2, "Debes seleccionar al menos 2 clubes")
      .test(
        "is-even",
        "La cantidad de clubes debe ser par",
        (value) => value.length % 2 === 0
      ),
  });

  if (typeSelected === "LEAGUE") {
    return baseSchema.shape({
      points_system: Yup.object()
        .shape({
          victory: Yup.number()
            .required("Puntos de victoria son requeridos")
            .min(1, "Los puntos de victoria no pueden ser negativos, ni 0")
            .typeError("Debe ser un número válido"),
          draw: Yup.number()
            .required("Puntos por empate son requeridos")
            .min(0, "Los puntos no pueden ser negativos")
            .typeError("Debe ser un número válido"),
          loss: Yup.number()
            .required("Puntos por derrota son requeridos")
            .min(0, "Los puntos no pueden ser negativos")
            .typeError("Debe ser un número válido"),
        })
        .required("El sistema de puntos es requerido"),
      league_format: Yup.string()
        .oneOf(["SINGLE", "DOUBLE"], "Formato inválido")
        .required("El formato de la liga es requerido"),
    });
  }

  if (typeSelected === "CUP") {
    return baseSchema.shape({
      stages: Yup.number()
        .min(1, "Debe haber al menos una ronda")
        .required("El número de rondas es requerido"),
    });
  }

  return baseSchema;
};

export const TournamentsForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typeSelected = searchParams.get("typeSelected");
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubsActive = async () => {
      try {
        const response = await api.get("/core/clubs/?active=true");
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClubsActive();
  }, []);

  const initialValues = {
    name: "",
    type: typeSelected || "OTHER",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
    photo: null,
    description: "",
    active: true,
    ...(typeSelected === "LEAGUE" && {
      points_system: { victory: 3, draw: 1, loss: 0 },
      league_format: "SINGLE",
    }),
    ...(typeSelected === "CUP" && { stages: 1 }),
    selectedClubs: [],
  };


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        points_system,
        league_format,
        stages,
        selectedClubs,
        photo,
        ...tournamentData
      } = values;
  
      let additional_data = null;
  
      if (typeSelected === "LEAGUE") {
        additional_data = { points_system, league_format };
      }
  
      if (typeSelected === "CUP") {
        additional_data = { stages };
      }
  
      const full_data = { ...tournamentData, additional_data };
      const formData = new FormData();
      formData.append('name', full_data.name);
      formData.append('type', full_data.type);
      formData.append('start_date', full_data.start_date);
      formData.append('end_date', full_data.end_date);
      formData.append('active', full_data.active);
      formData.append('description', full_data.description);
  
      if (additional_data) {
        formData.append('additional_data', JSON.stringify(additional_data));
      }
  
      if (photo) {
        formData.append('photo', photo);
      }
  
      const tournament = await dispatch(createTournament(formData));
  
      if (tournament && tournament.id) {
        await api.post("/tournaments/participations/create/", {
          tournament_id: tournament.id,
          club_ids: selectedClubs,
        });
  
        navigate(`/tournaments`);
        toast.success("Torneo creado con éxito");
      } else {
        toast.error("Hubo un error al crear el torneo.");
      }
    } catch (error) {
      console.error("Error al crear el torneo:", error.message);
      toast.error("Error al crear el torneo: " + error.message);
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gradient-to-r from-blue-50 to-blue-100 pb-10 font-[Poppins]">
      <div className="bg-white mt-4 p-10 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Creación de torneo ({typeSelected || "Otro"})
        </h1>
  
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(typeSelected)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <FormField
                  label="Nombre del torneo"
                  name="name"
                  placeholder="Nombre del torneo"
                />
              </div>
  
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  label="Fecha de inicio"
                  name="start_date"
                  type="date"
                  placeholder="Fecha de inicio"
                />
                <FormField
                  label="Fecha de fin"
                  name="end_date"
                  type="date"
                  placeholder="Fecha de fin"
                />
              </div>
  
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Foto del torneo (opcional)
                </label>
                <input
                  name="photo"
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
  
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="active"
                  checked={values.active}
                  className="w-4 h-4 text-indigo focus:ring-indigo"
                />
                <label className="ml-2 text-gray-700">Activo</label>
              </div>
  
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-600 font-medium mb-1"
                >
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Descripción del torneo (opcional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
  
              {typeSelected === "LEAGUE" && (
                <>
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Formato de liga
                    </label>
                    <Field
                      as="select"
                      id="league_format"
                      name="league_format"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                    >
                      <option value="SINGLE">Solo ida</option>
                      <option value="DOUBLE">Ida y vuelta</option>
                    </Field>
                  </div>
  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Puntos por victoria
                      </label>
                      <Field
                        id="points_system_victory"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                        name="points_system.victory"
                        type="number"
                      />
                      <ErrorMessage
                        name="points_system.victory"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
  
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Puntos por empate
                      </label>
                      <Field
                        id="points_system_draw"
                        name="points_system.draw"
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                      />
                      <ErrorMessage
                        name="points_system.draw"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
  
                    <div>
                      <label className="block text-gray-600 font-medium mb-1">
                        Puntos por derrota
                      </label>
                      <Field
                        id="points_system_loss"
                        name="points_system.loss"
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                      />
                      <ErrorMessage
                        name="points_system.loss"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}
  
              {typeSelected === "CUP" && (
                <div>
                  <label
                    htmlFor="stages"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Número de rondas
                  </label>
                  <Field
                    id="stages"
                    name="stages"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo"
                  />
                  <ErrorMessage
                    name="stages"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}
  
              <ClubSelection clubs={clubs} />
  
              <div>
                <button
                  type="submit"
                  className={`w-full bg-indigo text-white font-semibold py-2 rounded-md hover:bg-indigo_dark transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  Crear Torneo
                </button>
              </div>
            </Form>
          )}
        </Formik>
  
        <NavLink
        to={"/tournaments"}
        >
        <button className="px-5 mt-4 py-2 rounded-md text-white bg-red-600 font-semibold">
          Salir
        </button>
        </NavLink>

      </div>
    </div>
  );  
};
