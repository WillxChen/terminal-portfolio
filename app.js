import shiftCursor from "./cursor.js";
import { commands } from "./commands.js";

const terminal = document.querySelector("#terminal");
const cursor = document.querySelector(".cursor");
const commandLine = document.querySelector("#command-line");
const validCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
let historyIndex = null;

const startUp = () => {
  // Insert ASCII and miscellaneous
};

// Event Listeners
window.addEventListener("keydown", (e) => {
  if (validCharacters.includes(e.key)) {
    e.preventDefault();
    commandLine.focus();
    commandLine.value += e.key;
  }
});

window.addEventListener("keyup", (e) => {
  if (validCharacters.includes(e.key)) {
    shiftCursor(commandLine.value.length);
  }
});

cursor.addEventListener("mousedown", (e) => {
  e.preventDefault();
  commandLine.focus();
});

commandLine.addEventListener("keydown", (e) => {
  const position = e.target.selectionStart;

  if (e.key === "Enter") {
    shiftCursor(0);
    if (e.target.value.trim().length > 0)
      commands.history.push(e.target.value.trim());
    historyIndex = commands.history.length;
    const cmd = e.target.value.slice();
    e.target.value = "";
    output(cmd);
    window.scrollTo(0, document.body.scrollHeight);
  }
  if (e.key === "Tab") {
    e.preventDefault();
    e.target.focus();
    if (e.target.value.trim().length === 0) {
      return;
    }
  }
  if (e.key === "ArrowLeft" && position !== 0) {
    if (e.ctrlKey) return;
    return shiftCursor(position - 1);
  }
  if (e.key === "ArrowRight" && position !== e.target.value.length) {
    if (e.ctrlKey) return;
    return shiftCursor(position + 1);
  }
  if (e.key === "Backspace" && position !== 0) {
    return shiftCursor(position - 1);
  }
  if (validCharacters.includes(e.key)) {
    if (e.ctrlKey) return;
    shiftCursor(e.target.selectionStart + 1);
  }
});

commandLine.addEventListener("mouseup", (e) => {
  const position = e.target.selectionStart;
  shiftCursor(position);
});

commandLine.addEventListener("keyup", (e) => {
  const position = e.target.selectionStart;
  if (e.key === "Enter") {
    e.target.value = "";
    window.scrollTo(0, document.body.scrollHeight);
    shiftCursor(e.target.value.length);
  }
  if (e.key === "Tab") {
    const matches = tabCompletion(e.target.value);
    if (matches.length > 0) e.target.value = matches[0];
    shiftCursor(e.target.value.length);
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    return shiftCursor(position);
  }
  if (e.key === "ArrowUp") {
    if (commands.history.length === 0 || historyIndex === 0) return;
    if (historyIndex === null) {
      historyIndex = commands.history.length - 1;
      const lastCmd = commands.history[historyIndex];
      e.target.value = lastCmd;
      return shiftCursor(lastCmd.length);
    } else if (historyIndex !== 0) {
      historyIndex--;
      const lastCmd = commands.history[historyIndex];
      e.target.value = lastCmd;
      return shiftCursor(lastCmd.length);
    }
  }
  if (e.key === "ArrowDown") {
    if (commands.history.length - 1 === historyIndex || historyIndex === null)
      return;
    const lastCmd = commands.history[historyIndex + 1];
    historyIndex++;
    e.target.value = lastCmd;
    return shiftCursor(lastCmd.length);
  }

  if (e.key === "Backspace") {
    return shiftCursor(position);
  }
});

// Output to terminal
const output = (command) => {
  const parsedCommand = command.includes(" ")
    ? command.split(" ")[0].trim()
    : command.trim();
  terminal.appendChild(commands.prompt(command));
  if (commands.list().includes(parsedCommand)) {
    if (typeof commands[command.trim()] === "string") {
      return terminal.appendChild(commands.run(parsedCommand));
    } else if (typeof commands[command] === "function") {
      return terminal.appendChild(commands[parsedCommand]());
    }
  }
  return terminal.appendChild(commands.error(parsedCommand));
  // If command is valid, output to terminal.
  // Else, output standard error message.
};

const tabCompletion = (prompt) => {
  const parsedPrompt = prompt.includes(" ")
    ? prompt.split(" ").slice(-1)
    : prompt;
  const allCmds = commands.list();
  const matches = allCmds.filter((command) => {
    return command.includes(parsedPrompt);
  });
  return matches || null;
};
