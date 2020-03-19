import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";
import "../index.css";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log("this is in the delete request", res.data);
      })
      .catch(err => {
        console.log(err);
      });
    window.location.href = `/`;
  };

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  console.log("in the updateMovie");
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
