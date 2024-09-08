import z from "zod";

const urlSchema = z.object({
    urlPath: z.string({ required_error: "urlPath is required" }).url()
}).strict();

export default urlSchema;