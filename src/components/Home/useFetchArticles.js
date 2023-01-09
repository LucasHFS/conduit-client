import { useState, useEffect, useCallback } from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { api } from "../../services/apiClient";
import { formatedErrorsArray } from "../../utils/request";
import { compactObject } from "../../utils/object";

export const useFetchArticles = (page) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [query] = useQueryParams({
    author: StringParam,
    tag: StringParam,
    favorited: StringParam,
    limit: NumberParam,
    offset: NumberParam,
    page: NumberParam,
  });

  const { author, tag, favorited } = query;

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const params = { author, tag, favorited, page };

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
  }, [author, tag, favorited, page]);

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
