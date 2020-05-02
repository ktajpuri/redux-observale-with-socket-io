import { createAction } from "redux-act";

// messages
export const messageReceived = createAction("message received")

// commands
export const sendMessage = createAction("send message")
export const connectSocket = createAction("connect socket")
