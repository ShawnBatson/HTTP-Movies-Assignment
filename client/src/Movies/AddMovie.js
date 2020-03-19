import React, { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });
  const changeHandler = event => {
    setNewMovie({ ...newMovie, [event.target.name]: event.target.value });
    if (event.target.name === "stars") {
      setNewMovie({ ...newMovie, stars: event.target.value.split(",") });
    }
  };

  const handleSubmit = event => {
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then(res => {
        console.log("this is the put request inside addMovie", res.data);
        //dont do this V V V  This messes up the original array and sets it to an object V V V
        // props.updateMovie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <h3> To add a movie, fill out the form below</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddMovie;
