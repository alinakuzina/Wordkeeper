import React, { useState, useRef } from "react";
import classes from "./Add.module.css";

const Add = (props) => {
  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={props.submitHandler}>
        <input
          type="text"
          id="word"
          ref={props.wordRef}
          className={classes.input}
          placeholder="Write new word..."
          autoComplete="off"
        />
        <button className={classes.button}>Add new word!</button>
      </form>
    </React.Fragment>
  );
};

export default Add;
