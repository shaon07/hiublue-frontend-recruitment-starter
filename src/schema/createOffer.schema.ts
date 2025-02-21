import { z } from "zod";

export const offerSchema = z.object({
  user_id: z.object({
    value: z.string().min(1, "User is required"),
    label: z.string().min(1),
  }),
  plan_type: z.enum(["monthly", "yearly", "pay_as_you_go"]),
  expired: z.string().min(1, "Expiration date is required"),
  price: z.number().min(0, "Price must be a positive number"),
  additions: z.array(z.enum(["refundable", "on_demand", "negotiable"])),
});

export type OfferFormData = z.infer<typeof offerSchema>;
