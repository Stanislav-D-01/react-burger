import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../actions/feeds";

export const socketMiddleware = () => {
  return (store) => {
    let socket;
    const { dispatch } = store;
    return (next) => {
      return (action) => {
        switch (action.type) {
          case WS_CONNECTION_START: {
            socket = new WebSocket(action.url);
          }
          case WS_CONNECTION_CLOSED: {
            socket.close();
          }
          default: {
          }
        }
        next(action);
      };
    };
  };
};
