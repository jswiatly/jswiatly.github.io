const INITIAL_MESSAGE =
  "Initializing Connection... Connection established. Welcome to Holiano.dev - Vision in Depth. Type 'help' for available commands.";

const commands = {
  help: "<br> - <b>whoami</b> <br> - <b>skills</b> <br> - <b>contact</b> <br> - <b>clear</b>",
  whoami:
    "> Name: J. Światły <br>> Role: Deep Tech Architect <br>> Status: Diving in code...",
  skills:
    "Available Modules: [A] C, C++, C# [B] Systems Design [C] Embedded Systems & Low-level Development",
  contact:
    'Mail :<a href="mailto:dev@holiano.dev">dev@holiano.dev</a> <br> GitHub: <a href="https://github.com/jswiatly" target="_blank">@jswiatly</a>',
};

const DOM = {
  inputField: document.getElementById("cmd-input"),
  historyDiv: document.getElementById("history"),
  terminal: document.getElementById("terminal"),
};

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
