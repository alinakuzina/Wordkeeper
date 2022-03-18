import React, { useRef, useState } from "react";
import classes from "./Word.module.css";
import { motion } from "framer-motion";
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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      variants={variants}
      whileTap={{ scale: 0.9 }}
      animate={{ x: [-20, 0, 0], opacity: 1 }}
    >
      <React.Fragment>
        {!openChange && (
          <div className={classes.word} id={props.id}>
            <div>{props.word}</div>
            <button
              className={classes.svg}
              onClick={deleteHandler}
              id={props.id}
            >
              Delete
            </button>

            <button
              className={classes.svg}
              onClick={changeHandler}
              id={props.id}
            >
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
    </motion.div>
  );
};

export default Word;
