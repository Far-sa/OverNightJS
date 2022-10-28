import { ServerSetup } from './bootstrap'
import dotenv from 'dotenv'

// dotenv.config()
// const Port = process.env.PORT ? Number(process.env.PORT) : undefined
const Port = 5600

const server = new ServerSetup(Port)
server.init()
server.start()
