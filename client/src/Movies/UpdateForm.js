import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });

  useEffect(() => {
    const movieToUpdate = props.movieList.find(movie => {
      return String(movie.id) === props.match.params.id;
    });

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
    console.log("movieToUpdate in updateform", movieToUpdate);
  }, [props.movieList, props.match.params.id]);

  const changeHandler = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
    if (event.target.name === "stars") {
      setMovie({ ...movie, stars: event.target.value.split(",") });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("this is the put request", res.data);
        //dont do this V V V  This messes up the original array and sets it to an object V V V
        // props.updateMovie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    window.location.href = `/movies/${movie.id}`;
  };

  const handleDelete = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("this is in the delete request", res.data);
      })
      .catch(err => {
        console.log(err);
      });
    window.location.href = `/movies`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <label>Director</label>
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="title"
          value={movie.director}
        />
        <label>Metascore</label>
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="title"
          value={movie.metascore}
        />
        <label>Stars</label>
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />
        <button>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default UpdateForm;
