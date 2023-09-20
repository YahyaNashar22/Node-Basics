/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let noWhiteSpace = text.replace("\n", " ");
  let trimmed = noWhiteSpace.trim();
  let splitt = trimmed.split(" ");
  if (text === "exit\n" || text === "quit\n") {
    quit();
  } else if (splitt[0] === "hello") {
    hello(splitt);
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    makeList(arr);
  } else if (splitt[0] === "add") {
    add(splitt);
  } else if (splitt[0] === "remove") {
    remove(splitt);
  } else {
    unknownCommand(text);
  }
}
var arr = ["first-task", "second-task"];

/**
 *adds items to the list
 *
 * @param {Array} splitt
 * @returns {void}
 */
function add(splitt) {
  if (splitt.length != 1) {
    arr.push(splitt[1]);
    console.log(`'Added ${splitt[1]}'`);
  } else {
    console.log("you should specify one task");
  }
}
/**
 *removes from list
 *
 * @param {Array} splitt
 * @returns {void}
 */
function remove(splitt) {
  if (splitt.length == 1) {
    arr.pop();
    console.log("removed last task!");
  } else if (splitt.length > 1) {
    let index = parseInt(splitt[1]);
    arr.splice(index - 1, 1);
    console.log(`removed task ${index}`);
  } else {
    console.log("task list is empty");
  }
}

/**
 *displays the list
 *
 * @param {Array} arr
 * @returns {void}
 */
function makeList(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(i + 1 + "-" + arr[i]);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('"' + c.trim() + '" wa nani desu ka?');
}

/**
 * Says hello
 *
 *@param {Array} splitt
 * @returns {void}
 */
function hello(splitt) {
  if (splitt.length == 2) {
    console.log(`Konnichiwa ${splitt[1]}  ^,^/ !`);
  } else console.log("Konnichiwa ^,^/ !");
  //already fixed the white space :p
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Going so soon :( ?");
  process.exit();
}

/**
 * Shows help commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    " possible commands :\n 'hello' \n 'hello <your_name>' \n 'exit' or 'quit'\n 'help' \n"
  );
}

// The following line starts the application
startApp("Yahya Nashar");
