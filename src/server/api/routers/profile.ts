import z from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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

  upadteProfil: privateProcedure
    .input(
      z.object({
        username: z.string().min(5).max(16).toLowerCase().optional(),
        bio: z.string().max(150).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;
      const { username, bio } = input;

      if (username) {
        const usernameExist = await db.profile.findUnique({
          where: {
            username,
          },
          select: {
            userId: true,
          },
        });

        if (usernameExist) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "USERNAME_USED",
          });
        }
      }

      const updatedUser = await db.profile.update({
        where: {
          userId: user!.id,
        },
        data: {
          username,
          bio,
        },
      });

      return updatedUser;
    }),
});
