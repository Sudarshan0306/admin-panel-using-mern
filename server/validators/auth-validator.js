const { z } = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid email entered" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email should not be more than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be at least of 7 characters" })
        .max(15, { message: "Password should not exceed 10 characters" })

})
// Creating a validation schema
const signUpSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is Required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters" })
        .max(255, { message: "Name should not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone is Required" })
        // .trim()
        .min(10, { message: "Phone must be of 10 characters only" })
        .max(10, { message: "Phone should not exceed 10 characters" }),

});


module.exports = { signUpSchema, loginSchema };