import * as ActionTypes from "./ActionTypes";

export const words = (
  state = { isLoading: true, errMess: null, words: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_WORDS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        words: action.payload,
      };
    case ActionTypes.WORDS_LOADING:
      return { ...state, isLoading: true, errMess: null, words: [] };
    case ActionTypes.WORDS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
