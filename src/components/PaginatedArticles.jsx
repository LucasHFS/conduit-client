import { useEffect, useState } from "react";
import { NumberParam, useQueryParam } from "use-query-params";
import Loading from "../components/Loading";
import ArticlesList from "./ArticlesList";
import ErrorMessages from "./ErrorMessages";
import Paginate from "./Paginate";

const PaginatedArticles = ({ useFetchArticlesHook }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, errors } = useFetchArticlesHook(currentPage);

  const [queryPage, setQueryPage] = useQueryParam("page", NumberParam);
  const paginationInfo = data?.paginationInfo;

  useEffect(() => {
    setCurrentPage(queryPage || 1);
  }, [queryPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setQueryPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setQueryPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (
      currentPage !== Math.ceil(paginationInfo?.total / paginationInfo?.perPage)
    ) {
      setCurrentPage(currentPage + 1);
      setQueryPage(currentPage + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loading article="articles" />
      ) : (
        <>
          <ArticlesList articles={data.articles} />
          <Paginate
            perPage={paginationInfo?.perPage}
            total={paginationInfo?.total}
            currentPage={currentPage}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </>
      )}
      {!!errors?.length && <ErrorMessages errors={errors}/>}
    </>
  );
};

export default PaginatedArticles;
