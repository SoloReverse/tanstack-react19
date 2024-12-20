import parsePhoneNumberFromString, {PhoneNumber} from "libphonenumber-js";
import {z} from "zod";

export const FormSchema = z.object({
  phonenumber: z.string().transform((num, ctx) => {
    if (typeof num === "string" && num.trim() !== "") {
      const bool = Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      if (!bool) {
        console.log(bool);
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please Enter Numbers only.",
        });
        return z.NEVER;
      } else {
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
      }
    }
  }),
});
