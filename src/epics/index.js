import { combineEpics } from "redux-observable"
import socketEpics from "./socket"

export default combineEpics(
  socketEpics)
