import z from "zod";

export const sortOptions = {
  alphabeticalAsc: "alphabeticalAsc",
  alphabeticalDesc: "alphabeticalDesc",
} as const;
// show that if error, url correctly redirect to catch
export const searchSchema = z.object({
  page: z.number().default(1).catch(1),
  filter: z.string().default("").catch(""),
  sort: z.enum(sortOptions).default("alphabeticalAsc").catch("alphabeticalAsc"),
});

export type SearchParams = z.infer<typeof searchSchema>;
