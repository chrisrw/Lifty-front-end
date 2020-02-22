import React, { useState, useEffect } from "react";
import Exercise from "./Exercise";
import { APIURL } from "../config";

function Workout({ match }) {
  const [workout, setWorkout] = useState([]);
  const getId = match.params.id;

  useEffect(() => {
    fetch(`${APIURL}/workout/${getId}`)
      .then(resp => resp.json())
      .then(res => {
        setWorkout(res.exerciseList);
      });
  }, []);

  //GET exercise data for specific workout
  return (
    <div>
      <Exercise />
      <div>
        {workout.map(exercises => {
          return <div key={exercises._id}>{exercises.name}</div>;
        })}
        {/* map through twice to get nested array */}
        {workout.map(exercises => {
          return exercises.sets.map(sets => {
            return (
              <div key={sets._id}>
                set#: {sets.setNumber} weight: {sets.weight} reps: {sets.reps}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Workout;
