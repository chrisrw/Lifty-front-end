import React, { useState, useEffect } from "react";
import Exercise from "./Exercise";
import { Redirect, Link } from "react-router-dom";
import { APIURL } from "../config";
import { useParams } from "react-router";
import CreateExercise from "./CreateExercise";
import EditExercise from "./EditExercise";
function Workout() {
  const { id } = useParams();
  const [selectedExercise, setSelectedExercise] = useState("");
  const [workout, setWorkout] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [runRefresh, setRunRefresh] = useState(false);

    useEffect(() => {
      if (runRefresh) {
        fetch(`${APIURL}/workout/${id}`)
          .then(resp => resp.json())
          .then(res => {
            setWorkout(res.exerciseList);
            setRunRefresh(false);
          });
      }
    }, [runRefresh, id]);
  //GET all exercises in specific workout
  useEffect(() => {
    fetch(`${APIURL}/workout/${id}`)
      .then(resp => resp.json())
      .then(res => {
        setWorkout(res.exerciseList);
      });
  }, []);

  //DELETE workout
  const deleteWorkout = event => {
    const url = `${APIURL}/workout/${id}`;
    fetch(url, { method: "DELETE" })
      .then(res => {
        setDeleted(true);
      })
      .catch(console.error);
  };
  if(deleted){
    return <Redirect to='/home' />
  };
  
  //DELETE single
  const deleteExercise = id => {
      const url = `${APIURL}/exercise/${id}`;
      fetch(url, { method: "DELETE" })
      .then(res => {
        setRunRefresh(true);
      })
  };

  //GET exercise data for specific workout
  return (
    <div>
      <CreateExercise setRunRefresh={setRunRefresh}/>
      {selectedExercise && <EditExercise setSelectedExercise={setSelectedExercise} selectedExercise={selectedExercise} setRunRefresh={setRunRefresh}/>}
      <div>
        {workout.map(exercises => {
          return exercises.sets.map((sets, index) => {
            return (
              <div key={exercises._id}>
                <div>{exercises.name}</div>
                <div key={sets._id}>
                  set#: {sets.setNumber} weight: {sets.weight} reps: {sets.reps}
                </div>
                <button onClick={() => deleteExercise(exercises._id)}>Delete Exercise</button>
                <button
                  onClick={() => {
                    setSelectedExercise(exercises._id);
                  }}
                >
                  Edit Exercise
                </button>
              </div>
            );
          });
        })}
        <button onClick={deleteWorkout}>Delete Workout</button>
      </div>
    </div>
  );
}
export default Workout;
