import React, { useState, useCallback, useEffect } from "react";
import classes from "./Words.module.css";
import Word from "./Word";

const Words = (props) => {
  const [openEdit, setOpenEdit] = useState(false);

  const openFormHandler = (e) => {
    e.preventDefault();
    setOpenEdit(!openEdit);
  };

  let newArr = [...props.words].reverse();

  return (
    <div className={classes.box}>
      {newArr.map((word) => (
        <Word
          deleteWord={props.deleteWord}
          key={word.id}
          id={word.id}
          word={word.word}
          updatedHandler={props.updatedHandler}
          openFormHandler={openFormHandler}
          openEdit={openEdit}
          changeWord={props.changeWord}
        />
      ))}
    </div>
  );
};

export default Words;
