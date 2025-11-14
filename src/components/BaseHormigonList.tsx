import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasesHormigon } from "../store/slices/baseHormigonSlice";
import type { RootState, AppDispatch } from "../store";

/**
 * Componente que muestra una lista de "Bases de Hormigón".
 * Se conecta al store de Redux para obtener los datos y mostrar el resultado.
 */
const BaseHormigonList: React.FC = () => {
  // useDispatch permite ejecutar acciones de Redux. Acá tipamos el dispatch para que admita thunks.
  const dispatch = useDispatch<AppDispatch>();

  // Extraemos del estado global los datos, el estado de carga y los errores del slice baseHormigon.
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  /**
   * useEffect se ejecuta al montar el componente.
   * Llama a la acción asincrónica que obtiene la lista de bases desde el backend.
   * El array de dependencias incluye "dispatch" solo para cumplir reglas de React.
   */
  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  // Si está cargando, mostramos un mensaje simple de carga.
  if (loading) return <p>Loading...</p>;

  // Si hubo un error en la petición, lo mostramos.
  if (error) return <p>Error: {error}</p>;

  /**
   * Render simple: mostramos cada ítem de la lista como un <li>.
   * JSON.stringify se usa para visualizar el objeto completo mientras no haya un diseño más elaborado.
   */
  return (
    <ul>
      {data.map((item) => (
        // La clave única evita advertencias de React.
        <li key={item.id}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  );
};

export default BaseHormigonList;
