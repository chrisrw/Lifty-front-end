import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { fetchWorkoutList, deleteWorkout } from "../lib/api";
import { APIURL } from "../config";

function Home() {
  const initialWorkoutState = {
    date: Date()
  };

  const [workout, setWorkout] = useState([]);
  const [createNewWorkout, setCreateNewWorkout] = useState(initialWorkoutState);
  //create new workout
  const submitHandler = e => {
    e.preventDefault();
    const url = `${APIURL}/workout/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(createNewWorkout)
    }).then(response => response.json());
  };

  //fetch all workouts
  useEffect(() => {
    fetchWorkoutList()
      .then(res => {
        setWorkout(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="workoutDate">
      <h2>
        Select workout by date or click the button to create a new workout!
      </h2>
      <button onClick={submitHandler}>Click to create workout</button>
      <ul className="homeList">
        {workout.map((date, index) => (
          <div>
            <Link key={date._id} to={`/workout/${date._id}`}>
              <li key={date._id}>{new Date(date.date).toLocaleDateString()}</li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
