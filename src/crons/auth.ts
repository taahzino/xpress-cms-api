import { PrismaClient } from "@prisma/client";
import logger from "../config/_logger";

export const deleteExpiredEmailVerifications = async () => {
  const prisma = new PrismaClient();

  try {
    // delete all expired email verifications older than 15 minutes
    const deleteCount = await prisma.emailVerification.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - 15 * 60 * 1000),
        },
      },
    });

    logger.info(`Deleted ${deleteCount.count} expired email verifications`);
  } catch (error) {
    logger.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
