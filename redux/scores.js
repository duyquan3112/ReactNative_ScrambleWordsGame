import * as ActionTypes from "./ActionTypes";

export const scoresrp = (state = { errMess: null, scoresrp: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SCORES:
      return { ...state, errMess: null, scoresrp: action.payload };
    case ActionTypes.ADD_SCORES_FAILED:
      return { ...state, errMess: action.payload };
    case ActionTypes.ADD_SCORE:
      var newscores = action.payload;
      newscores.id = state.scoresrp.length;
      return { ...state, scoresrp: state.scoresrp.concat(newscores) };
    default:
      return state;
  }
};
