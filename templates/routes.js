const { getFileContent, getIndexOnFile, getUpdateFile } = require("wild-js-crud/utils/files");

const getTemplate = (table, validator, middleWareFolder) => {
  const middle = validator !== "none" ? ` ${table}Validation,` : ""
  return `
const ${table}Controllers = require("./controllers/${table}Controllers");
${validator !== "none" ? `// const ${table}Validation = require("./${middleWareFolder}/${table}Validation");\n` : ""}
router.get("/${table}s", ${table}Controllers.browse);
router.get("/${table}s/:id", ${table}Controllers.read);
// router.post("/${table}s",${middle} ${table}Controllers.add);
// router.put("/${table}s/:id",${middle} ${table}Controllers.edit);
// router.delete("/${table}s/:id", ${table}Controllers.destroy);

`;
}

const manageRoutes = async (table, validator, middleWareFolder) => {
  const router = await getFileContent("./src/router.js");
  const index = getIndexOnFile("const router = express.Router();", router) + 33;

  return getUpdateFile(index, getTemplate(table, validator, middleWareFolder), router);
};

module.exports = manageRoutes;