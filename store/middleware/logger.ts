import { Dispatch, MiddlewareAPI } from "redux";

const logger =
  ({ destination }: { destination: string }) =>
  (store: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: any) => {
    if (destination === "console") {
      console.log(store.getState());
    }

    next(action);
  };

export default logger;
