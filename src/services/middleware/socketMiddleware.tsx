import { RootState } from "../..";
import { TFeedsActions } from "../actions/feeds";
import { TUserOrderActions } from "../actions/userOrder";

import { Middleware } from "redux";

export type TMiddleware = {
  start: "WS_CONNECTION_START_FEED" | "WS_USER_ORDER_CONNECTION_START";
  onOpen: "WS_CONNECTION_OPEN_FEED" | "WS_USER_ORDER_CONNECTION_OPEN";
  closed: "WS_CONNECTION_CLOSED_FEED" | "WS_USER_ORDER_CONNECTION_CLOSED";
  onMessage: "WS_GET_MESSAGE_FEED" | "WS_USER_ORDER_GET_MESSAGE";
  onError: "WS_CONNECTION_ERROR_FEED" | "WS_USER_ORDER_ERROR";
};
export const socketMiddleware: any = (
  wsAction: TMiddleware
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { dispatch } = store;

    return (next) => {
      return (action: TFeedsActions | TUserOrderActions) => {
        if (action.type === wsAction.start) {
          if (!socket) {
            socket = new WebSocket(action.url);

            socket.onopen = (event: Event) => {
              dispatch({ type: wsAction.onOpen });
            };
            socket.onmessage = (event: MessageEvent) => {
              const data = JSON.parse(event.data);
              dispatch({
                type: wsAction.onMessage,
                data: data,
              });
            };
            socket.onerror = () => {
              dispatch({ type: wsAction.onError });
            };
          }
        }

        if (action.type === wsAction.closed) {
          if (socket) {
            socket.close();

            socket = null;
          }
        }

        next(action);
      };
    };
  };
};
