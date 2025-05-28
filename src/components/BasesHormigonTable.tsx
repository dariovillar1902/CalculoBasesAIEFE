import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasesHormigon } from "../store/slices/baseHormigonSlice";
import type { RootState, AppDispatch } from "../store";
import type { BaseHormigon } from "../types/BaseHormigon";

const BasesHormigonTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  useEffect(() => {
    console.log("API Data:", data); // Debugging step
  }, [data]);

  if (loading) return <p className="text-blue-500 text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-lg">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Bases Hormigon Data
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">
                Esfuerzo Axil
              </th>
              <th className="px-4 py-2 border border-gray-300">
                Carga Admisible
              </th>
              <th className="px-4 py-2 border border-gray-300">Ancho X</th>
              <th className="px-4 py-2 border border-gray-300">Ancho Y</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: BaseHormigon) => (
              <tr key={item.id} className="hover:bg-gray-200">
                <td className="px-4 py-2 border border-gray-300 text-black">
                  {item.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-black">
                  {item.esfuerzoAxil.valor}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-black">
                  {item.cargaAdmisible.valor}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-black">
                  {item.anchoColumnaX.valor}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-black">
                  {item.anchoColumnaY.valor}
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
