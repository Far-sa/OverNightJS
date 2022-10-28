import { BlogIdDTO, CreateBlogTDO } from './blog.dto'
import { IBlog } from './blog.types'
import { BlogModel } from '../models/blog.model'
import { validateSync } from 'class-validator'
import { errorHandler } from '../utils/ApiErrorHandler'
import { FineDoc } from '../types/public.types'

export class BlogService {
  async create (blogDTO: CreateBlogTDO): Promise<IBlog> {
    const errors = validateSync(blogDTO)
    const validationErr = errorHandler(errors)
    if (validationErr.length > 0)
      throw {
        status: 400,
        message: 'Validation Errors',
        errors: validationErr
      }
    const blog: IBlog = await BlogModel.create(blogDTO)
    return blog
  }
  async fetchAll (): Promise<IBlog[]> {
    const blogs: IBlog[] = await BlogModel.find({})
    return blogs
  }
  async fetchById (blogId: BlogIdDTO): Promise<FineDoc<IBlog>> {
    const blog: FineDoc<IBlog> = await BlogModel.findById(blogId.id)
    if (!blog) throw { status: 404, message: 'Blog not found' }
    return blog
  }
  async removeById (blogId: BlogIdDTO): Promise<string> {
    const blog: FineDoc<IBlog> = await this.fetchById(blogId)
    const deletedItem = await BlogModel.deleteOne({ _id: blogId.id })
    if (deletedItem.deletedCount > 0) throw 'Blog has been deleted'
    return 'Deleting Process was failed due to ..'
  }
}
