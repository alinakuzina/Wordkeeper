import logo from "./logo.svg";
import classes from "./App.module.css";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";

import Layout from "./content/Navigation/Layout";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordsPage from "./pages/WordsPage";
import LoginPage from "./pages/Login";
import AuthContext from "./store/auth-context";

import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {isLoggedIn && (
            <Route path="/my-words">
              <WordsPage />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/autorisation">
              <LoginPage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </AnimatePresence>
    </Layout>
  );
};
export default App;

/*
function App() {
  const [words, setWords] = useState([]);
  const wordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uniqueWord, setUnoqueWord] = useState(true);

  const fetchWordsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/words.json"
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
      "https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/words.json"
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
        "https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/words.json",
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
    fetchWordsHandler();
  }, [fetchWordsHandler]);

  const deleteWord = async (id) => {
    const response = await fetch(
      `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/words/${id}/.json`,
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
      `https://words-4bd2d-default-rtdb.europe-west1.firebasedatabase.app/words/${id}/.json`,
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
    <React.Fragment>
      <MainNavigation />
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
    </React.Fragment>
  );
}

export default App;
*/
