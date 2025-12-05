"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("csv/sync");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const importFields = () => {
    // Import components from CSV
    const rootPath = path_1.default.resolve(__dirname, "../../..");
    const csvPath = path_1.default.join(rootPath, "exporter", "csv", "fields.csv");
    // read to string
    const csvString = fs.readFileSync(csvPath, "utf8");
    // parse to array
    const fields = (0, sync_1.parse)(csvString, {
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
            componentPath = path_1.default.join(rootPath, "handoff", "integration", "components", component_id, "1.0.0", `${component_id}.json`);
            const componentData = fs.readFileSync(componentPath, "utf8");
            componentJson = JSON.parse(componentData);
        }
        else if (field["Parent"]) {
            console.log("setting property rules for", field["id"], field["Parent"]);
            // ok locate the properties json
            if (componentJson.properties[field["Parent"]]) {
                if (componentJson.properties[field["Parent"]]["type"] === "array") {
                    property =
                        componentJson.properties[field["Parent"]]["items"]["properties"][field["id"]];
                    property = setPropertyRules(property, field);
                    if (property)
                        componentJson.properties[field["Parent"]]["items"]["properties"][field["id"]] = property;
                }
                if (componentJson.properties[field["Parent"]]["type"] === "object") {
                    property =
                        componentJson.properties[field["Parent"]]["properties"][field["id"]];
                    property = setPropertyRules(property, field);
                    if (property)
                        componentJson.properties[field["Parent"]]["properties"][field["id"]] = property;
                }
            }
        }
        else {
            // ok locate the properties json
            console.log("setting property rules for", field["id"]);
            if (componentJson.properties[field["id"]]) {
                property = componentJson.properties[field["id"]];
                property = setPropertyRules(property, field);
                if (!property) {
                    console.log(`could not locate or set property rules for field ${field["id"]}`);
                }
                else {
                    console.log("setting property rules for", field["id"]);
                    componentJson.properties[field["id"]] = property;
                }
            }
        }
    });
    return fields;
};
const setPropertyRules = (property, field) => {
    if (!field.id || !property)
        return null;
    let required = true;
    if (field.required.toLowerCase() === "false")
        required = false;
    if (!property.rules)
        property.rules = {};
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
exports.default = importFields;
