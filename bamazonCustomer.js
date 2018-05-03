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

    display();
    // customerPrompt();
    // connection.end();
});
function display(){
    connection.query("SELECT * FROM products", function(error, response){
        if(error){
            throw error;
        }
        for(let i = 0; i < response.length; i++){
            console.log("============================");
            console.log("Item ID: " + response[i].item_id);
            console.log("Item: " + response[i].product_name);
            console.log("Price: $" + response[i].price);
            console.log("============================");
        }
        customerPrompt();
    });
    
    // connection.end();
}

function customerPrompt(){
       
    inquirer
    .prompt([
        {
            name: "id",
            type: "input",
            message: "Please input the ID of the item that you would like to buy: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Please input the quantity that you would like to purchase:  "
        }
    ]).then(function(answer){
        console.log(answer);
        connection.query("SELECT * FROM products", function(error, response){
            if(error){
                throw error;
            }
            
            // answer.id = reponse.item_id;
            answer.id = response[(answer.id - 1 )].item_id;
            for(let i = 0; i < response.length; i++){
                if(answer.id === response[i].item_id){
                    console.log("this part works")
                    if(answer.quantity <= response[i].stock_quantity){
                        console.log("cool this part works too")
                    }else{
                        console.log("Insufficient amount!!!")
                    }
                }

                
            }
            
        });

    });
    // connection.end();
}

function order(){

}

function total(){

}