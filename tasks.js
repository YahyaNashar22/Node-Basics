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

// var fs = require("fs");
// var array = fs.readFileSync("database.json");

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
  } else if (splitt[0] === "edit") {
    alter(splitt);
  } else if (splitt[0] === "check" || splitt[0] === "uncheck") {
    check(splitt, arr);
  } else if (text === "save\n") {
    save(arr);
  } else if (text === "load\n") {
    load(arr);
  } else {
    unknownCommand(text);
  }
}
// variables for checked , unchecked
// let obj = {
//   'taskName': ,
//   'ischecked' :
// }
var done = "[✓]";
var undone = "[ ]";
var a = undone;

var fs = require("fs");
var arr = [`${a}first-task`, `${a}second-task`];

//✓

/**
 * Checks the tasks
 * @param {Array} splitt
 * @param {Array} arr
 * @returns {void}
 */
function check(splitt, arr) {
  if (splitt.length < 2) {
    console.log("You need to specify which task!");
  } else {
    let index = parseInt(splitt[1]);
    let task = arr[index - 1].toString();
    let checkedTask = task.replace("[ ]", "[✓]");
    let uncheckedTask = task.replace("[✓]", "[ ]");
    if (splitt[0] === "check") {
      if (splitt.length == 2) {
        arr.splice(index - 1, 1, `${checkedTask}`);
        console.log(`checked task ${index}`);
      }
    } else if (splitt[0] === "uncheck") {
      if (splitt.length == 2) {
        arr.splice(index - 1, 1, `${uncheckedTask}`);
        console.log(`checked task ${index}`);
      }
    }
  }
}
/**
 *adds items to the list
 *
 * @param {Array} splitt
 * @returns {void}
 */
function add(splitt) {
  if (splitt.length != 1) {
    arr.push(undone + splitt[1]);
    console.log(`'Added ${[splitt[1]]}'`);
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
    if (index > arr.length) {
      console.log("anata wa baka desu ka? task wa inai !");
    } else {
      arr.splice(index - 1, 1);
      console.log(`removed task ${index}`);
    }
  } else {
    console.log("task list is empty");
  }
}

/**
 * edit command
 * @param {Array} splitt
 * @returns {void}
 *
 */
function alter(splitt) {
  let index = parseInt(splitt[1]);
  if (splitt.length == 1) {
    console.log("syntax error!");
  } else if (splitt.length == 2) {
    arr.pop();
    arr.push(undone + splitt[1]);
    console.log(`last task changed to ${splitt[1]}`);
  } else if (splitt.length > 2) {
    arr.splice(index - 1, 1, undone + splitt[2]);
    console.log(`changed task ${index} to ${splitt[2]}`);
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
  } else console.log("Konnichiwa ^,^/ ! ");
  //already fixed the white space :p
}
/**
 *
 * @returns {void}
 *
 */
// function save() {
//   fs.writeFileSync("database.json", stringy, "utf8", function (err) {
//     if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//     }
//     console.log("JSON file has been saved.");
//   });
// }
/**
 * Exits the application
 * @returns {void}
 */
function quit() {
  console.log("Going so soon :( ?");
  process.exit();
}
function save(arr) {
  var obj = Object.assign({}, arr);
  var stringy = JSON.stringify(obj, null, 2);
  const filePath = "database.json";
  fs.writeFileSync(filePath, stringy);
  console.log("'saved to json'");
}
function load(arr) {
  const filePath = "database.json";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("file wa doko desu ka?", err);
      return;
    }
    try {
      const loadedData = JSON.parse(data);
      console.log("Object loaded", loadedData);
      arr.splice(0, 2);
      arr = arr.push(...Object.values(loadedData));
    } catch (error) {
      console.error("Error parsing JSON", error);
    }
  });
}
/**
 * Shows help commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    " possible commands :\n 'hello' \n 'hello <your_name>' \n 'exit' or 'quit'\n 'help' \n 'add'\n 'remove'\n 'remove <nb>'\n 'list'\n 'check'\n 'uncheck'\n "
  );
}

// The following line starts the application
startApp("Yahya Nashar");
