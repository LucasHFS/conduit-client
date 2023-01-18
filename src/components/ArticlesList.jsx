import Loading from "../components/Loading";
import ArticlePreview from "../components/ArticlePreview";
import ErrorMessages from "./ErrorMessages";

const ArticlesList = ({ articles = [], loading, errors }) => {
  return (
    <>
      {loading ? (
        <Loading article="articles" />
      ) : (
        <>
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </>
      )}
      {!!errors?.length && <ErrorMessages errors={errors}/>}
    </>
  );
};

export default ArticlesList;
