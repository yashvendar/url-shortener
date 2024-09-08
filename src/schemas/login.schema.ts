import z from "zod";

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required!" }).email(),
    password: z.string().min(5, "Password string's length must be greater then 5"),
}).strict();

export default loginSchema;