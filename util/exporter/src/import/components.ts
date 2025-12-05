import { parse } from "csv/sync";
import path from "path";
import * as fs from "fs";
const importComponents = () => {
  // Import components from CSV
  const rootPath = path.resolve(__dirname, "../../..");
  const csvPath = path.join(rootPath, "exporter", "csv", "components.csv");
  // read to string
  const csvString = fs.readFileSync(csvPath, "utf8");
  // parse to array
  const components: any[] = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });
  // go find the component json by id
  components.forEach((component) => {
    const componentPath = path.join(
      rootPath,
      "handoff",
      "integration",
      "components",
      component.id,
      "1.0.0",
      `${component.id}.json`
    );
    const componentData = fs.readFileSync(componentPath, "utf8");
    const componentJson = JSON.parse(componentData);
    delete componentJson.should_do;
    delete componentJson.should_not_do;
    delete componentJson.tags;
    delete componentJson.group;
    delete componentJson.type;
    delete componentJson.title;
    delete componentJson.description;

    delete component.link;
    component.title = component["proposed title"] ? component["proposed title"] : component.title;
    delete component["proposed title"];
    
    delete component["version"];
    component.should_do = component.should_do
      .split("-")
      .filter(Boolean)
      .map((item) => item.trim());
    component.should_not_do = component.should_not_do
      .split("-")
      .filter(Boolean)
      .map((item) => item.trim());
    component.tags = component.tags.split("|").filter(Boolean).map((item) => item.trim());
    
    // if the proposed new id field is not empty, rename the file
    if (component["proposed id"] && component["proposed id"] !== "" && component.id !== component["proposed id"]) {
      const existingPath = path.join(
        rootPath,
        "handoff",
        "integration",
        "components",
         component.id
      );
      const newPath = path.join(
        rootPath,
        "handoff",
        "integration",
        "components",
        component["proposed id"]
      );

      renameFiles(existingPath, newPath, component.id, component["proposed id"]);
      // write the component json
      delete component["id"];
      component.id = component["proposed id"];
      let newId = component["proposed id"];
      delete component["proposed id"];
      Object.assign(component, componentJson);
      console.log(`Renamed ${component.id} to ${newId}`);
      fs.writeFileSync(path.join(newPath, '1.0.0', `${newId}.json`), JSON.stringify(component, null, 2));
    }else{
      // write the component json
    delete component["id"];
    delete component["proposed id"];
    Object.assign(component, componentJson);
      fs.writeFileSync(componentPath, JSON.stringify(component, null, 2));
    }
    
  });
  return components;
};

const renameFiles = (oldPath: string, newPath: string, id: string, newName:string) => {
  if(fs.existsSync(newPath)) {
    // recursively remove the directory
    fs.rmSync(newPath, { recursive: true, force: true });
  }
  fs.renameSync(oldPath, newPath);
  const directory = path.join(newPath, "1.0.0");
  renameFile(directory, `${id}.hbs`, `${newName}.hbs`);
  renameFile(directory, `${id}.scss`, `${newName}.scss`);
  renameFile(directory, `${id}.css`, `${newName}.css`);
  renameFile(directory, `${id}.json`, `${newName}.json`);
  renameFile(directory, `${id}.js`, `${newName}.js`);
  fs.rmSync(oldPath, { recursive: true, force: true });

}

const renameFile = (targetPath: string, file: string, newName: string) => {
  const source =  path.join(targetPath,file);
  if(!fs.existsSync(source)) return;
  fs.renameSync(source, path.join(targetPath, newName));
}


export default importComponents;
