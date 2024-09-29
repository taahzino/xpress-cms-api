import { z } from "zod";

export const peopleSchema = z.object({
  firstname: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1, "First name is required"),
  lastname: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(1, "First name is required"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
  roleId: z.coerce.number({
    required_error: "Role is required",
    invalid_type_error: "Role must be an integer",
  }),
  status: z.coerce.boolean({
    required_error: "Status is required",
    invalid_type_error: "Status must be a boolean",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters"),
});
