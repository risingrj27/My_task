import axios from "axios";
import {
  MOVIE_GET_SUCCESS,
} from "./types";
import { movieAPI } from "../constants";

//Movie fetch
export const movieFetch = (page) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .get(`${movieAPI}&page=${page}`, null, config)
    .then((res) => {
      dispatch({
        type: MOVIE_GET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
