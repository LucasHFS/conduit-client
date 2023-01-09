import { useState, useEffect, useCallback } from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { api } from "../../services/apiClient";
import { compactObject } from "../../utils/object";
import { formatedErrorsArray } from "../../utils/request";

export const useFetchFeedArticles = (page) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [query] = useQueryParams({
    author: StringParam,
    tag: StringParam,
    favorited: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });

  const { author, tag, favorited } = query;

  const fetchArticles = useCallback(async () => {
    const params = { author, tag, favorited, page };

    const compactedParams = compactObject(params);

    api
      .get("/articles/feed", { params: compactedParams })
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
