import { ServerSetup } from './bootstrap'
import dotenv from 'dotenv'

dotenv.config()
const Port = Number(process.env.PORT)

const server = new ServerSetup(Port)
server.init()
server.start()
