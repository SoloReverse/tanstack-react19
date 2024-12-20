import parsePhoneNumberFromString, {PhoneNumber} from "libphonenumber-js";
import {z} from "zod";

export const FormSchema = z.object({
  firstname: z
    .string()
    .min(3, {
      message: "Name must atleast contain 3 characters",
    })
    .max(30, {message: "Name can't be greater than 30 characters"}),
  lastname: z
    .string()
    .min(3, {
      message: "Name must atleast contain 3 characters",
    })
    .max(30, {message: "Name can't be greater than 30 characters"}),
  email: z.string().email("Enter a valid email"),
  phonenumber: z.string().transform((num, ctx) => {
    const number = parsePhoneNumberFromString(num, "AE") as PhoneNumber;
    if (number.isValid()) {
      return number.format("E.164");
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid UAE number.",
      });
      return z.NEVER;
    }
  }),
  merchantname: z.string(),
  merchantphone: z
    .string()
    .refine(
      num => {
        const number = parsePhoneNumberFromString(num, "AE");
        return number?.isValid();
      },
      {message: "Enter a valid UAE number"}
    )
    .optional(),
  licensenumber: z.string().optional(),
  licensestate: z.string().optional(),
  licenseDocument: z.string().url().optional(),
  merchantBank: z
    .object({
      bank: z.string(),
      account: z.string(),
      iban: z.string(),
      swift: z.string(),
    })
    .optional(),
});
