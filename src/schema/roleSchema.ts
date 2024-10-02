import { z } from "zod";
import _constants from "../config/_constants";

const validCapabilities: string[] = _constants.capabilities.map((x) => x.name);

export const roleSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  capabilities: z
    .array(
      z
        .string({
          required_error: "Capabilities are required",
          invalid_type_error: "Capabilities must be an array of strings",
        })
        .refine((value) => validCapabilities.includes(value) === true, {
          message: "Invalid capability",
        })
    )
    .min(1, "At least one capability is required")
    .default([]),
});
