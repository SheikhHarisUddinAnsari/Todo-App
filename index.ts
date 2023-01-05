#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let list: string[] = [`clean cloths`, `perform namaz`];

async function input() {
  const input = await inquirer
    .prompt([
      {
        type: "string",
        name: `newInput`,
        message: `Enter anything which you want to add in list`,
        default: null,
      },
    ])
    .then((ans) => {
      if (ans.newInput) {
        list.push(ans.newInput);
        console.log(chalk.bgWhiteBright(chalk.redBright(format(list))));
      } else {
        console.log(`You did not entered anything`);
        console.log(chalk.bgWhiteBright(chalk.redBright(format(list))));
      }
    });
} //This function allows user to enter in the to do app
function format(array: string[]) {
  let j = 1;
  var newFormat = "\r\n";
  array.forEach(function (element, index) {
    newFormat += "" + `(${j}) ` + element + "";
    if (index + 1 === array.length) {
      newFormat += "\r\n";
    } else {
      j++;
      newFormat += ",\r\n";
    }
  });
  newFormat += "";
  return newFormat;
} //This function formats array to proper todo app
async function remov() {
  const line = await inquirer
    .prompt([
      {
        type: "input",
        name: `line`,
        message: `Enter the line number which you want to delete`,
      },
    ])
    .then((ans) => {
      if (ans.line) {
        for (let i = 0; i <= list.length; i++) {
          if (i == ans.line) {
            list.splice(ans.line - 1, 1);
          }
        }
        console.log(chalk.bgWhiteBright(chalk.redBright(format(list))));
      } else {
        console.log(chalk.bgCyan(chalk.blue(`You did not entered any line`)));
        console.log(chalk.bgWhiteBright(chalk.redBright(format(list))));
      }
    });
} //This function allows user to remove in the to do app
async function operation() {
  console.log(chalk.bgCyan(chalk.blue(`Welcome to Todo App`)));
  const fun = await inquirer
    .prompt([
      {
        type: "list",
        name: `operation`,
        message: `Which operation do you want to perform in list`,
        choices: [`Add`, `Remove`],
      },
    ])
    .then((ans) => {
      let myPromise = new Promise(function (res, rej) {
        if (ans.operation === `Add`) {
          res(`Add`);
        } else {
          rej(`Remove`);
        }
      });

      myPromise.then(
        async function (value) {
          await input();
        },
        async function (error) {
          await remov();
        }
      );
    });
} //This function allows user to do all the operations in the to do app and calls all the other functions

operation();
