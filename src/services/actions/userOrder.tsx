export const WS_USER_ORDER_GET_MESSAGE: "WS_USER_ORDER_GET_MESSAGE" =
  "WS_USER_ORDER_GET_MESSAGE";
export const WS_USER_ORDER_CONNECTION_START: "WS_USER_ORDER_CONNECTION_START" =
  "WS_USER_ORDER_CONNECTION_START";
export const WS_USER_ORDER_CONNECTION_OPEN: "WS_USER_ORDER_CONNECTION_OPEN" =
  "WS_USER_ORDER_CONNECTION_OPEN";
export const WS_USER_ORDER_CONNECTION_CLOSED: "WS_USER_ORDER_CONNECTION_CLOSED" =
  "WS_USER_ORDER_CONNECTION_CLOSED";
export const WS_USER_ORDER_ERROR: "WS_USER_ORDER_ERROR" = "WS_USER_ORDER_ERROR";

export type TWSUserOrderGetMessage = {
  readonly type: typeof WS_USER_ORDER_GET_MESSAGE;
  data: { orders: any };
};
export type TWSUserOrderConnectionStart = {
  readonly type: typeof WS_USER_ORDER_CONNECTION_START;
  readonly url: string;
};
export type TWSUserOrderConnectionOpen = {
  readonly type: typeof WS_USER_ORDER_CONNECTION_OPEN;
};
export type TWSUserOrderConnectionClosed = {
  readonly type: typeof WS_USER_ORDER_CONNECTION_CLOSED;
};
export type TWSUserOrderError = {
  readonly type: typeof WS_USER_ORDER_ERROR;
};

export type TUserOrderActions =
  | TWSUserOrderGetMessage
  | TWSUserOrderConnectionStart
  | TWSUserOrderConnectionOpen
  | TWSUserOrderConnectionClosed
  | TWSUserOrderError;
