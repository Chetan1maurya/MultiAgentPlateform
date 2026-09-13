import fs from "fs"
import path from "path"

const uploadDir = path.resolve("./temp")

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive: true})
}

