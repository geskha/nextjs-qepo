import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const profile = await db.profile.findUnique({
      where: {
        userId: user?.id,
      },
      select: {
        username: true,
        profilePictureUrl: true,
        bio: true,
      },
    });

    return profile;
  }),
});
