import { z } from "zod";

const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Minimal 5 karakter" })
    .max(16, { message: "Maksimal 16 karakter" }),
  bio: z.string(),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
