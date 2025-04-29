#!/usr/bin/env node
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
const fs = __importStar(require("fs"));
const process = __importStar(require("process"));
const rules_1 = __importDefault(require("./rules"));
// Define a transpiler rule
// CLI entrypoint
function main() {
    const [, , file] = process.argv;
    if (!file) {
        console.error('Usage: mks <script.mks>');
        process.exit(1);
    }
    // Read source
    let src;
    try {
        src = fs.readFileSync(file, 'utf-8');
    }
    catch (err) {
        console.error(`Cannot read file: ${file}`);
        process.exit(1);
    }
    const lines = src.split(/\r?\n/);
    const jsLines = [];
    let indent = '';
    // Transpile each line
    lines.forEach((raw, idx) => {
        const line = raw.trim();
        if (!line)
            return;
        let matched = false;
        for (const rule of rules_1.default) {
            const m = line.match(rule.regex);
            if (m) {
                const code = rule.transform(m);
                jsLines.push(indent + code);
                matched = true;
                // Manage indent for block start/end
                if (code.trim().endsWith('{')) {
                    indent += '  '; // increase indent
                }
                else if (code.trim() === '}') {
                    indent = indent.slice(0, -2); // decrease indent
                }
                break;
            }
        }
        if (!matched) {
            console.error(`Syntax error on line ${idx + 1}: \\"${line}\\"`);
            process.exit(1);
        }
    });
    // Close any remaining blocks
    while (indent.length > 0) {
        indent = indent.slice(0, -2);
        jsLines.push(indent + '}');
    }
    // Combine and execute
    const jsCode = jsLines.join('\n');
    try {
        new Function(jsCode)();
    }
    catch (err) {
        console.error('Runtime error:', err);
        process.exit(1);
    }
}
main();
