import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";

export const ClubSelection = ({ clubs }) => {
  
  return (
    <FieldArray
      name="selectedClubs"
      render={(arrayHelpers) => (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Seleccionar clubes participantes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clubs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                Sin clubes disponibles...
              </div>
            ) : (
              clubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <label className="flex items-center space-x-4 cursor-pointer">
                    <Field
                      type="checkbox"
                      name="selectedClubs"
                      value={club.id}
                      checked={arrayHelpers.form.values.selectedClubs.includes(club.id)}
                      onChange={(e) => {
                        if (e.target.checked) arrayHelpers.push(club.id);
                        else {
                          const idx = arrayHelpers.form.values.selectedClubs.indexOf(club.id);
                          arrayHelpers.remove(idx);
                        }
                      }}
                      className="h-5 w-5 text-indigo focus:ring-indigo"
                    />
                    <div className="flex items-center space-x-2">
                      {club.logo && (
                        <img
                          src={club.logo}
                          alt={club.name}
                          className="h-10 w-10 object-cover rounded-full"
                        />
                      )}
                      <span className="text-gray-950">{club.name}</span>
                    </div>
                  </label>
                </div>
              ))
            )}
          </div>
          <ErrorMessage
            name="selectedClubs"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      )}
    />
  );
};

