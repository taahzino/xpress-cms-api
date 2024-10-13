import loginPeople from "./loginPeople";
import logoutPeople from "./logoutPeople";
import performPasswordReset from "./performPasswordReset";
import requestPasswordReset from "./requestPasswordReset";
import verifyPasswordReset from "./verifyPasswordReset";

export default {
  login: loginPeople,
  logout: logoutPeople,
  reset: {
    request: requestPasswordReset,
    verify: verifyPasswordReset,
    perform: performPasswordReset,
  },
};
