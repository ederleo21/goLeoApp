import { useState } from "react";
import { ModalUpdateUserProfile } from "./ModalUpdateUserProfile";

export const UserProfile = ({ user }) => {
  const [userData, setUserData] = useState(user.user); 
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const isSuperUser = user.groups.length === 0;

  return (
    <div className="flex justify-center items-center min-h-screen mx-5 font-[Poppins]">
      <div className="bg-white w-full max-w-3xl p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          {/* Imagen del Usuario */}
          <div className="mb-6">
            <img
              className="rounded-full w-40 h-40 object-cover border-4 border-indigo-500 shadow-md"
              src={userData.image}
              alt={`${userData.first_name} ${userData.last_name}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Información del Usuario */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {userData.first_name && userData.last_name
                    ? `${userData.first_name} ${userData.last_name}`
                    : "Sin nombres"}
                </h2>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-indigo-700">
                    Username:
                  </strong>{" "}
                  {userData.username}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-indigo-700">
                    Email:
                  </strong>{" "}
                  {userData.email}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-indigo-700">DNI:</strong>{" "}
                  {userData.dni ? userData.dni : "Sin dni"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-indigo-700">
                    Phone:
                  </strong>{" "}
                  {userData.phone ? userData.phone : "Sin teléfono"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-indigo-700">
                    Address:
                  </strong>{" "}
                  {userData.address ? userData.address : "Sin dirección"}
                </p>
              </div>
            </div>

            {/* Información de Grupos */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800">Grupos</h3>
              </div>
              <div className={`p-4 rounded-lg ${isSuperUser ? "bg-green-200" : "bg-gray-200"}`}>
                {isSuperUser ? (
                  <p className="text-gray-700">Este usuario es un superusuario, no tiene grupos.</p>
                ) : (
                  <ul className="list-disc pl-5 text-black">
                    {user.groups?.map((group, index) => (
                      <li key={index} className="text-lg text-black">
                        {group}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Botón de Actualización */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-indigo font-semibold text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo_dark transition duration-300"
              onClick={() => setIsModalUpdate(true)}
            >
              Actualizar Perfil
            </button>
          </div>
        </div>
      </div>
      {isModalUpdate && (
        <ModalUpdateUserProfile
          user={userData}
          onUpdateUser={setUserData} 
          onClose={() => setIsModalUpdate(false)}
        />
      )}
    </div>
  );
};
