import { EMPTY, fromEvent, merge } from "rxjs"
import {
  map, switchMap, startWith, tap,
  ignoreElements, pluck,
  finalize, mapTo
} from "rxjs/operators"
import { combineEpics, ofType } from "redux-observable"
import {
  messageReceived,
  sendMessage,
  connectSocket
} from "../actions"

const socketConnectEpic = (action$, state$, { io, sock$, defaultServer }) =>
  action$.pipe(
    ofType(connectSocket.getType()),
    pluck("payload"),
    map(dest => io(dest)),
    switchMap(sock => 
      merge(
        fromEvent(sock, "connect").pipe(mapTo(sock)),
        fromEvent(sock, "disconnect").pipe(mapTo(null))
      ).pipe(
        startWith(null),
        finalize(() => sock.close()))
    ),
    tap(sock$),
    ignoreElements(),
    startWith(connectSocket(defaultServer)))

const socketReceiveEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY : 
      merge(
        fromEvent(sock, "message").pipe(
          map(msg => messageReceived(msg)))
      )
    ))

const socketMessageEpic = (action$, state$, { sock$ }) =>
  sock$.pipe(
    switchMap(sock => sock == null ? EMPTY :
      action$.pipe(
        ofType(sendMessage.getType()),
        pluck("payload"),
        tap(msg => sock.emit("message", msg)),
        ignoreElements())))

export default combineEpics(
  socketConnectEpic,
  socketReceiveEpic,
  socketMessageEpic)
