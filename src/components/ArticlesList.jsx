import Loading from "../components/Loading";
import ArticlePreview from "../components/ArticlePreview";

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
      {errors?.length ? (
        <ul className="error-messages" data-test="error-list">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default ArticlesList;
