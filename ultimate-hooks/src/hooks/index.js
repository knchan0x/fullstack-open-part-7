import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources([...resources, response.data]);
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    setResources.map((e) => (e.id === id ? response.data : e));
  };

  const service = {
    getAll,
    create,
    update,
  };

  useEffect(() => {
    const fetch = async () => await service.getAll();
    fetch();
  }, []);

  return [resources, service];
};
