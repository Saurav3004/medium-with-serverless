import z from 'zod'

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export const createBlogInput = z.object({
    title: z.string().max(20),
    content:z.string().max(200)
})


export const updateBlogInput = z.object({
    title: z.string().max(20),
    content:z.string().max(200),
    id:z.number()
})


export const deleteBlogInput = z.object({
    id:z.number()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type DeleteBlogInput = z.infer<typeof deleteBlogInput>