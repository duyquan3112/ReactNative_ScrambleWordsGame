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

//post scores
export const postScore = (user, scores) => (dispatch) => {
  var newScore = {user: user, scores: scores, date: new Date().toISOString()};
  fetch('https://wordsdata.duyquan3112.repl.co/scoresrp/',{
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(newScore)
  }).then((response) => {
    if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
  }).then((score) => dispatch(addScore(score))).catch((error) => dispatch(addScoresFailed(error.message)))
}

const addScore = (scores) => ({
  type: ActionTypes.ADD_SCORE,
  payload: scores
})

//get scores
export const getScores = () => (dispatch) => {
  return fetch('https://wordsdata.duyquan3112.repl.co/scoresrp/').then((response)=>{
    if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
  }).then((scores)=>dispatch(addScores(scores))).catch((error)=>dispatch(addScoresFailed(error.message)));
}
const addScores = (scores) => ({
  type: ActionTypes.ADD_SCORES,
  payload: scores
});

export const addScoresFailed = (errmess) => ({
  type: ActionTypes.ADD_SCORES_FAILED,
  payload: errmess
})
