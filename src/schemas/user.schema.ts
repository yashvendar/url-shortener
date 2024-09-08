import z from "zod";

const userSchema = z.object({
    email: z.string({ required_error: "Email is required field!" }).email(),
    password: z.string({ required_error: "Password is required field!" }).min(5, "Password string's length must be greater then 5"),
    name: z.string({ required_error: "Name is required field!" }).min(3, "Name string must contain atleast 3 characters."),
    username: z.optional(z.string().min(4, "Username must contain atleast 4 characters"))
}).strict();

export default userSchema;