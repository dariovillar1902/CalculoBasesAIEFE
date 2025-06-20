import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasesHormigon } from "../../store/slices/baseHormigonSlice";
import type { RootState, AppDispatch } from "../../store";
import type { BaseHormigon } from "../../types/BaseHormigon";
import "./BasesHormigonTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const BasesHormigonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta base?")) {
      // Dispatch deleteBaseHormigon(id)
      // or call api.delete(`baseshormigon/${id}`)
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
              <th>Esfuerzo Axil (kN) </th>
              <th>Carga Admisible (kPa)</th>
              <th>Ancho Columna X (m)</th>
              <th>Ancho Columna Y (m)</th>
              <th>Nivel de Fundación (m) </th>
              <th>Recubrimiento Hormigón (m) </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: BaseHormigon) => (
              <tr key={item.id}>
                <td>{item.esfuerzoAxil.valor}</td>
                <td>{item.cargaAdmisible.valor}</td>
                <td>{item.anchoColumnaX.valor}</td>
                <td>{item.anchoColumnaY.valor}</td>
                <td>{item.nivelFundacion.valor}</td>
                <td>{item.recubrimientoHormigon.valor}</td>
                <td>
                  <button className="icon-square-btn" title="Ver resultados">
                    <FontAwesomeIcon icon={faChartBar} />
                  </button>
                  <button className="icon-square-btn" title="Editar">
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
