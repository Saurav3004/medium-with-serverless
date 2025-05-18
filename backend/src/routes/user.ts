import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput,signupInput } from "@devfreak/medium-common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        SECRET_KEY:string
    }
}>()

userRouter.post('/signup',async (c) => {
  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      msg:"Inputs are not correct"
    })
  }

  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL
}).$extends(withAccelerate())
  
 try {
   const user = await prisma.user.create({
     data:{
       name: body.name,
       email:body.email,
       password:body.password
     }
   })
   const jwt = await sign({
    id:user.id
   },c.env.SECRET_KEY)


   return c.json({
    msg: "User registered successfully",
    token: jwt
   })
 } catch (e) {
  c.status(411)
  return c.json({
    msg: "User already exist with this email"
  })
 }

  
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const {success} = signinInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      msg:"Inputs are not correct"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
    try {
      const user = await prisma.user.findFirst({
        where:{
          email: body.email,
          password: body.password
        }
      })

      if(!user){
        c.status(403)
        return c.json({
          msg:"Invalid Credentials"
        })
      }
      const jwt = await sign({
        id:user.id
      },c.env.SECRET_KEY)

      c.status(200)
      return c.json({
        msg:"Login successfully",
        token:jwt
      })
    } catch (error) {
      return c.text("Unable to sign in")
    }
})
