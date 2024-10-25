import path from "path";
import getAppIP from "./_ip";

const _globals = () => {
  const PUBLIC_DIR = path.join(__dirname, "../../public");
  const AVATARS_DIR = path.join(PUBLIC_DIR, "./avatars");
  const UPLOADS_DIR = path.join(PUBLIC_DIR, "./uploads");

  return {
    MODE: process.env.MODE,
    PORT: process.env.PORT,

    BASE_URL: (() => {
      if (process.env.MODE === "development") {
        return `http://${getAppIP()}:${process.env.PORT}`;
      } else {
        return process.env.BASE_URL;
      }
    })(),

    ONE_MIN: 1000 * 60,
    ONE_HOUR: global.ONE_MIN * 60,
    ONE_DAY: global.ONE_HOUR * 24,

    ONE_MB: 1000000,

    PUBLIC_DIR,
    AVATARS_DIR,
    UPLOADS_DIR,
    FOLDERS: [PUBLIC_DIR, AVATARS_DIR, UPLOADS_DIR],
  };
};

export default _globals;
