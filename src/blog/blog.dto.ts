import { IsDefined, IsObject } from 'class-validator'
import { Expose } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class CreateBlogTDO {
  @IsDefined()
  @Expose()
  title: string
  @IsDefined()
  @Expose()
  text: string
  @IsDefined()
  @Expose()
  author: string
}
export class BlogIdDTO {
  @IsObject()
  id: ObjectId
}
