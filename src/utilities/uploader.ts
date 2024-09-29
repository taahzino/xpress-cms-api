import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import _globals from "../config/_globals";

const _getStorage = (DIR = _globals.UPLOADS_DIR): multer.StorageEngine => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      cb(null, uuidV4() + fileExt);
    },
  });
};

const _getMulterUploader = (
  fileSize: number,
  mimetypes: Array<string>,
  store: multer.StorageEngine
) => {
  return multer({
    storage: store || _getStorage(),
    limits: {
      fileSize,
    },
    fileFilter: (req, file, cb) => {
      if (mimetypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        let strTypes = mimetypes.join(", ");
        cb(new Error(`Only ${strTypes} formats are allowed!`));
      }
    },
  });
};

export const getAvatarUploader = () => {
  return _getMulterUploader(
    _globals.ONE_MB * 5,
    ["image/png", "image/jpg", "image/jpeg"],
    _getStorage(_globals.AVATARS_DIR)
  );
};

export const deleteAvatar = (avatar: string) => {
  try {
    if (!avatar) return;

    const AVATAR = path.join(_globals.AVATARS_DIR, avatar);

    if (!fs.existsSync(AVATAR)) return;

    fs.unlinkSync(AVATAR);
  } catch (error) {
    console.error(error);
  }
};
