import React, { useState, useEffect } from "react";
import Exercise from "./Exercise";
import { Redirect, Link } from "react-router-dom";
import { APIURL } from "../config";
import { useParams } from "react-router";
function Workout({ match }) {
  const { id } = useParams();
  const getId = match.params.id;
  const [workout, setWorkout] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [name, editName] = useState("");
  //GET all exercises in specific workout
  useEffect(() => {
    fetch(`${APIURL}/workout/${getId}`)
      .then(resp => resp.json())
      .then(res => {
        setWorkout(res.exerciseList);
      });
  }, []);

  //DELETE workout
  const deleteWorkout = event => {
    const url = `${APIURL}/workout/${getId}`;
    fetch(url, { method: "DELETE" })
      .then(res => {
        setDeleted(true);
      })
      .catch(console.error);
  };
  if (deleted) {
    return <Redirect to="/home" />;
  }



  //GET exercise data for specific workout
  return (
    <div>
      <Exercise />
      <div>
        {workout.map(exercises => {
          return exercises.sets.map((sets, index) => {
            return (
              <>
                <div key={exercises._id}>{exercises.name}</div>
                <div key={sets._id}>
                  set#: {sets.setNumber} weight: {sets.weight} reps: {sets.reps}
                </div>
                <button
                  onClick={() => {
                    const url = `${APIURL}/exercise/${exercises._id}`;
                    fetch(url, { method: "DELETE" });
                  }}
                >
                  Delete Exercise
                </button>
              </>
            );
          });
        })}
      <button onClick={deleteWorkout}>Delete Workout</button>
      </div>
      </div>
  )    
}
export default Workout;
