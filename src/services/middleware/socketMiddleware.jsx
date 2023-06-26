import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/feeds";

export const socketMiddleware = () => {
  return (store) => {
    let socket;
    const { dispatch } = store;
    return (next) => {
      return (action) => {
        switch (action.type) {
          case WS_CONNECTION_START: {
            console.log(action.url);
            socket = new WebSocket(action.url);
            socket.onopen = (event) => {
              dispatch({ type: WS_CONNECTION_SUCCESS });
            };
            socket.onmessage = (event) => {
              const data = JSON.parse(event.data);
              dispatch({
                type: WS_GET_MESSAGE,
                data: data.orders,
                total: data.total,
                totalTd: data.totalToday,
              });
            };
            break;
          }

          case WS_CONNECTION_CLOSED: {
            console.log("close");
            socket && socket.close();
          }

          default: {
          }
        }
        next(action);
      };
    };
  };
};
