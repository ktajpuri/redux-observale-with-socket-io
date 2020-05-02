import { createReducer } from "redux-act"
import { combineReducers } from "redux"

import {
  messageReceived
} from "./actions"

const messages = createReducer({
  [messageReceived]: (state, payload) => [ ...state, { payload, type: "message" } ].slice(0,20)
}, [])

export default combineReducers({
  messages
})
