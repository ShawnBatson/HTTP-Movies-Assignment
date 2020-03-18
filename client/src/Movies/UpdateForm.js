import React, { useState, useEffect } from "react";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateForm = props => {
  const [updateMovie, setUpdateMovie] = useState(initialMovie);

  useEffect(() => {
    const movieToUpdate = props.movieList.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });

    if (movieToUpdate) {
      setUpdateMovie(movieToUpdate);
    }
    console.log("movieToUpdate in updateform", movieToUpdate);
  }, [props.movie, props.match.params.id]);

  return (
    <div>
      <form>
        <label>Title</label>
        <input type="text" name="title" />
        <label>Director</label>
        <input type="text" name="director" />
        <label>Metascore</label>
        <input type="text" name="metascore" />
        <label>Stars</label>
        <input type="text" name="stars" />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
