import classes from "../App.module.css";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import Add from "../content/WordPage/Add";
import Words from "../content/WordPage/Words";
import AuthContext from "../store/auth-context";
import { motion } from "framer-motion";

const WordsPage = () => {
  const [words, setWords] = useState([]);
  const wordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uniqueWord, setUnoqueWord] = useState(true);
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const leaveLetters = (recieveWord) => {
    let newWord = "";
    let word = recieveWord.split("");
    console.log(word);

    for (let i = 0; i < word.length; i++) {
      if (word[i] === "." || word[i] === "@") {
        newWord += "-";
      } else {
        newWord += word[i];
      }
    }
    console.log(newWord);
    return newWord;
  };

  const currentEmail = leaveLetters(authCtx.email);

  const fetchWordsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log(currentEmail);
    try {
      const response = await fetch(
        `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/${currentEmail}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedWords = [];

      for (const key in data) {
        loadedWords.push({
          id: key,
          word: data[key].word,
        });
      }

      setWords(loadedWords);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const addWordToBase = async function (word) {
    const checkIfWordIsUnique = await fetch(
      `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/${currentEmail}.json`
    );

    const data = await checkIfWordIsUnique.json();

    let unique = true;

    for (let key in data) {
      if (data[key].word.toLowerCase() === word.word.toLowerCase()) {
        unique = false;
      }
    }

    if (unique === true) {
      const response = await fetch(
        `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/${currentEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(word),
          headers: {
            "Context-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      fetchWordsHandler();
      setUnoqueWord(true);
    }

    if (unique === false) {
      setUnoqueWord(false);
    }
  };

  const submitHandler = function (event) {
    event.preventDefault();
    if (wordRef.current.value.length > 0) {
      const word = {
        word: wordRef.current.value,
      };

      addWordToBase(word);
      wordRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWordsHandler();
    }
  }, [fetchWordsHandler, isLoggedIn]);

  const deleteWord = async (id) => {
    const response = await fetch(
      `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/${currentEmail}/${id}/.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      console.log(response.error);
    }
    fetchWordsHandler();
  };

  const changeWord = async function (newWord, id) {
    const response = await fetch(
      `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/${currentEmail}/${id}/.json`,
      {
        method: "PUT",
        body: JSON.stringify({ word: `${newWord}` }),
        headers: {
          "Context-Type": "application/json",
        },
      }
    );

    fetchWordsHandler();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Add submitHandler={submitHandler} wordRef={wordRef} />
      {!uniqueWord && (
        <div className={classes.error}>Already have this word</div>
      )}
      <Words
        deleteWord={deleteWord}
        fetchWordsHandler={fetchWordsHandler}
        words={words}
        changeWord={changeWord}
      />
    </motion.div>
  );
};

export default WordsPage;
