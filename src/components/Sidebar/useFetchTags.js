import { useState, useEffect } from "react";
import { api } from "../../services/apiClient";
import { formatedErrorsArray } from "../../utils/request";

export const useFetchTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetchTags = async () => {
    setLoading(true);

    api
      .get("/tags")
      .then((response) => {
        setTags(response.data.tags);
      })
      .catch((err) => {
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTags();

    return () => setErrors([]);
  }, []);

  return {
    tags,
    loading,
    errors,
  };
};
