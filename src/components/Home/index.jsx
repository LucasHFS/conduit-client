/* eslint-disable react/no-unescaped-entities */
import Banner from "../Banner";
import FeedToggle from "../FeedToggle";
import Sidebar from "../Sidebar";
import { useFetchArticles } from "./useFetchArticles";
import PaginatedArticles from "../PaginatedArticles";

const Home = () => {
  const useFetchHook = (page) => {
    return useFetchArticles(page || 1);
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

export default Home;
