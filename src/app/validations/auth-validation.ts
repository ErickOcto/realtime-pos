import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const loginSchema = z.object({
  email: z
    .string().email('Please enter a valid email').min(5, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters."),
});

export type LoginForm = z.infer<typeof loginSchema>;