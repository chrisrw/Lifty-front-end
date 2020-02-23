import React from "react";
import { APIURL } from "../config";
import { useParams } from "react-router";
function Exercise() {
  const { id } = useParams();

  const submitHandler = e => {
    e.preventDefault();
    const { name, setNumber, reps, weight } = e.target;
    let exercise = {
      name: name.value,
      sets: {
        setNumber: setNumber.value,
        reps: reps.value,
        weight: weight.value
      },
      workout: id
    };
    fetch(`${APIURL}/exercise/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(exercise)
    }).then(response => response.json());
  };
  
  
    
  
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name of Exercise</label>
          <input name="name" type="text" />
        </div>
        <div>
          <label># of reps</label>
          <input name="reps" type="text" />
        </div>
        <div>
          <label>Set #</label>
          <input name="setNumber" type="text" />
        </div>
        <div>
          <label>Weight</label>
          <input name="weight" type="text" />
        </div>
        <button >Submit</button>
        
      </form>
    </div>
  );
}
export default Exercise;
