import { Server } from '@overnightjs/core'
import express from 'express'
import http from 'http'
import cors from 'cors' // npm i --save-dev @types/cors

import { ApiErrorHandler, NotFoundErrorHandler } from './utils/ApiErrorHandler'

export class ServerSetup extends Server {
  private server?: http.Server
  constructor (public port: number = 5600) {
    super()
  }
  public init (): void {
    this.expressSetup()
    this.errorHandlerSetup()
    this.start()
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
  public start (): void {
    this.server = http.createServer(this.app)
    this.server.listen(this.port, () => {
      console.log(`Server is running on Port:http://localhost:${this.port}`)
    })
  }
}
