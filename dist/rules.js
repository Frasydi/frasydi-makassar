"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules = [
    {
        // if … then
        regex: /^ketika\s+(.+?)\s*(==|!=|>|<|>=|<=)\s*(.+?),\s*jari$/,
        transform: ([, a, operator, b]) => `if (${a} ${operator} ${b}) {`
    },
    {
        // else if … then
        regex: /^ketika\s+(.+?)\s*(==|!=|>|<|>=|<=)\s*(.+?),\s*maraenga,\s*jari$/,
        transform: ([, a, operator, b]) => `} else if (${a} ${operator} ${b}) {`
    },
    {
        // else
        regex: /^maraenga$/,
        transform: () => `} else {`
    },
    {
        // end an explicit block
        regex: /^tongko$/,
        transform: () => `}`
    },
    {
        // loop: while … do
        regex: /^sibakuk\s+(.+?)\s*pare$/,
        transform: ([, cond]) => `while (${cond}) {`
    },
    {
        // variable declaration: let x = …
        regex: /^passang\s+([a-zA-Z_]\w*)\s+singkammaji\s+(.+)$/,
        transform: ([, name, expr]) => `let ${name} = ${expr};`
    },
    {
        // print
        regex: /^akkanako\((.*)\)$/,
        transform: ([, expr]) => `console.log(${expr});`
    },
    {
        // function definition
        regex: /^fungsi\s+([a-zA-Z_]\w*)\((.*?)\),\s*maka$/,
        transform: ([, fn, args]) => `function ${fn}(${args}) {`
    },
    {
        // variable reassignment: a = 20
        regex: /^sambei\s+([a-zA-Z_]\w*(?:\[[^\]]+\])?)\s+singkammaji\s+(.+)$/,
        transform: ([, name, expr]) => `${name} = ${expr};`
    },
    {
        // function call: bubblesort("Fachri")
        regex: /^([a-zA-Z_]\w*)\((.*?)\)$/,
        transform: ([, fn, args]) => `${fn}(${args});`
    },
    {
        // return statement
        regex: /^pammotereki\s+(.+)$/,
        transform: ([, expr]) => `return ${expr};`
    }
];
exports.default = rules;
