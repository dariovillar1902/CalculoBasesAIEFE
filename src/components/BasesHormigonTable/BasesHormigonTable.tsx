import React, { useEffect } from "react";
// Importa funciones de Redux para despachar acciones y acceder al estado global
import { useDispatch, useSelector } from "react-redux";
// Acción que trae desde el backend la lista de bases de hormigón
import { fetchBasesHormigon } from "../../store/slices/baseHormigonSlice";
// Tipos para el estado global y el tipo de dato BaseHormigon
import type { RootState, AppDispatch } from "../../store";
import type { BaseHormigon } from "../../types/BaseHormigon";
// Estilos específicos para esta tabla
import "./BasesHormigonTable.scss";
// Íconos que se usan en los botones de acción
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// Hook para redireccionar a otras pantallas
import { useNavigate } from "react-router-dom";
// Cliente HTTP para hacer peticiones al backend
import api from "../../utils/api";

// Componente principal que muestra una tabla con las bases de hormigón registradas
const BasesHormigonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Extrae del estado global los datos, el estado de carga y posibles errores
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  // Al cargar el componente, se solicita la lista de bases al backend
  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  // Redirige a la pantalla de resultados, pasando el ID de la base seleccionada
  const handleViewResults = (id: number) => {
    navigate("/resultados", { state: { baseId: id } });
  };

  // Redirige al formulario de edición, pasando el ID de la base a editar
  const handleEdit = (id: number) => {
    navigate("/new", { state: { baseId: id } });
  };

  // Elimina una base luego de confirmar con el usuario
  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      "¿Estás seguro de que quieres eliminar esta base?"
    );
    if (!confirmed) return;

    try {
      // Llama al backend para eliminar la base
      await api.delete(`baseshormigon/${id}`);
      // Vuelve a cargar la lista actualizada
      dispatch(fetchBasesHormigon());
    } catch (error) {
      console.error("Error al eliminar la base:", error);
      alert("No se pudo eliminar la base.");
    }
  };

  // Muestra mensaje de carga mientras se obtienen los datos
  if (loading) return <p className="text-blue-500 text-lg">Loading...</p>;
  // Muestra mensaje de error si algo falló
  if (error) return <p className="text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Esfuerzo Axil (kN)</th>
              <th>Carga Admisible (kPa)</th>
              <th>Corte X (kN)</th>
              <th>Corte Y (kN)</th>
              <th>Momento X (kNm)</th>
              <th>Momento Y (kNm)</th>
              <th>Módulo Balasto (kN/m3)</th>
              <th className="acciones-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Recorre cada base y muestra sus datos en una fila */}
            {data.map((item: BaseHormigon) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.esfuerzoAxil.valor}</td>
                <td>{item.cargaAdmisible.valor}</td>
                <td>{item.corteX.valor}</td>
                <td>{item.corteY.valor}</td>
                <td>{item.momentoX.valor}</td>
                <td>{item.momentoY.valor}</td>
                <td>{item.moduloBalasto.valor}</td>
                <td className="acciones-column">
                  {/* Botón para ver resultados */}
                  <button
                    className="icon-square-btn"
                    title="Ver resultados"
                    onClick={() => handleViewResults(item.id)}
                  >
                    <FontAwesomeIcon icon={faChartBar} />
                  </button>

                  {/* Botón para editar la base */}
                  <button
                    className="icon-square-btn"
                    title="Editar"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>

                  {/* Botón para eliminar la base */}
                  <button
                    className="icon-square-btn danger"
                    title="Eliminar"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasesHormigonTable;
