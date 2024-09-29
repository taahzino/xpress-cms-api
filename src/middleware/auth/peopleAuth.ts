import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Capabilities } from "../../config/_constants";

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
        include: {
          role: true,
        },
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

export const peopleAuth = (capabilities: Capabilities[] = []) => {
  let allowedCapabilities: Capabilities[] = [];

  if (capabilities.length > 0) {
    allowedCapabilities = ["manage-everything", ...capabilities];
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred", error: err });
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized access" });
      } else {
        res.locals.user = { ...user };
        delete res.locals.user.password;
      }

      if (allowedCapabilities.length > 0) {
        let userCapabilities = res.locals.user.role.capabilities;

        let canAccess = allowedCapabilities.some((capability) =>
          userCapabilities.includes(capability)
        );

        if (!canAccess) {
          return res
            .status(403)
            .json({ message: "You do not have access to this resource" });
        }
      }

      next();
    })(req, res, next);
  };
};
