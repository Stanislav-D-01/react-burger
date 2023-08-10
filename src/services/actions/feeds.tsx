export const WS_CONNECTION_START_FEED: "WS_CONNECTION_START_FEED" =
  "WS_CONNECTION_START_FEED";
export const WS_CONNECTION_SUCCESS_FEED: "WS_CONNECTION_SUCCESS_FEED" =
  "WS_CONNECTION_SUCCESS_FEED";
export const WS_CONNECTION_ERROR_FEED: "WS_CONNECTION_ERROR_FEED" =
  "WS_CONNECTION_ERROR_FEED";
export const WS_CONNECTION_CLOSED_FEED = "WS_CONNECTION_CLOSED_FEED";
export const WS_GET_MESSAGE_FEED: "WS_GET_MESSAGE_FEED" = "WS_GET_MESSAGE_FEED";
export const WS_CLEAR_STATE_FEED: "WS_CLEAR_STATE_FEED" = "WS_CLEAR_STATE_FEED";
export const WS_CONNECTION_OPEN_FEED: "WS_CONNECTION_OPEN_FEED" =
  "WS_CONNECTION_OPEN_FEED";

export type TWSConnectionStartFeed = {
  readonly type: typeof WS_CONNECTION_START_FEED;
};
export type TWSConnectionSuccessFeed = {
  readonly type: typeof WS_CONNECTION_SUCCESS_FEED;
};
export type TWSConnectionErrorFeed = {
  readonly type: typeof WS_CONNECTION_ERROR_FEED;
  readonly error: string;
};
export type TWSConnectionClosedFeed = {
  readonly type: typeof WS_CONNECTION_CLOSED_FEED;
};
export type TWSGetMessageFeed = {
  readonly type: typeof WS_GET_MESSAGE_FEED;
  readonly data: { orders: any; total: number; totalToday: number };
};
export type TWSClearStateFeed = {
  readonly type: typeof WS_CLEAR_STATE_FEED;
};
export type TWSConnectionOpenFeed = {
  readonly type: typeof WS_CONNECTION_OPEN_FEED;
};

export type TFeedsActions =
  | TWSConnectionStartFeed
  | TWSConnectionSuccessFeed
  | TWSConnectionErrorFeed
  | TWSConnectionClosedFeed
  | TWSGetMessageFeed
  | TWSClearStateFeed
  | TWSConnectionOpenFeed;
