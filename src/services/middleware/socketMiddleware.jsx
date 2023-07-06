export const socketMiddleware = (wsAction) => {
  return (store) => {
    let socket;
    const { dispatch } = store;

    return (next) => {
      return (action) => {
        switch (action.type) {
          case wsAction.start: {
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
              dispatch({ type: wsAction.onError });
            };
            socket.onclose = () => {
              dispatch({ type: wsAction.closed });
            };
            break;
          }
          case wsAction.closed: {
            socket && socket.close();
            dispatch({ type: wsAction.closed });
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
