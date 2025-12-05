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
const importComponents = () => {
    // Import components from CSV
    const rootPath = path_1.default.resolve(__dirname, "../../..");
    const csvPath = path_1.default.join(rootPath, "exporter", "csv", "components.csv");
    // read to string
    const csvString = fs.readFileSync(csvPath, "utf8");
    // parse to array
    const components = (0, sync_1.parse)(csvString, {
        columns: true,
        skip_empty_lines: true,
    });
    // go find the component json by id
    components.forEach((component) => {
        const componentPath = path_1.default.join(rootPath, "handoff", "integration", "components", component.id, "1.0.0", `${component.id}.json`);
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
            const existingPath = path_1.default.join(rootPath, "handoff", "integration", "components", component.id);
            const newPath = path_1.default.join(rootPath, "handoff", "integration", "components", component["proposed id"]);
            renameFiles(existingPath, newPath, component.id, component["proposed id"]);
            // write the component json
            delete component["id"];
            component.id = component["proposed id"];
            let newId = component["proposed id"];
            delete component["proposed id"];
            Object.assign(component, componentJson);
            console.log(`Renamed ${component.id} to ${newId}`);
            fs.writeFileSync(path_1.default.join(newPath, '1.0.0', `${newId}.json`), JSON.stringify(component, null, 2));
        }
        else {
            // write the component json
            delete component["id"];
            delete component["proposed id"];
            Object.assign(component, componentJson);
            fs.writeFileSync(componentPath, JSON.stringify(component, null, 2));
        }
    });
    return components;
};
const renameFiles = (oldPath, newPath, id, newName) => {
    if (fs.existsSync(newPath)) {
        // recursively remove the directory
        fs.rmSync(newPath, { recursive: true, force: true });
    }
    fs.renameSync(oldPath, newPath);
    const directory = path_1.default.join(newPath, "1.0.0");
    renameFile(directory, `${id}.hbs`, `${newName}.hbs`);
    renameFile(directory, `${id}.scss`, `${newName}.scss`);
    renameFile(directory, `${id}.css`, `${newName}.css`);
    renameFile(directory, `${id}.json`, `${newName}.json`);
    renameFile(directory, `${id}.js`, `${newName}.js`);
    fs.rmSync(oldPath, { recursive: true, force: true });
};
const renameFile = (targetPath, file, newName) => {
    const source = path_1.default.join(targetPath, file);
    if (!fs.existsSync(source))
        return;
    fs.renameSync(source, path_1.default.join(targetPath, newName));
};
exports.default = importComponents;
