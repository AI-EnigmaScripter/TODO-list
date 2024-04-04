#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
while (conditions) {
    const { task, addMore } = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.blue("Enter your new task:")
        },
        {
            name: "addMore",
            type: "confirm",
            message: chalk.blue("Do you want to add more tasks?"),
            default: false
        }
    ]);
    if (task) {
        todoList.push(task);
        console.log(chalk.green("Task added in Todo-list successfully"));
    }
    conditions = addMore;
}
console.log(chalk.bgGreen("Your Todo-list is updated:"), todoList);
async function main() {
    let choice = "";
    while (choice !== "Exit") {
        choice = await promptChoice();
        await handleChoice(choice);
    }
    console.log(chalk.bgGreen("Your Todo-list is updated:"), todoList);
}
async function promptChoice() {
    const { choice } = await inquirer.prompt({
        name: "choice",
        type: "list",
        message: chalk.blue("What do you want to do?"),
        choices: ["Add Task", "View Tasks", "Update Task", "Delete Task", "Exit"]
    });
    return choice;
}
async function handleChoice(choice) {
    if (choice === "Add Task") {
        await addTask();
    }
    else if (choice === "View Tasks") {
        viewTasks();
    }
    else if (choice === "Update Task") {
        await updateTask();
    }
    else if (choice === "Delete Task") {
        await deleteTask();
    }
}
async function addTask() {
    const { task } = await inquirer.prompt({
        name: "task",
        type: "input",
        message: chalk.blue("Enter your new task:")
    });
    task && todoList.push(task) && console.log(chalk.green("Task added to Todo-list successfully"));
}
function viewTasks() {
    console.log(chalk.blue("Your Todo-list:"));
    todoList.forEach((task, index) => console.log(`${index + 1}. ${task}`));
}
async function updateTask() {
    const { index } = await inquirer.prompt({
        name: "index",
        type: "number",
        message: chalk.blue("Enter the index of the task you want to update:")
    });
    if (index >= 1 && index <= todoList.length) {
        const { updatedTask } = await inquirer.prompt({
            name: "updatedTask",
            type: "input",
            message: chalk.blue("Enter the updated task:")
        });
        todoList[index - 1] = updatedTask;
        console.log(chalk.green("Task updated successfully"));
    }
    else {
        console.log(chalk.red("Invalid index"));
    }
}
async function deleteTask() {
    const { index } = await inquirer.prompt({
        name: "index",
        type: "number",
        message: chalk.blue("Enter the index of the task you want to delete:")
    });
    if (index >= 1 && index <= todoList.length) {
        todoList.splice(index - 1, 1);
        console.log(chalk.green("Task deleted successfully"));
    }
    else {
        console.log(chalk.red("Invalid index"));
    }
}
main();
