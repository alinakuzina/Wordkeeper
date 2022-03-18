import React, { useRef, useState } from "react";
import classes from "./Word.module.css";

const Word = (props) => {
  const [CurWord, setWord] = useState(`${props.word}`);
  const [openChange, setOpenChange] = useState(false);

  const changeWord = (value) => {
    setWord(value);
  };

  const confirmChanges = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    props.changeWord(CurWord, event.target.id);
    setOpenChange(false);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setOpenChange(true);
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    props.deleteWord(e.target.id);
    console.log(`DELETE ${e.target.id}`);
  };

  return (
    <React.Fragment>
      {!openChange && (
        <div className={classes.word} id={props.id}>
          <div>{props.word}</div>
          <button className={classes.svg} onClick={deleteHandler} id={props.id}>
            Delete
          </button>

          <button className={classes.svg} onClick={changeHandler} id={props.id}>
            Change
          </button>
        </div>
      )}
      {openChange && (
        <form
          className={classes.change}
          onSubmit={confirmChanges}
          id={props.id}
        >
          <input
            className={classes.input}
            value={CurWord}
            onChange={(e) => changeWord(e.target.value)}
          />
          <button className={classes.btn} id={props.id}>
            Ok
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default Word;
