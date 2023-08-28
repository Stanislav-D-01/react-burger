import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers/index";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import thunk, { ThunkAction } from "redux-thunk";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import {
  WS_CONNECTION_CLOSED_FEED,
  WS_CONNECTION_START_FEED,
  WS_GET_MESSAGE_FEED,
  WS_CONNECTION_OPEN_FEED,
  WS_CONNECTION_ERROR_FEED,
} from "./services/actions/feeds";

import {
  WS_USER_ORDER_GET_MESSAGE,
  WS_USER_ORDER_CONNECTION_START,
  WS_USER_ORDER_CONNECTION_OPEN,
  WS_USER_ORDER_CONNECTION_CLOSED,
  WS_USER_ORDER_ERROR,
} from "./services/actions/userOrder";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware({
      start: WS_CONNECTION_START_FEED,
      onOpen: WS_CONNECTION_OPEN_FEED,
      closed: WS_CONNECTION_CLOSED_FEED,
      onMessage: WS_GET_MESSAGE_FEED,
      onError: WS_CONNECTION_ERROR_FEED,
    }),
    socketMiddleware({
      start: WS_USER_ORDER_CONNECTION_START,
      onOpen: WS_USER_ORDER_CONNECTION_OPEN,
      closed: WS_USER_ORDER_CONNECTION_CLOSED,
      onMessage: WS_USER_ORDER_GET_MESSAGE,
      onError: WS_USER_ORDER_ERROR,
    })
  )
);
const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;

const rootHtml = document.getElementById("root") as HTMLElement | null;

if (rootHtml != null) {
  const root = ReactDOM.createRoot(rootHtml);

  root.render(
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
}
reportWebVitals();
