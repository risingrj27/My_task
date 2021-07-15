import {
  MOVIE_GET_SUCCESS,
} from "../actions/types.js";

const initialState = {
  movies: [],
  isLoading: true,
  total_pages: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MOVIE_GET_SUCCESS:
      return {
        ...state,
        movies: action.payload["results"],
        total_pages: action.payload["total_pages"],
        isLoading: false,
      };
    default:
      return state;
  }
}