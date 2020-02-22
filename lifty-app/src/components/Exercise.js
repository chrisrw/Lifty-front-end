import React, { useState, useEffect } from "react";
import {APIURL} from '../config'
import { useParams } from "react-router";
function Exercise() {
const {id} = useParams()

  const initialState = {
    name: "" ,
    sets: [
      {
        setNumber: 0,
        reps: 0,
        weight: 0
      }
    ]
  }
  
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [set, setSetNumber] = useState("");
  const [exercisesArray, setExercisesArray] = useState(initialState);
  
  const submitHandler = e => {
    e.preventDefault();
    fetch(`${APIURL}/exercise/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(exercisesArray)
    }).then(response => response.json());
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name of Exercise</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label># of reps</label>
          <input
            value={reps}
            onChange={e => setReps(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>Set #</label>
          <input
            value={set}
            onChange={e => setSetNumber(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>Weight</label>
          <input
            value={weight}
            onChange={e => setWeight(e.target.value)}
            type="text"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Exercise;
