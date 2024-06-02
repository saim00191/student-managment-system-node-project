#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//STUDENT MANAGMENT SYSTEM
class Student {
    static counter = 1000;
    id;
    name;
    fatherName;
    age;
    gender;
    course = [];
    balance = Math.floor(Math.random() * 90000);
    contactNumber;
    constructor(name, fatherName, age, gender, contactNumber) {
        this.id = Student.counter++;
        this.name = name;
        this.fatherName = fatherName;
        this.age = age;
        this.gender = gender;
        this.contactNumber = contactNumber;
    }
    enrollCourse(course) {
        this.course.push(course);
    }
    viewBalance() {
        console.log(chalk.bold(`\nNAME : ${this.name} \nFATHER NAME : ${this.fatherName} \nBALANCE : ${this.balance}\n`));
    }
    payFees(amount) {
        let monthlyFees = 5000;
        if (this.balance > amount) {
            if (amount >= monthlyFees) {
                this.balance = this.balance - monthlyFees;
                console.log(chalk.green.bold(`Fees Paid Successfully For ${this.name}`));
                console.log(chalk.green.bold(`Remaining Balance : ${this.balance}`));
            }
            else {
                console.log(chalk.red.bold(`\nAmount is Less to Pay Monthly Fees\n`));
            }
        }
        else {
            console.log(chalk.red.bold("\nYou Don't Have Sufficient Balance \n"));
        }
    }
    showStatus() {
        console.log(chalk.bold(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n AGE : ${this.age} \n GENDER : ${this.gender} \n PHONE NUMBER : ${this.contactNumber} \n COURSE : ${this.course} \n BALANCE : ${this.balance}\n`));
    }
}
class Student_Manager {
    students = [];
    addStudent(name, fatherName, age, gender, contactNumber) {
        let studentContactNumberCheck = this.students.find(std => std.contactNumber === contactNumber);
        if (studentContactNumberCheck) {
            console.log(chalk.red.bold(`\nContact Number Already Exist`));
            console.log(chalk.red.bold(`Admission Not Completed.\n`));
        }
        else {
            let student = new Student(name, fatherName, age, gender, contactNumber);
            this.students.push(student);
            console.log(chalk.green.bold(`\nStudent ${name} Added SuccessFully . Student ID : ${student.id}\n`));
        }
    }
    enroll_Course(student_id, course) {
        let studentEnrollCourseIdCheck = this.students.find(std => std.id === student_id);
        if (studentEnrollCourseIdCheck) {
            studentEnrollCourseIdCheck.enrollCourse(course);
            console.log(chalk.bold.green(`\nCourse ${course} Enrolled SuccessFully For ${studentEnrollCourseIdCheck.name}\n`));
        }
        else {
            console.log(chalk.bold.red(`\nStudent Not Found . Please Enter Correct Student Id.\n`));
        }
    }
    viewStudentBalance(student_id) {
        let studentBalanceIdCheck = this.students.find(std => std.id === student_id);
        if (studentBalanceIdCheck) {
            studentBalanceIdCheck.viewBalance();
        }
        else {
            console.log(chalk.bold.red(`\nStudent Not Found . Please Enter Correct Student Id.\n`));
        }
    }
    payFees(student_id, amount) {
        let studentPayFeesIdCheck = this.students.find(std => std.id === student_id);
        if (studentPayFeesIdCheck) {
            studentPayFeesIdCheck.payFees(amount);
        }
        else {
            console.log(chalk.red.bold(`\nStudent Not Found . Please Enter Correct Student Id.\n`));
        }
    }
    showStatus(student_id) {
        let studentStatusIdCheck = this.students.find(std => std.id === student_id);
        if (studentStatusIdCheck) {
            studentStatusIdCheck.showStatus();
        }
        else {
            console.log(`Student Not Found . Please Enter Correct Student Id.`);
        }
    }
}
let condition = true;
console.log(chalk.green.bold.italic.underline("Welcome To Student Managment System"));
console.log("*".repeat(35));
let student_Manager = new Student_Manager();
while (condition) {
    let choices = await inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "Select :",
            choices: [
                "Add Student",
                "Enroll Course",
                "View Student Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
    ]);
    // If-Else Statements
    if (choices.answer === "Add Student") {
        let studentName = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter Student Name :",
                validate: (value) => {
                    if (isNaN(value)) {
                        return true;
                    }
                    else if (value.length < 3) {
                        return (chalk.red.bold("\nName Should Be Atleast 3 Character Long\n"));
                    }
                    else {
                        return (chalk.red.bold("\nPlease Enter Valid Input\n"));
                    }
                }
            }
        ]);
        let stdFatherName = await inquirer.prompt([
            {
                type: "input",
                name: "fatherName",
                message: "Enter Student Father Name :",
                validate: (fvalue) => {
                    if (isNaN(fvalue)) {
                        return true;
                    }
                    else if (fvalue.length < 3) {
                        return (chalk.red.bold("\nName Should Be Atleast 3 Character Long\n"));
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        let stdAge = await inquirer.prompt([
            {
                type: "number",
                name: "age",
                message: "Enter Student Age :",
                validate: (value) => {
                    if (value < 13) {
                        return (chalk.red.bold("Age Should Be Greater Than 12"));
                    }
                    else if (value > 19) {
                        return (chalk.red.bold("Age Should be Less than 18"));
                    }
                    else if (isNaN(value)) {
                        return (chalk.red.bold("Invalid input"));
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        let stdGender = await inquirer.prompt([
            {
                type: "list",
                name: "gender",
                message: "Select Gender :",
                choices: ["Male", "Female", "Other"]
            }
        ]);
        let stdContactNumber = await inquirer.prompt([
            {
                type: "number",
                name: "contactNum",
                message: "Enter Contact Number:",
                validate: (input) => {
                    if (isNaN(input)) {
                        return (chalk.red.bold("Invalid input"));
                    }
                    else if (input.toString().length !== 10) {
                        return (chalk.red.bold("Incorrect Phone Number"));
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        student_Manager.addStudent(studentName.name, stdFatherName.fatherName, stdAge.age, stdGender.gender, stdContactNumber.contactNum);
    }
    else if (choices.answer === "Enroll Course") {
        let StdCourseEnroll = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            },
            {
                type: "list",
                name: "course",
                message: "Select Course:",
                choices: ["Web Development", "App Development", "Artificial Intelligence", "Web 3.0", "Metaverse"]
            }
        ]);
        student_Manager.enroll_Course(StdCourseEnroll.id, StdCourseEnroll.course);
    }
    else if (choices.answer === "View Student Balance") {
        let StdViewBalance = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            }
        ]);
        student_Manager.viewStudentBalance(StdViewBalance.id);
    }
    else if (choices.answer === "Pay Fees") {
        console.log("*".repeat(20));
        console.log(chalk.green.bold.italic("Monthly Fees Is 5000"));
        console.log("*".repeat(20));
        let StdPayFees = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            },
            {
                type: "number",
                name: "amount",
                message: "Enter Amount :",
                validate: (value) => {
                    if (value < 0) {
                        return "Amount Should Be Greater Than 0";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        student_Manager.payFees(StdPayFees.id, StdPayFees.amount);
    }
    else if (choices.answer === "Show Status") {
        let StdStatus = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            }
        ]);
        student_Manager.showStatus(StdStatus.id);
    }
    else if (choices.answer === "Exit") {
        condition = false;
        console.log("*".repeat(45));
        console.log(chalk.green.bold.italic("Thank You For Using Student Managment System"));
        console.log("*".repeat(45));
    }
}
