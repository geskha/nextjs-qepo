import z from "zod";

export const passwordSchema = z
  .string({ message: "Password wajib di isi" })
  .min(8, { message: "Minimal 8 karakter" })
  .regex(/[A-Z]/, { message: "Harus ada huruf besar" })
  .regex(/[a-z]/, { message: "Harus ada huruf kecil" })
  .regex(/[0-9]/, { message: "Harus ada angka" });
export const emailSchema = z
  .string({ message: "Email wajib di isi" })
  .email({ message: "Email tidak valid" });
