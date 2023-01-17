import { Link } from "react-router-dom";
import { useFavorite } from "./useFavorite";
import { formatDate } from "../../utils/date";
import TagList from "../TagList";

const ArticlePreview = ({ article }) => {
  const articleDate = formatDate(article.createdAt);
  const { handleToggleFavorite, favoritesCount, favoritedButtonBackground } =
    useFavorite(article);

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img alt="profile" src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={`/@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{articleDate}</span>
        </div>
        <button
          className={`btn ${favoritedButtonBackground} btn-sm pull-xs-right`}
          onClick={handleToggleFavorite}
        >
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div className="display-flex space-between">
          <span>Read more...</span>
          <TagList tags={article.tagList} />
        </div>
      </Link>
    </div>
  );
};

export default ArticlePreview;
