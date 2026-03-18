import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string().email('Please enter a valid email').min(5, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must be at most 50 characters."),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;

export const createUserSchemaForm = z.object({
  email: z
    .string().email('Please enter a valid email').min(5, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters."),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must be at most 30 characters."),
  role: z
    .string()
    .min(3, "Role must be at least 3 characters.")
    .max(30, "Role must be at most 30 characters."),
  // avatar_urL: z.union([z.string().min(1, 'Avatar URL is required'), z.instanceof(File)])
});

export type CreateUserForm = z.infer<typeof createUserSchemaForm>;