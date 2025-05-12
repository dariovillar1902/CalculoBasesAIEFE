import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBasesHormigon } from "../store/slices/baseHormigonSlice";
import type { RootState, AppDispatch } from "../store";

const BaseHormigonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.baseHormigon
  );

  useEffect(() => {
    dispatch(fetchBasesHormigon());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  );
};

export default BaseHormigonList;
