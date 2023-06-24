import * as ActionTypes from "./ActionTypes";
import baseUrl from "../shared/baseUrl";
import * as words from "../data/words.json";

//words
export const getWords = () => (dispatch) => {
  dispatch(wordsLoading());
  return fetch('https://wordsdata.duyquan3112.repl.co/words/')
    .then((response) => {
      if (!response.ok)
        throw Error('Error' + response.status + ':' + response.statusText);
      else return response.json();
    })
    .then((words) => dispatch(addWords(words)))
    .catch((error) => dispatch(wordsFailed(error.message)));
};

const wordsLoading = () => ({
  type: ActionTypes.WORDS_LOADING,
});
const wordsFailed = (errmess) => ({
  type: ActionTypes.WORDS_FAILED,
  payload: errmess,
});
const addWords = (words) => ({
  type: ActionTypes.ADD_WORDS,
  payload: words,
});

