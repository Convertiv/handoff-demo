#!/usr/bin/env node
import axios from "axios";
import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { stringify } from "csv/sync";
import path from "path";
import importComponents from "./import/components";
import importFields from "./import/fields";

const init = async () => {
  const url = "http://localhost:3000/api/";
  const headers = {
    "Content-Type": "application/json",
  };
  const request = axios.create({
    baseURL: url,
    headers,
  });
  return request;
};

const exportComponents = async () => {
  const request = await init();
  const components = await request.get("components.json");
  const { data } = components;
  const componentsDir = path.join(__dirname, "../csv");
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir);
  }
  const componentPath = path.join(componentsDir, `components.csv`);
  const rows = [
    [
      "id",
      "title",
      "description",
      "type",
      "group",
      "tags",
      "should_do",
      "should_not_do",
      "figma",
      "version",
      "link",
    ],
  ];
  await Promise.all(
  data.map(async (summary) => {
    const getComponent = await request.get(`component/${summary.id}/latest.json`);
    const component = getComponent.data;
    let categories = "", tags = "";
    if (component.categories && Array.isArray(component.categories) && component.categories.length > 0) {
      categories = component.categories.join("|");
    } else if (component.categories && typeof component.categories === "string") {
      categories = component.categories
    }

    if (component.tags && Array.isArray(component.tags) && component.tags.length > 0) {
      tags = component.tags.join("|");
    } else if (component.tags && typeof component.tags === "string") {
      tags = component.tags;
    }
    if(component.should_do && Array.isArray(component.should_do)) {
      component.should_do = component.should_do.join("|");
    }
    if(component.should_not_do && Array.isArray(component.should_not_do)) {
      component.should_not_do = component.should_not_do.join("|");
    }
    console.log("Pushing Component", component.id);
    rows.push([
      component.id,
      component.title,
      component.description,
      component.type,
      component.group,
      tags,
      component.should_do || "",
      component.should_not_do || "",
      component.figma || "",
      component.version,
      "https://ssc.handoff.com/system/component/" + component.id,
    ]);
  })
  )
  fs.writeFileSync(componentPath, stringify(rows));
};

const exportFields = async () => {
  const request = await init();
  const fields = await request.get("components.json");
  const { data } = fields;
  const fieldsDir = path.join(__dirname, "../exports");
  if (!fs.existsSync(fieldsDir)) {
    fs.mkdirSync(fieldsDir);
  }
  const fieldsPath = path.join(fieldsDir, `fields.csv`);
  let rows = [
    [
      "id",
      "parent",
      "title",
      "description",
      "type",
      "default",
      "required",
      "min length",
      "max length",
      "min image width",
      "min image height",
      "max image width",
      "max image height",
    ],
  ];
  data.forEach(async (component) => {
    rows.push([
      component.id,
      'component',
      component.title,
      "https://stage-ssc.handoff.com/system/component/" + component.id,
    ]);
    rows = createRuleRows(component, rows);
    rows.push([]);
  });
  fs.writeFileSync(fieldsPath, stringify(rows));
};

const createRuleRows = (component, rows, parent = "") => {
  if (Object.keys(component.properties).length > 0) {
    Object.keys(component.properties).forEach((key) => {
      const property = component.properties[key];
      if (!property.rules)
        console.log(`Field ${key} in ${component.id} has no rules`);
      switch (property.type) {
        case "video_embed":
        case "video_file":
        case "number":
        case "boolean":
          rows.push([
            key,
            parent,
            property.name,
            property.description,
            property.type,
            property.default,
            property.rules?.required || "false",
          ]);
          break;
        case "text":
        case "richtext":
        case "button":
        case "link":
          if (!property.rules?.content)
            console.log(`Field ${key} in ${component.id} has no content rules`);
          if (!property.rules?.content?.min)
            console.log(`Field ${key} in ${component.id} has no min length`);
          if (!property.rules?.content?.max)
            console.log(`Field ${key} in ${component.id} has no max length`);
          rows.push([
            key,
            parent,
            property.name,
            property.description,
            property.type,
            property.default,
            property.rules?.required || "false",
            property.rules?.content?.min || "0",
            property.rules?.content?.max || "0",
          ]);
          break;
        case "image":
          if (!property.rules?.content)
            console.log(`Field ${key} in ${component.id} has no content rules`);
          if (!property.rules?.content?.min)
            console.log(`Field ${key} in ${component.id} has no min length`);
          if (!property.rules?.content?.max)
            console.log(`Field ${key} in ${component.id} has no max length`);
          if (!property.rules?.dimensions)
            console.log(
              `Field ${key} in ${component.id} has no dimensions rules`
            );
          if (!property.rules?.dimensions?.min)
            console.log(
              `Field ${key} in ${component.id} has no min dimensions`
            );
          if (!property.rules?.dimensions?.max)
            console.log(
              `Field ${key} in ${component.id} has no max dimensions`
            );

          rows.push([
            key,
            parent,
            property.name,
            property.description,
            property.type,
            property.default,
            property.rules?.required || "false",
            property.rules?.content?.min || "0",
            property.rules?.content?.max || "0",
            property.rules?.dimensions?.min?.width || "0",
            property.rules?.dimensions?.min?.height || "0",
            property.rules?.dimensions?.max?.width || "0",
            property.rules?.dimensions?.max?.height || "0",
          ]);
          break;

        case "array":
          if (!property.items)
            console.log(`Field ${key} in ${component.id} has no items`);
          if (!property.items?.type)
            console.log(
              `Field ${key} in ${component.id} has no items type or is not of type object`
            );
          if (!property.items?.properties)
            console.log(
              `Field ${key} in ${component.id} has no item properties defined`
            );
          if (
            property.items &&
            property.items.type === "object" &&
            property.items?.properties
          ) {
            rows.push([
              key,
              parent,
              property.name,
              property.description,
              property.type,
              property.default,
              property.rules?.required || "false",
              property.rules?.content?.min || "0",
              property.rules?.content?.max || "0",
            ]);
            rows = createRuleRows(property.items, rows, key);
          } else if (property.items && property.items.type === "text") {
            rows.push([
              key,
              property.name,
              property.description,
              property.type,
              property.default,
              property.rules?.required || "false",
              property.rules?.content?.min || "0",
              property.rules?.content?.max || "0",
            ]);
          } else {
            rows.push([`No fields are defined for ${key} array`]);
          }
          break;
        case "object":
          if (!property.properties)
            console.log(`Field ${key} in ${component.id} has no properties`);
          if (property.properties) {
            rows.push([
              key,
              property.name,
              property.description,
              property.type,
              property.default,
              property.rules?.required || "false",
            ]);
            rows = createRuleRows(property, rows, key);
          } else {
            rows.push([`No fields are defined for ${key} object`]);
          }
          break;
        default:
          rows.push([
            `Field ${key} in ${component.id} has an unknown type: ${property.type}`,
          ]);
      }
    });
  } else {
    rows.push(["No fields are defined for this content type"]);
  }
  return rows;
};

/**
 * Handle command line arguments
 */
const main = async () => {
  const argv = yargs(hideBin(process.argv))
    .command({
      command: "export:components",
      describe: "Fetch the components and export them to a csv file",
      handler: async (parsed) => {
        console.log("Exporting Components");
        await exportComponents();
      },
    })
    .command({
      command: "import:components",
      describe: "Update JSON file with components from CSV",
      handler: async (parsed) => {
        console.log("Importing Components");
        await importComponents();
      },
    })
    .command({
      command: "export:fields",
      describe: "Fetch the components and export all the fields as csv",
      handler: async (parsed) => {
        console.log("Exporting Fields");
        await exportFields();
      },
    })
    .command({
      command: "import:fields",
      describe: "Update JSON file with fields from CSV",
      handler: async (parsed) => {
        console.log("Importing Fields");
        await importFields();
      },
    })
    .help()
    .parse();
};

main();
