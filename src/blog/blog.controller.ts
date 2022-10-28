import { Controller, Delete, Get, Post } from '@overnightjs/core'
import { NextFunction, Request, Response } from 'express'

@Controller('blogs')
export class BlogController {
  @Post('')
  async createBlog (req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Create Blog')
    } catch (error) {
      next(error)
    }
  }
  @Get('')
  async getBlogs (req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Get Blogs')
    } catch (error) {
      next(error)
    }
  }
  @Get(':id')
  async getBlogById (req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Get single Blog')
    } catch (error) {
      next(error)
    }
  }
  @Delete(':id')
  async removeBlogById (req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Remove Blog')
    } catch (error) {
      next(error)
    }
  }
}
