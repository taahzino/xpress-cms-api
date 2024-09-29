import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "JWT_SECRET_KEY";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.people.findUnique({
        where: { id: jwt_payload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    } finally {
      await prisma.$disconnect();
    }
  })
);

export const peopleAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred", error: err });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    } else {
      res.locals.user = { ...user };
      delete res.locals.user.password;
    }

    next();
  })(req, res, next);
};
