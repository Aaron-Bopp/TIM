**44-560 Advanced Topics in Database**

**In-Class Exercise**

**SQL Review**

1)  Run the script createSalesTables.sql.

2)  Write an [[SQL]] statement to display the name, address, and current balance of each customer. Results should be in descending order by current balance.

3)  Write an [[SQL]] statement that displays each sales rep number that appears in the customer table along with the number of customers the sales rep has.

4)  Write an [[SQL]] statement that displays each warehouse number along with the number of different parts in the warehouse. Note: We are not asking for the quantity or units on hand, just the number of distinct parts stored. For example, if warehouse 2 has 100 skates, 14 stoves, and 20 sets of weights, the number of different parts is 3 (skates, stoves, and weights).

5)  Same as 4, but this time for each warehouse number, list the total units on hand.

6)  Same as 4, but display only those warehouses that have more than 2 different parts.

7)  Write an [[SQL]] statement to display the name of each customer, along with the name of the sales rep for that customer.

8)  Write an [[SQL]] statement to display the name of each customer where the name of the customer contains the letter 'a'.

9)  Write an [[SQL]] statement to display the name of each customer where the name of the customer contains the letter 'a' and the name ends with an 's'.

10) Write an [[SQL]] statement to display the order number for each order in the order table, along with the name of the customer placing the order, and the name of the sales rep for the customer who placed the order.

11) Insert a new record into the part table.

12) Insert a new order into the custorder table.

13) Insert a new orderline for the order and part you just created.

14) Delete all records from orderline where the part number is 'cx11';

15) Rollback your changes to restore the original data.
