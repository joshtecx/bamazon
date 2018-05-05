# bamazon

## Overview
The app will be similar to  an Amazon-like storefront, and it will take in orders from customers and deplete stock from the store's inventory.

## Customer View
Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called bamazon.

2. Then create a Table inside of that database called products.
    The products table should have each of the following columns:

    item_id (unique id for each product)
    product_name (Name of product)
    department_name
    price (cost to customer)
    stock_quantity (how much of the product is available in stores)

3. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

4.Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.

    The first should ask them the ID of the product they would like to buy.
    The second message should ask how many units of the product they would like to buy.

    Once the customer has placed the order, your application should check if your store has enough of the product to meet the     customer's request.

    If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

    However, if your store does have enough of the product, you should fulfill the customer's order.

    Once the update goes through, show the customer the total cost of their purchase.


### Customer View Screenshots

#### Successful Purchase
<img width="496" alt="screen shot 2018-05-05 at 9 39 45 am" src="https://user-images.githubusercontent.com/32961912/39663862-7f1b01aa-5048-11e8-8061-bd64df1457c5.png">

