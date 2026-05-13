import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(),".env")
})

const config={
    connection_string: process.env.CONNECTION_SRING as string,
    port: process.env.PORT
}

export default config;