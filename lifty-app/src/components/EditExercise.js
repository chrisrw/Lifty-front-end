import React, { useState, useEffect } from "react";
import Exercise from "./Exercise";
import { APIURL } from "../config";
import { useParams } from "react-router";

function EditExercise({selectedExercise, setRunRefresh, setSelectedExercise}) {
  const { id } = useParams();
  const [exercise, setExercise] = useState({
    name: "",
    sets: {
      setNumber: "",
      reps: "",
      weight: ""
    },
    workout: id
  });

  const handleChange = e => {
    const property = e.target.name;
    const value = e.target.value;
    if (property === "name") {
      setExercise({
        ...exercise,
        [property]: value
      });
    } else {
      setExercise({
        ...exercise,
        sets: {
          ...exercise.sets,
          [property]: value
        }
      });
    }
  };
  const submitHandler = e => {
    e.preventDefault();

    fetch(`${APIURL}/exercise/${selectedExercise}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(exercise)
    })
      .then(response => response.json())
      .then(() => {
          setRunRefresh(true)
          setSelectedExercise("")
      })
  };
  useEffect(()=> {
      fetch(`${APIURL}/exercise/${selectedExercise}`)
      .then(res=> res.json())
      .then(res => {
          const exercise = res;
          exercise.sets = exercise.sets[0]
          setExercise(exercise)
        })
  },[])
  return (
    <Exercise
      submitHandler={submitHandler}
      handleChange={handleChange}
      exercise={exercise}
    />
  );
}

export default EditExercise;
