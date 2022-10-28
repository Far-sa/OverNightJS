import { Controller, Delete, Get, Post } from '@overnightjs/core'
import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { BlogIdDTO, CreateBlogTDO } from './blog.dto'
import { BlogService } from './blog.service'
import { IBlog } from './blog.types'
import { FineDoc } from '../types/public.types'

@Controller('blogs')
export class BlogController {
  private blogService: BlogService = new BlogService()
  @Post()
  async CreateBlog (req: Request, res: Response, next: NextFunction) {
    try {
      const blogDTO: CreateBlogTDO = plainToClass(CreateBlogTDO, req.body)
      const blog: IBlog = await this.blogService.create(blogDTO)
      return res.status(201).json({
        statusCode: 201,
        data: {
          blog,
          message: 'Blog has been created successfully'
        }
      })
    } catch (error) {
      next(error)
    }
  }

  @Get()
  async GetAllBlogs (req: Request, res: Response, next: NextFunction) {
    try {
      const blogs: IBlog[] = await this.blogService.fetchAll()
      return res.status(200).json({
        statusCode: 200,
        data: {
          blogs
        }
      })
    } catch (error) {
      next(error)
    }
  }

  @Get('find/:id')
  async GetBlogById (req: Request, res: Response, next: NextFunction) {
    try {
      const blogDTO: BlogIdDTO = plainToClass(BlogIdDTO, req.params)
      const blog: FineDoc<IBlog> = await this.blogService.fetchById(blogDTO)
      return res.status(200).json({
        statusCode: 200,
        data: {
          blog
        }
      })
    } catch (error) {
      next(error)
    }
  }

  @Delete('delete/:id')
  async RemoveBlogById (req: Request, res: Response, next: NextFunction) {
    try {
      const blogDTO: BlogIdDTO = plainToClass(BlogIdDTO, req.params)
      const message: string = await this.blogService.removeById(blogDTO)
      return res.status(200).json({
        statusCode: 200,
        data: {
          message
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
