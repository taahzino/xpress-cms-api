import loginPeople from "./loginPeople";
import performPasswordReset from "./performPasswordReset";
import requestPasswordReset from "./requestPasswordReset";
import verifyPasswordReset from "./verifyPasswordReset";

export default {
  login: loginPeople,
  reset: {
    request: requestPasswordReset,
    verify: verifyPasswordReset,
    perform: performPasswordReset,
  },
};
