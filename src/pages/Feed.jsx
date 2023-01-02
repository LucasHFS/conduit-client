/* eslint-disable react/no-unescaped-entities */
import Banner from "../components/Banner";
import FeedToggle from "../components/FeedToggle";
import Sidebar from "../components/Sidebar";
import { useFetchFeedArticles } from "../hooks/useFetchFeedArticles";
import PaginatedArticles from "../components/PaginatedArticles";

const Feed = () => {
  const useFetchHook = (page) => {
    return useFetchFeedArticles(page || 1);
  };

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
            <PaginatedArticles useFetchArticlesHook={useFetchHook} />
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
