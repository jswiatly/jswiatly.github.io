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

function appendToHistory(htmlContent) {
  DOM.historyDiv.insertAdjacentHTML("beforeend", htmlContent);
  DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
}

function processCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  if (!cmd) return;

  const safeCmd = escapeHTML(rawCmd);
  appendToHistory(
    `<div><span class="prompt">[user@holiano-dev ~]$</span> <span class="command">${safeCmd}</span></div>`,
  );

  if (cmd === "clear") {
    DOM.historyDiv.innerHTML = `<div class="output">${INITIAL_MESSAGE}</div>`;
  } else if (commands[cmd]) {
    appendToHistory(`<div class="output">${commands[cmd]}</div>`);
  } else {
    appendToHistory(
      `<div class="output">UNKNOWN: ${safeCmd}. Type help.</div>`,
    );
  }
}

DOM.terminal.addEventListener("click", () => {
  DOM.inputField.focus();
});

DOM.inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    processCommand(DOM.inputField.value);
    DOM.inputField.value = "";
  }
});
