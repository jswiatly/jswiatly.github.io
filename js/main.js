const LINE_SPEED = 20; 
const VISION_SCAN_DURATION = 3000;

const INITIAL_MESSAGE = [
  "Initializing Connection...",
  "Connection established.",
  "Welcome to Holiano.dev - Vision in Depth.",
  "Type 'help' for available commands.",
];

const visionFrames = [
  `
 _ _ [SCANNING SURFACE]
| | |..................
|_|_|..................
  `,
  `
 _ _ [SCANNING LEVEL 1]
| | | ___..|.. __ ..--'
|_|_|'   '--'  ..
  / \\
  `,
  `
 _ _ [VISUALIZATION COMPLETE]
| | || | |___| ||____
| | || | |___| ||____
 _ _ 
| | || | |___| ||____
| | || | |___| ||____
J. Światły - Deep Schematic
[ARCHITECT SYSTEM DESIGN]
...Vision Enabled...
  `,
];

const commands = {
  help:
    "<b>whoami</b>  - About me<br>" +
    "<b>vision</b>  - Toggle Deep Vision Protocol<br>" +
    "<b>skills</b>  - Technical stack<br>" +
    "<b>contact</b> - Get in touch<br>" +
    "<b>echo</b>    - Print text to terminal<br>" +
    "<b>clear</b>   - Reset terminal",
  whoami:
    "> Name: J. Światły <br>" +
    "> Role: Deep Tech Architect <br>" +
    "> Status: Diving into code...",
  skills:
    "Available Modules:<br>" +
    " [A] C, C++, C#<br>" +
    " [B] Embedded Systems & Low-level Dev<br>" +
    " [C] Systems Architecture",
  contact:
    'Mail:   <a href="mailto:dev@holiano.dev">dev@holiano.dev</a><br>' +
    'GitHub: <a href="https://github.com/jswiatly" target="_blank">@jswiatly</a>',
};

const DOM = {
  inputField: document.getElementById("cmd-input"),
  historyDiv: document.getElementById("history"),
  terminal: document.getElementById("terminal"),
  dynamicStyles: document.getElementById("dynamic-styles"),
};

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function appendLineAnimated(content, className = "output") {
  const lines = typeof content === "string" ? content.split("<br>") : Array.from(content);
  let lineIndex = 0;

  function printNextLine() {
    if (lineIndex < lines.length) {
      const lineHtml = lines[lineIndex];
      const outputDiv = document.createElement("div");
      outputDiv.className = className;
      outputDiv.innerHTML = lineHtml;
      DOM.historyDiv.appendChild(outputDiv);
      DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
      lineIndex++;
      setTimeout(printNextLine, LINE_SPEED);
    }
  }
  printNextLine();
}

function appendPrompt(safeCmd) {
  const line = document.createElement("div");
  line.className = "terminal-line";
  line.innerHTML = `<span class="prompt">[user@holiano-dev ~]$</span><span class="command">${safeCmd}</span>`;
  DOM.historyDiv.appendChild(line);
  DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
}

function executeDeepVision() {
  appendLineAnimated("Initializing Deep Vision Protocol...", "output");
  DOM.terminal.classList.add("deep-scan");

  const asciiContainer = document.createElement("div");
  asciiContainer.className = "ascii-art";
  DOM.historyDiv.appendChild(asciiContainer);

  let frameIndex = 0;
  const animationInterval = setInterval(() => {
    if (frameIndex < visionFrames.length) {
      asciiContainer.textContent = visionFrames[frameIndex];
      DOM.terminal.scrollTop = DOM.terminal.scrollHeight;
      frameIndex++;
    } else {
      clearInterval(animationInterval);
      appendLineAnimated("Vision protocol finalized.", "output");
    }
  }, 700);
}

function processCommand(rawCmd) {
  const cmdLine = rawCmd.trim();
  const cmd = cmdLine.toLowerCase();
  const args = cmdLine.split(" ").slice(1);
  if (!cmd) return;

  const safeCmdLine = escapeHTML(cmdLine);
  appendPrompt(safeCmdLine);

  if (cmd === "clear") {
    DOM.terminal.classList.remove("deep-scan");
    DOM.historyDiv.innerHTML = "";
    appendLineAnimated(INITIAL_MESSAGE);
  } else if (commands[cmd]) {
    appendLineAnimated(commands[cmd]);
  } else if (cmd === "vision") {
    executeDeepVision();
  } else if (cmd === "echo") {
    appendLineAnimated(args.length > 0 ? escapeHTML(args.join(" ")) : "Usage: echo [text]");
  } else {
    appendLineAnimated(`UNKNOWN COMMAND: ${escapeHTML(cmd)}. Type 'help' for assistance.`);
  }
}

DOM.terminal.addEventListener("click", () => DOM.inputField.focus());

DOM.inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    processCommand(DOM.inputField.value);
    DOM.inputField.value = "";
  }
});

// Start
appendLineAnimated(INITIAL_MESSAGE);
