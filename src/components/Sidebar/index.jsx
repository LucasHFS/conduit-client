import { Link } from "react-router-dom";
import { useFetchTags } from "./useFetchTags";
import Loading from "../Loading";
import ErrorMessages from "../ErrorMessages";

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

        {!!errors?.length && <ErrorMessages errors={errors}/>}

      </div>
    </div>
  );
};

export default Sidebar;
