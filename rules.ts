interface Rule {
  regex: RegExp;
  transform: (match: RegExpMatchArray) => string;
}
const rules : Rule[] = [
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
      regex: /^ammari$/,
      transform: () => `break;`
    },
    {
      // return statement
      regex: /^pannurusuki$/,
      transform: () => `continue;`
    },
    {
      // return statement with flexible content (e.g., returning a function)
      regex: /^pammotereki\s+fungsi\((.*?)\),\s*maka$/,
      transform: ([, args]) => `return function(${args}) {`
    },
    {
      // return statement with flexible content
      regex: /^pammotereki\s+(.+)$/,
      transform: ([, expr]) => `return ${expr};`
    },
    {
      // for loop: for i = 0 to 10, maka
      regex: /^untuk\s+([a-zA-Z_]\w*)\s*=\s*(.+?)\s+sampai\s+(.+?),\s*maka$/,
      transform: ([, variable, start, end]) => `for (let ${variable} = ${start}; ${variable} <= ${end}; ${variable}++) {`
    },
   
    {
      // for each loop: for each item in array, maka
      regex: /^untuk\s+setiap\s+([a-zA-Z_]\w*)\s+dalam\s+([a-zA-Z_]\w*),\s*maka$/,
      transform: ([, item, array]) => `for (const ${item} of ${array}) {`
    },
  ];


  export default rules