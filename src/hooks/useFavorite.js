import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { api } from "../services/apiClient";
import { formatedErrorsArray } from "../utils/request";

export const useFavorite = (article) => {
  const navigate = useNavigate();

  const [favoritesCount, setFavoritesCount] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const favoritedButtonBackground = favorited
    ? "btn-primary"
    : "btn-outline-primary";
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { isAuthenticated } = useAuth();

  function favorite() {
    setFavoritesCount(article.favoritesCount - 1);
    setFavorited(false);
  }

  function unfavorite() {
    setFavoritesCount(article.favoritesCount + 1);
    setFavorited(true);
  }

  function revertToInitialState() {
    setFavoritesCount(article.favoritesCount);
    setFavorited(!favorited);
  }

  const toggleFavoritedState = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    } else {
      if (favorited && article.favorited) {
        favorite();
      } else if (favorited != article.favorited) {
        revertToInitialState();
      } else if (!favorited && !article.favorited) {
        unfavorite();
      }
    }
  };

  const favoriteRequest = async () => {
    api
      .post(`/articles/${article.slug}/favorite`)
      .catch((err) => {
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const unfavoriteRequest = async () => {
    api
      .delete(`/articles/${article.slug}/favorite`)
      .catch((err) => {
        setErrors(formatedErrorsArray(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleToggleFavorite = () => {
    const action = favorited ? "unfavorite" : "favorite";
    toggleFavoritedState();

    if (action === "favorite") {
      favoriteRequest();
    } else {
      unfavoriteRequest();
    }
  };

  useEffect(() => {
    setFavoritesCount(article.favoritesCount);
    setFavorited(article.favorited);
  }, [article.favoritesCount, article.favorited]);

  return {
    handleToggleFavorite,
    favoritedButtonBackground,
    favoritesCount,
    loading,
    errors,
  };
};
