import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, deleteBlogInput, updateBlogInput } from "@devfreak/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        SECRET_KEY:string
    },
    Variables:{
        userId:string
    }
}>()

blogRouter.use('/*',async (c,next) => {
    try {
        const header = c.req.header('Authorization') || "";
        const user = await verify(header,c.env.SECRET_KEY)
        if(user){
            
            c.set("userId", user.id as unknown as string)
            await next()
        }else{
            c.status(411)
            return c.json({
                msg: "You are not logged in"
            })
        }
    } catch (error) {
        return c.json({
            msg:"You are not authorized"
        })
    }
    
})


// to create the blog post
 blogRouter.post('/create',async (c) => {
    const body = await c.req.json()
    const authorId = c.get('userId')
    const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        msg: "Incorrect inputs"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.blog.create({
      data:{
          title: body.title,
          content:body.content,
          authorId: Number(authorId)
      }
    })
    return c.json({
      msg: "Blog created successfully",
      blog
    })
  } catch (error) {
    return c.json({
        msg: "Please try again later"
    })
  }
 })


 // to update the blogs
 blogRouter.put('/update', async (c) => {
  const body = await c.req.json()
   const {success} = updateBlogInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        msg: "Incorrect inputs"
      })
    }
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const updatedBlog = await prisma.blog.update({
      where:{
          id: body.id
      },
      data:{
          title: body.title,
          content:body.content,
      }
    })
    return c.json({
      msg:"Blog updated successfully",
      blog:updatedBlog
    })
  } catch (error) {
    return c.json({
        msg:"Please try again later"
    })
  }
 })

 // to get all blogs 
 blogRouter.get('/bulk',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
      select:{
        title:true,
        content:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json(blogs)
 })
// to delete an blog
 blogRouter.delete('/delete',async (c) => {
    try {
        const body = await c.req.json()
         const {success} = deleteBlogInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        msg: "Incorrect inputs"
      })
    }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
       const blog = await prisma.blog.delete({
            where:{
                id:body.id
            }
        })
        return c.json({
            msg:"Blog deleted successfully"
        })
    } catch (error) {
        return c.json({
            msg:"Blog already deleted"
        })
    }
 })


// to get specific blog
 blogRouter.get('/:id',async (c) => {
  const id =  parseInt(c.req.param('id'))
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())
    try {
        const blog = await prisma.blog.findUnique({
            where:{
                id
            }
        })
    
        return c.json(blog)
    } catch (error) {
        return c.json({
            msg:"there is no such post"
        })
    }
 })