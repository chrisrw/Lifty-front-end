import React from "react";

function Exercise({exercise, submitHandler, handleChange}) {

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name of Exercise</label>
          <input
            name="name"
            type="text"
            value={exercise.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label># of reps</label>
          <input
            name="reps"
            type="text"
            value={exercise.sets.reps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Set #</label>
          <input
            name="setNumber"
            type="text"
            value={exercise.sets.setNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Weight</label>
          <input
            name="weight"
            type="text"
            value={exercise.sets.weight}
            onChange={handleChange}
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Exercise;
