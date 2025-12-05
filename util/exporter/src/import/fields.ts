import { parse } from "csv/sync";
import path from "path";
import * as fs from "fs";
const importFields = () => {
  // Import components from CSV
  const rootPath = path.resolve(__dirname, "../../..");
  const csvPath = path.join(rootPath, "exporter", "csv", "fields.csv");
  // read to string
  const csvString = fs.readFileSync(csvPath, "utf8");
  // parse to array
  const fields = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });
  let component_id, property, componentJson, componentPath;
  fields.forEach((field) => {
    // ok is this a field or a component?
    if (field["Parent"] === "component") {
      if (componentJson) {
        console.log(componentPath);
        fs.writeFileSync(componentPath, JSON.stringify(componentJson, null, 2));
      }
      component_id = field["id"];
      componentPath = path.join(
        rootPath,
        "handoff",
        "integration",
        "components",
        component_id,
        "1.0.0",
        `${component_id}.json`
      );
      const componentData = fs.readFileSync(componentPath, "utf8");
      componentJson = JSON.parse(componentData);
    } else if (field["Parent"]) {
      console.log("setting property rules for", field["id"], field["Parent"]);
      // ok locate the properties json
      if (componentJson.properties[field["Parent"]]) {
        if (componentJson.properties[field["Parent"]]["type"] === "array") {
          property =
            componentJson.properties[field["Parent"]]["items"]["properties"][
              field["id"]
            ];
          property = setPropertyRules(property, field);
          if (property)
            componentJson.properties[field["Parent"]]["items"]["properties"][
              field["id"]
            ] = property;
        }
        if (componentJson.properties[field["Parent"]]["type"] === "object") {
          property =
            componentJson.properties[field["Parent"]]["properties"][
              field["id"]
            ];
          property = setPropertyRules(property, field);
          if (property)
            componentJson.properties[field["Parent"]]["properties"][
              field["id"]
            ] = property;
        }
      }
    } else {
      // ok locate the properties json
      console.log("setting property rules for", field["id"]);
      if (componentJson.properties[field["id"]]) {
        property = componentJson.properties[field["id"]];

        property = setPropertyRules(property, field);
        if (!property) {
          console.log(
            `could not locate or set property rules for field ${field["id"]}`
          );
        } else {
          console.log("setting property rules for", field["id"]);
          componentJson.properties[field["id"]] = property;
        }
      }
    }
  });

  return fields;
};

const setPropertyRules = (property, field) => {
  if (!field.id || !property) return null;
  let required = true;
  if (field.required.toLowerCase() === "false") required = false;
  if (!property.rules) property.rules = {};

  switch (property.type) {
    case "text":
      property.default = field["default"];
      property.rules.required = Boolean(required);
      property.rules.content = { min: 0, max: 0 };
      property.rules.content.min = Number(field["min length"]);
      property.rules.content.max = Number(field["max length"]);
      break;
    case "image":
      property.rules.required = Boolean(required);
      property.rules.dimensions = {
        min: { width: 0, height: 0 },
        max: { width: 0, height: 0 },
      };
      property.rules.dimensions.min.width = Number(field["min image width"]);
      property.rules.dimensions.min.height = Number(field["min image height"]);
      property.rules.dimensions.max.width = Number(field["max image width"]);
      property.rules.dimensions.max.height = Number(field["max image height"]);
      break;
    case "array":
      delete property.default;
      property.rules.required = Boolean(required);
      property.rules.content = { min: 0, max: 0 };
      property.rules.content.min = Number(field["min length"]);
      property.rules.content.max = Number(field["max length"]);
      break;
    case "object":
      delete property.default;
      property.rules.required = Boolean(required);
      break;
  }
  return property;
};

export default importFields;
