"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/logger.ts
var import_winston = require("winston");

// src/config.ts
var config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || "development" /* development */,
  LOGGER_HOST: process.env.LOGGER_HOST || "localhost",
  LOGGER_PORT: Number(process.env.LOGGER_PORT || 8e3),
  LOGGER_PATH: process.env.LOGGER_PATH || "/api/logs"
});
var config_default = config;

// src/helpers.ts
var isObject = (variable) => typeof variable === "object" && !Array.isArray(variable) && variable !== null;
var isNull = (variable) => typeof variable === "object" && variable === null;
var isUndefined = (variable) => typeof variable === "undefined";
var isArray = (variable) => Array.isArray(variable);
var isFunction = (variable) => typeof variable === "function";
var isNumber = (variable) => typeof variable === "number";
var stringify = (obj) => {
  if (isObject(obj)) {
    return Object.keys(obj).length ? JSON.stringify(obj) : "";
  }
  if (isArray(obj) || isNumber(obj)) {
    return JSON.stringify(obj);
  }
  if (isFunction(obj)) {
    return obj.toString();
  }
  if (isNull(obj) || isUndefined(obj)) {
    return "";
  }
  return obj;
};
var printFormatter = (info) => {
  let printMessage = `${info.timestamp} ${info.level}: ${stringify(info.message)}`;
  const metadata = stringify(info.metadata);
  if (metadata) {
    return `${printMessage}: ${metadata}`;
  }
  return printMessage;
};

// src/logger.ts
var logger = (0, import_winston.createLogger)({
  format: import_winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  transports: [
    new import_winston.transports.Console({
      level: config_default.NODE_ENV !== "production" /* production */ ? "debug" : "info",
      handleExceptions: true,
      format: import_winston.format.combine(
        import_winston.format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
        import_winston.format.colorize(),
        import_winston.format.printf(printFormatter)
      )
    }),
    new import_winston.transports.Http({
      level: "error",
      host: config_default.LOGGER_HOST,
      port: config_default.LOGGER_PORT,
      path: config_default.LOGGER_PATH,
      format: (0, import_winston.format)((_a) => {
        var _b = _a, { level } = _b, restInfo = __objRest(_b, ["level"]);
        return __spreadProps(__spreadValues({}, restInfo), { type: level.toUpperCase() });
      })()
    })
  ],
  exitOnError: false
});
var logger_default = logger;

// src/index.ts
var src_default = logger_default;
