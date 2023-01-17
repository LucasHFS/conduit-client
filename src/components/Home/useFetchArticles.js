import { useState, useEffect, useCallback } from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { api } from "../../services/apiClient";
import { formatedErrorsArray } from "../../utils/request";
import { compactObject } from "../../utils/object";

export const useFetchArticles = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [query] = useQueryParams({
    tag: StringParam,
    page: NumberParam,
  });

  const { tag, page } = query;

  const fetchArticles = useCallback(() => {
    setLoading(true);
    const params = { tag, page };

    const compactedParams = compactObject(params);

    api
      .get("/articles", { params: compactedParams })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tag, page]);

  useEffect(() => {
    fetchArticles();

    return () => setErrors([]);
  }, [fetchArticles]);

  return {
    data,
    loading,
    errors,
  };
};
