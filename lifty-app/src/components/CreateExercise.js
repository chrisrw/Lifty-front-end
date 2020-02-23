import React, { useState } from "react";
import Exercise from "./Exercise";
import { APIURL } from "../config";
import { useParams } from "react-router";

function CreateExercise({setRunRefresh}) {
  const { id } = useParams();
  const initialState = {
    name: "",
    sets: {
      setNumber: "",
      reps: "",
      weight: ""
    },
    workout: id
  };
  const [exercise, setExercise] = useState(initialState);
  const handleChange = e => {
   const property = e.target.name
   const value = e.target.value
    if(property === "name"){
        setExercise({
            ...exercise, [property]: value
        })
    } else {
        setExercise({
          ...exercise,
          sets:{
              ...exercise.sets,
              [property]: value
            }
        });
    }
   
  };
  const submitHandler = e => {
    e.preventDefault();
    fetch(`${APIURL}/exercise/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(exercise)
    }).then(response => response.json())
    .then(() => {
        setRunRefresh(true)
        setExercise(initialState)
    })
  };
  return <Exercise submitHandler={submitHandler} handleChange={handleChange} exercise={exercise}/>;
}

export default CreateExercise;
