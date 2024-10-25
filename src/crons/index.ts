import _globals from "../config/_globals";
import { deleteExpiredEmailVerifications } from "./auth";

const enableCrons = async () => {
  const TEN_MIN = async () => {
    await deleteExpiredEmailVerifications();
    setTimeout(TEN_MIN, 10 * _globals().ONE_MIN);
  };

  TEN_MIN();
};

export default enableCrons;
