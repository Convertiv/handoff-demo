#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const sync_1 = require("csv/sync");
const path_1 = __importDefault(require("path"));
const components_1 = __importDefault(require("./import/components"));
const fields_1 = __importDefault(require("./import/fields"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "http://localhost:3000/api/";
    const headers = {
        "Content-Type": "application/json",
    };
    const request = axios_1.default.create({
        baseURL: url,
        headers,
    });
    return request;
});
const exportComponents = () => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield init();
    const components = yield request.get("components.json");
    const { data } = components;
    const componentsDir = path_1.default.join(__dirname, "../csv");
    if (!fs_1.default.existsSync(componentsDir)) {
        fs_1.default.mkdirSync(componentsDir);
    }
    const componentPath = path_1.default.join(componentsDir, `components.csv`);
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
    yield Promise.all(data.map((summary) => __awaiter(void 0, void 0, void 0, function* () {
        const getComponent = yield request.get(`component/${summary.id}/latest.json`);
        const component = getComponent.data;
        let categories = "", tags = "";
        if (component.categories && Array.isArray(component.categories) && component.categories.length > 0) {
            categories = component.categories.join("|");
        }
        else if (component.categories && typeof component.categories === "string") {
            categories = component.categories;
        }
        if (component.tags && Array.isArray(component.tags) && component.tags.length > 0) {
            tags = component.tags.join("|");
        }
        else if (component.tags && typeof component.tags === "string") {
            tags = component.tags;
        }
        if (component.should_do && Array.isArray(component.should_do)) {
            component.should_do = component.should_do.join("|");
        }
        if (component.should_not_do && Array.isArray(component.should_not_do)) {
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
    })));
    fs_1.default.writeFileSync(componentPath, (0, sync_1.stringify)(rows));
});
const exportFields = () => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield init();
    const fields = yield request.get("components.json");
    const { data } = fields;
    const fieldsDir = path_1.default.join(__dirname, "../exports");
    if (!fs_1.default.existsSync(fieldsDir)) {
        fs_1.default.mkdirSync(fieldsDir);
    }
    const fieldsPath = path_1.default.join(fieldsDir, `fields.csv`);
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
    data.forEach((component) => __awaiter(void 0, void 0, void 0, function* () {
        rows.push([
            component.id,
            'component',
            component.title,
            "https://stage-ssc.handoff.com/system/component/" + component.id,
        ]);
        rows = createRuleRows(component, rows);
        rows.push([]);
    }));
    fs_1.default.writeFileSync(fieldsPath, (0, sync_1.stringify)(rows));
});
const createRuleRows = (component, rows, parent = "") => {
    if (Object.keys(component.properties).length > 0) {
        Object.keys(component.properties).forEach((key) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
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
                        ((_a = property.rules) === null || _a === void 0 ? void 0 : _a.required) || "false",
                    ]);
                    break;
                case "text":
                case "richtext":
                case "button":
                case "link":
                    if (!((_b = property.rules) === null || _b === void 0 ? void 0 : _b.content))
                        console.log(`Field ${key} in ${component.id} has no content rules`);
                    if (!((_d = (_c = property.rules) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.min))
                        console.log(`Field ${key} in ${component.id} has no min length`);
                    if (!((_f = (_e = property.rules) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.max))
                        console.log(`Field ${key} in ${component.id} has no max length`);
                    rows.push([
                        key,
                        parent,
                        property.name,
                        property.description,
                        property.type,
                        property.default,
                        ((_g = property.rules) === null || _g === void 0 ? void 0 : _g.required) || "false",
                        ((_j = (_h = property.rules) === null || _h === void 0 ? void 0 : _h.content) === null || _j === void 0 ? void 0 : _j.min) || "0",
                        ((_l = (_k = property.rules) === null || _k === void 0 ? void 0 : _k.content) === null || _l === void 0 ? void 0 : _l.max) || "0",
                    ]);
                    break;
                case "image":
                    if (!((_m = property.rules) === null || _m === void 0 ? void 0 : _m.content))
                        console.log(`Field ${key} in ${component.id} has no content rules`);
                    if (!((_p = (_o = property.rules) === null || _o === void 0 ? void 0 : _o.content) === null || _p === void 0 ? void 0 : _p.min))
                        console.log(`Field ${key} in ${component.id} has no min length`);
                    if (!((_r = (_q = property.rules) === null || _q === void 0 ? void 0 : _q.content) === null || _r === void 0 ? void 0 : _r.max))
                        console.log(`Field ${key} in ${component.id} has no max length`);
                    if (!((_s = property.rules) === null || _s === void 0 ? void 0 : _s.dimensions))
                        console.log(`Field ${key} in ${component.id} has no dimensions rules`);
                    if (!((_u = (_t = property.rules) === null || _t === void 0 ? void 0 : _t.dimensions) === null || _u === void 0 ? void 0 : _u.min))
                        console.log(`Field ${key} in ${component.id} has no min dimensions`);
                    if (!((_w = (_v = property.rules) === null || _v === void 0 ? void 0 : _v.dimensions) === null || _w === void 0 ? void 0 : _w.max))
                        console.log(`Field ${key} in ${component.id} has no max dimensions`);
                    rows.push([
                        key,
                        parent,
                        property.name,
                        property.description,
                        property.type,
                        property.default,
                        ((_x = property.rules) === null || _x === void 0 ? void 0 : _x.required) || "false",
                        ((_z = (_y = property.rules) === null || _y === void 0 ? void 0 : _y.content) === null || _z === void 0 ? void 0 : _z.min) || "0",
                        ((_1 = (_0 = property.rules) === null || _0 === void 0 ? void 0 : _0.content) === null || _1 === void 0 ? void 0 : _1.max) || "0",
                        ((_4 = (_3 = (_2 = property.rules) === null || _2 === void 0 ? void 0 : _2.dimensions) === null || _3 === void 0 ? void 0 : _3.min) === null || _4 === void 0 ? void 0 : _4.width) || "0",
                        ((_7 = (_6 = (_5 = property.rules) === null || _5 === void 0 ? void 0 : _5.dimensions) === null || _6 === void 0 ? void 0 : _6.min) === null || _7 === void 0 ? void 0 : _7.height) || "0",
                        ((_10 = (_9 = (_8 = property.rules) === null || _8 === void 0 ? void 0 : _8.dimensions) === null || _9 === void 0 ? void 0 : _9.max) === null || _10 === void 0 ? void 0 : _10.width) || "0",
                        ((_13 = (_12 = (_11 = property.rules) === null || _11 === void 0 ? void 0 : _11.dimensions) === null || _12 === void 0 ? void 0 : _12.max) === null || _13 === void 0 ? void 0 : _13.height) || "0",
                    ]);
                    break;
                case "array":
                    if (!property.items)
                        console.log(`Field ${key} in ${component.id} has no items`);
                    if (!((_14 = property.items) === null || _14 === void 0 ? void 0 : _14.type))
                        console.log(`Field ${key} in ${component.id} has no items type or is not of type object`);
                    if (!((_15 = property.items) === null || _15 === void 0 ? void 0 : _15.properties))
                        console.log(`Field ${key} in ${component.id} has no item properties defined`);
                    if (property.items &&
                        property.items.type === "object" &&
                        ((_16 = property.items) === null || _16 === void 0 ? void 0 : _16.properties)) {
                        rows.push([
                            key,
                            parent,
                            property.name,
                            property.description,
                            property.type,
                            property.default,
                            ((_17 = property.rules) === null || _17 === void 0 ? void 0 : _17.required) || "false",
                            ((_19 = (_18 = property.rules) === null || _18 === void 0 ? void 0 : _18.content) === null || _19 === void 0 ? void 0 : _19.min) || "0",
                            ((_21 = (_20 = property.rules) === null || _20 === void 0 ? void 0 : _20.content) === null || _21 === void 0 ? void 0 : _21.max) || "0",
                        ]);
                        rows = createRuleRows(property.items, rows, key);
                    }
                    else if (property.items && property.items.type === "text") {
                        rows.push([
                            key,
                            property.name,
                            property.description,
                            property.type,
                            property.default,
                            ((_22 = property.rules) === null || _22 === void 0 ? void 0 : _22.required) || "false",
                            ((_24 = (_23 = property.rules) === null || _23 === void 0 ? void 0 : _23.content) === null || _24 === void 0 ? void 0 : _24.min) || "0",
                            ((_26 = (_25 = property.rules) === null || _25 === void 0 ? void 0 : _25.content) === null || _26 === void 0 ? void 0 : _26.max) || "0",
                        ]);
                    }
                    else {
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
                            ((_27 = property.rules) === null || _27 === void 0 ? void 0 : _27.required) || "false",
                        ]);
                        rows = createRuleRows(property, rows, key);
                    }
                    else {
                        rows.push([`No fields are defined for ${key} object`]);
                    }
                    break;
                default:
                    rows.push([
                        `Field ${key} in ${component.id} has an unknown type: ${property.type}`,
                    ]);
            }
        });
    }
    else {
        rows.push(["No fields are defined for this content type"]);
    }
    return rows;
};
/**
 * Handle command line arguments
 */
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .command({
        command: "export:components",
        describe: "Fetch the components and export them to a csv file",
        handler: (parsed) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Exporting Components");
            yield exportComponents();
        }),
    })
        .command({
        command: "import:components",
        describe: "Update JSON file with components from CSV",
        handler: (parsed) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Importing Components");
            yield (0, components_1.default)();
        }),
    })
        .command({
        command: "export:fields",
        describe: "Fetch the components and export all the fields as csv",
        handler: (parsed) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Exporting Fields");
            yield exportFields();
        }),
    })
        .command({
        command: "import:fields",
        describe: "Update JSON file with fields from CSV",
        handler: (parsed) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Importing Fields");
            yield (0, fields_1.default)();
        }),
    })
        .help()
        .parse();
});
main();
