const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "bamazon_db"
});

connection.connect(function(error){
    if(error){
        throw error;
    }

    console.log("connected as ID " + connection.threadId);

    managerPrompt();
    // connection.end();
});


function managerPrompt(){
    inquirer
    .prompt([
        {
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products For Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function(answer){
        switch(answer.action){
        case "View Products For Sale":
            productSearch();
            break;

        case "View Low Inventory":
            lowInventory();
            break;
        
        case "Add to Inventory":
            addInventory();
            break;

        case "Add New Product":
            addProduct();
            break;
        }

    });
    
}

function productSearch(){
    connection.query("SELECT * FROM products", function(error, response){
        if(error){
            throw error;
        }
        for(let i = 0; i < response.length; i++){
            console.log("============================");
            console.log("Item ID: " + response[i].item_id);
            console.log("Item: " + response[i].product_name);
            console.log("Price: $" + response[i].price);
            console.log("Quantity: " + response[i].stock_quantity);
            console.log("============================");
        }
    });
}

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, response){
        if(error){
            throw error;
        }
        for(let i = 0; i < response.length; i++){
            console.log("============================");
            console.log("Item ID: " + response[i].item_id);
            console.log("Item: " + response[i].product_name);
            console.log("Price: $" + response[i].price);
            console.log("Quantity: " + response[i].stock_quantity);
            console.log("============================");
        }
    });
}

function addInventory(){
    connection.query("SELECT * FROM products", function(error, response){
        productSearch();

        inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "which item would you like to add to? (select by ID)"
            },
            {
                name: "amount",
                type:"input",
                message:"How much of this item would you like to add?"
            }
        ]).then(function(answer){
            console.log(answer);
        
                answer.item = response[(answer.item - 1 )].item_id;
                for(let i = 0; i < response.length; i++){
                    if(answer.item === response[i].item_id){
                        console.log("this worked");
                    }
                }
        
        });
    });
    
}

function addProduct(){
    inquirer
    .prompt([
        {
            name: "name",
            type: "input",
            message: "Please input the name of the item that you would like to add: "
        },
        {
            name: "department",
            type: "input",
            message: "Please input the name of the department in which the item will go: " 
        },
        {
            name: "price",
            type: "input",
            message: "Please input the price of the item: "
        },
        {
            name: "stock",
            type: "input",
            message: "Please input how much of the item you wish to stock: "
        }
    ]).then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock
        }, function(error, response) {
            if(error){
                throw error;
            }
            console.log("You nave added a new item!");
        });
    });
}