const readline = require("readline");
const Convert = require("ansi-to-html");
const child_process = require("child_process");

const convert = new Convert({ bg: "black", newline: true, escapeXML: true });

console.log(process.argv);
const argv = process.argv.slice(1);
if (argv.length < 1) {
  console.log("The program's entry point must be the first positional param.");
  process.exit(1);
}
const programPath = argv[0];
console.log("About to run program: " + programPath);

const p = child_process.spawn("node", [programPath, ...argv.slice(1)], {
  env: {
    ...process.env,
    FORCE_COLOR: 1,
  },
});

var rl = readline.createInterface({
  input: p.stdout,
  output: process.stdout,
  terminal: false,
});

console.log('<pre style="background:black; width: fit-content;">');
rl.on("line", (line) => {
  const str = convert.toHtml(line);
  console.log(str);
}).on("close", () => {
  console.log("</pre>");
  process.exit(0);
});
