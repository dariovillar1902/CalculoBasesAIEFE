import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasesHormigon } from "../../store/slices/baseHormigonSlice";
import type { RootState, AppDispatch } from "../../store";
import type { BaseHormigon } from "../../types/BaseHormigon";
import "./BasesHormigonTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const BasesHormigonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  const handleViewResults = (id: number) => {
    navigate("/resultados", { state: { baseId: id } });
  };

  const handleEdit = (id: number) => {
    navigate("/new", { state: { baseId: id } });
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      "¿Estás seguro de que quieres eliminar esta base?"
    );
    if (!confirmed) return;

    try {
      await api.delete(`baseshormigon/${id}`);
      dispatch(fetchBasesHormigon());
    } catch (error) {
      console.error("Error al eliminar la base:", error);
      alert("No se pudo eliminar la base.");
    }
  };

  if (loading) return <p className="text-blue-500 text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Esfuerzo Axil (kN) </th>
              <th>Carga Admisible (kPa)</th>
              <th>Corte X (kN)</th>
              <th>Corte Y (kN)</th>
              <th>Momento X (kNm) </th>
              <th>Momento Y (kNm) </th>
              <th>Módulo Balasto (kN/m3) </th>
              <th className="acciones-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
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
                  <button
                    className="icon-square-btn"
                    title="Ver resultados"
                    onClick={() => handleViewResults(item.id)}
                  >
                    <FontAwesomeIcon icon={faChartBar} />
                  </button>

                  <button
                    className="icon-square-btn"
                    title="Editar"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>

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
