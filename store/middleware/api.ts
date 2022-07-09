import { Middleware } from "redux";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";

const api: Middleware = (store) => (next) => async (action) => {
  return next(action);
};

export default api;
