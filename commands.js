const terminal = document.querySelector("#terminal");

export const commands = {
  list() {
    return ["help", "whois", "projects", "themes", "clear", "exit"];
  },
  history: [],
  help: `
  help  - Lists all available commands. <br />
  whois - Who is Will? <br />
  projects - View my projects. <br />
  themes - Set a different color schemes for the terminal. <br />
  clear - Clears the terminal. <br />
  exit - Leave the simulation.
  `,
  whois: `
  Hi! I'm Will. (^O^)/ <br />
  I'm a SOC Analyst and Web Developer that is currently looking to get hired. <br />
  I have a passion for all things tech related. <br />
  Having grown up around computers, I've always been fascinated about the web and its technologies. <br />
  From playing flash games on my old dial-up connection, to learning how packets travel across the internet; <br />
  it's been amazing to experience the evolution of the web, and seeing it grow to how we know it today. <br />
  I'm grateful for all the talented people who contributed to building out the internet. <br />
  And now I plan to give back by keeping the web safe and secure for everyone, and building out the next generation of web apps. <br />

  If you're interested in learning more about me, let's <a href="https://www.linkedin.com/in/will-chen-25002116a/">connect!<a/> <br />
  `,
  projects: `
  ⚠ Under Construction ⚠
  `,
  themes: `
  default
  blue-team
  purple-team
  red-team
  `,
  exit: `
  <br />
  <br />
  Y̷̦̙̪͌̿̽̉̉ơ̷̢̛̭͍̒̋͌́̀̄ͅư̶̡͕͙͔̠̭̣̠̹̩͔̩̮̳̹̈́̂͋̇͗̏̂̃͂̔̕ ̵̢̗̤̙̞͓͙̺̩̑̓̈̓͠ͅc̸̯̩̳̯̲̘̎̃͛̍̉̑̀͂̐̃̕̚͝͝ả̶̧͙͖̀́̄͑̉̌̋͠n̸̨̛͍͖͖͈̥̭̤͙̤̹͓̎̓̏͒͗̃͝n̴̡͈͑̏̀̕͝ǫ̶͙͙̻̪͙̖̀̉̍͝͠t̸̲̳͌̀͊͊̀̋͗͒̇̽̈́̈͌̽͝ ̵̡̢̢̖̳̰͙̮̬̪͓̥̰̮̺̽̎̀e̵̛̳͓̮̝̱͈͎̗̪̜͈̠̯͋̅̄̄̽́ś̶͙̟͍̆̉͋̎c̵͈̟͍̙͉̗͎͖͉̏̋̐̿̈́̆͠͠ą̷̜͗̔̈͋̋̈̐͐̕̚͠p̸̩͉̖̥͚̩̏͗̋̆̕ę̴̛͇̭̘̫͔̱͖͖̏̓̊̀̑̚̕͜͠ ̵̢͚̬͚̩̝̏͜ţ̴̫͚͇͈͈̫͉͍͈͑́̀̄̋͛͑̂́̓̎͋̑̕͜ͅḫ̷̲͖̗͇̙̪̦͇̖̹͙͊̈́͆̾̄̅̚ę̶̦̯̬̪͉̲̇̍̄̆͛̒́͝͠͝ ̵̢̻̟͈͔̣̼̦̘̖͑̏̑̂̾̿̿̀͐̋̈́̃̓̕͜͝m̵̢̡̨̗̩̟͚̼̟͈̭͓͂̆́̽̀͂͋̇͌̈́̓̄͆̍͒ͅͅẵ̴̢̜͇̣̥̮̣̻̟̾̔̈̿́͒͝t̷̰̏̏̈́̈́̓̍̌͂̕̚r̴̡̙̠̘͒̃͜ǐ̷͈̙͙͔͈̚x̵̞̣̻͇̦̝̜̱̼̾̈́͂̑̈́̓̔͗̚.̷̧̧̟̪̰͇͉͇͕͎̖̇̄͒̀̀̐͗̓̉̇́͗̕
  <br />
  <br />`,
  clear() {
    terminal.innerHTML = " ";
    window.scrollTo(0, 0);
    return null;
  },
  run(command) {
    const output = document.createElement("p");
    output.classList.add("output", "typewriter");
    output.innerHTML = this[command];
    return output;
  },
  prompt(command) {
    const output = document.createElement("p");
    output.className = "prompt";
    output.innerHTML = ` ${command}`;
    return output;
  },
  error(command) {
    const output = document.createElement("p");
    output.className = "output";
    output.innerHTML = `'${command}' was not recognized as a command.
    <br />For a list of commands, type 'help'.`;
    return output;
  },
};
