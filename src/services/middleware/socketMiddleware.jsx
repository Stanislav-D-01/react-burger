export const socketMiddleware = (wsAction) => {
  return (store) => {
    let socket;
    const { dispatch } = store;

    return (next) => {
      return (action) => {
        switch (action.type) {
          case wsAction.start: {
            if (!socket) {
              socket = new WebSocket(action.url);

              socket.onopen = (event) => {
                dispatch({ type: wsAction.onOpen });
              };
              socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                dispatch({
                  type: wsAction.onMessage,
                  data: data,
                });
              };
              socket.onerror = () => {
                console.log("socket");
                dispatch({ type: wsAction.onError });
              };

              break;
            }
          }
          case wsAction.closed: {
            socket.close();

            socket = "";

            break;
          }

          default: {
          }
        }
        next(action);
      };
    };
  };
};
