import { Link } from "react-router-dom";
import { useFetchTags } from "../hooks/useFetchTags";
import Loading from "./Loading";

const Sidebar = () => {
  const { tags, loading, errors } = useFetchTags();

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {loading ? (
          <Loading article="tags" />
        ) : (
          tags.map((tag) => (
            <Link
              to={`/?tag=${tag}`}
              key={tag}
              className="tag-pill tag-default"
            >
              {tag}
            </Link>
          ))
        )}

        {!!errors?.length && (
          <ul className="error-messages" data-test="error-list">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
