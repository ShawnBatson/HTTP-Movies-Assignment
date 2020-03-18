import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";
import "../index.css";

function Movie(props, { addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {};
  console.log("in the updateMovie");
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const handleUpdate = () => {};

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // const routeChange = () => {
  //   const path = `/update-movie/${movie.id}`;
  //   const history = useHistory();
  //   history.push(path);
  // };
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        className="update-button"
        onClick={event => (window.location.href = `/update-movie/${movie.id}`)}
      >
        Update
      </button>
    </div>
  );
}

export default Movie;
