import fs from "fs"
import Handlebars from "handlebars"
import path from "path"

const drawResultTemplate = (receiverName: string, giverName: string) => {
  // Load the HTML template

  const templatePath = path.join(__dirname, "drawResult.html")
  const templateSource = fs.readFileSync(templatePath, "utf8")
  var template = Handlebars.compile(templateSource)

  return template({
    RECEIVER_NAME: receiverName,
    GIVER_NAME: giverName,
    CORS_ORIGIN: process.env.CORS_ORIGIN
  })
}

export default drawResultTemplate
