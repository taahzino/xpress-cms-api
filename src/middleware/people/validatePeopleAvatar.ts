import { sendResponse, STATUS_BAD_REQUEST } from "../../utilities/response";
import { deleteAvatar, getAvatarUploader } from "../../utilities/uploader";

const validatePeopleAvatar = (req, res, next) => {
  getAvatarUploader().single("avatar")(req, res, (err) => {
    if (err) {
      global.logger(err);

      sendResponse(res, STATUS_BAD_REQUEST, { message: err.message });
      return;
    }

    if (req.file) {
      res.locals.uploads = {
        avatar: req.file.filename,
      };
    } else {
      res.locals.uploads = {};
    }

    res.locals.fallback = () => {
      deleteAvatar(res.locals.uploads.avatar);
    };

    next();
  });
};

export default validatePeopleAvatar;
