import { Server } from '@overnightjs/core'
import express from 'express'
import http from 'http'
import cors from 'cors' // npm i --save-dev @types/cors

import { ApiErrorHandler, NotFoundErrorHandler } from './utils/ApiErrorHandler'
import { BlogController } from './blog/blog.controller'
import './utils/mongoDBConfig'
import { AuthController } from './auth/auth.controller'

export class ServerSetup extends Server {
  private server?: http.Server
  constructor (public port: number = 5600) {
    super()
  }
  public init (): void {
    this.expressSetup()
    this.controllersSetup()
    this.errorHandlerSetup()
  }
  private expressSetup (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: '*' }))
  }
  public errorHandlerSetup (): void {
    this.app.use(NotFoundErrorHandler)
    this.app.use(ApiErrorHandler)
  }
  private controllersSetup () {
    const controllers = [new BlogController(), new AuthController()]

    super.addControllers(controllers)
  }
  public start (): void {
    this.server = http.createServer(this.app)
    this.server.listen(this.port, () => {
      console.log(`Server is running on Port:http://localhost:${this.port}`)
    })
  }
}
