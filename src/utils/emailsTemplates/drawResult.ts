import * as fs from "fs"
import Handlebars from "handlebars"
import * as path from "path"

const drawResultTemplate = (receiverName: string, giverName: string) => {
  // Load the HTML template

  const templatePath = path.resolve("src/utils/emailsTemplates/drawResult.html")
  const templateSource = fs.readFileSync(templatePath, "utf8")
  var template = Handlebars.compile(templateSource)

  return template({
    receiverName,
    giverName,
    CORS_ORIGIN: process.env.CORS_ORIGIN
  })
}

export default drawResultTemplate
