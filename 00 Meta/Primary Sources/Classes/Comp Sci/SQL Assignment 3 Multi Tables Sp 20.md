**44-460/660 Database Systems**

**Spring 2020**

**SQL Assignment 03 (Multiple Table Processing Ref: Chapter 7)**

**30 points**

**Overview of Assignment**

In this assignment you will write [[SQL]] statements, each of which will process multiple tables. All the information you need to write these [[SQL]] statements can be found in Chapters 6 and 7 of your textbook.

As with [[SQL]] Assignment 02, you will use the Clearwater database for this assignment. Your solution must work for arbitrary data, not just the data provided with this assignment.

Follow the same instructions for formatting your solution file as in [[SQL]] Assignment 01. Be certain to include the two lines below at the top of your [[SQL]] assignment file.

**\-- [[SQL]] Assignment 03**

**\-- Your first and last name**

You must include a comment (problem number) before each solution. Ex:

\-- #1

The text file must be named using your last name followed by your first initial followed by 03, with txt extension: SmithJ03.txt for example. As with [[SQL]] Assignment 02, your solution file must run as a script using the source command in MySQL. Your [[SQL]] assignment file should be placed in the Canvas drop box for [[SQL]] Assignment 02.

Write a single [[SQL]] statement to produce each of the following.

Do not use subqueries for problems 1 through 6.

1)  For each customer order, list the order id, order date, meth_pmt, the first and last name of the customer placing the order.

2)  For each customer order, list the order id, order date, order_source_id, source description, and the first and last name of the customer.

3)  For each line in shipment_line, display the shipment_id, inv_id, ship_quantity, date_expected and date_received.

4)  For the records in the shipment_line table, display the shipment_id, item_id, item_size, color, and price for those items containing "ight" in their color.

*[Note: Use the inner join clause for problems 05 and 06]{.ul}*

5)  For each item, display item id, item description, item size and price of the item where the result contains items with "M" as item size. Note: Each item should be listed only once.

6)  Display the customer last name, the order id, the order date, and the source description for all the customer orders placed after May, 2003.

> ***[Note: Write a single [[SQL]] statement to produce each of the following. Use non-correlated or correlated subqueries for your solutions to problems 7 through 11.]{.ul}***

7)  List the inventory id, item size, color and price of all the items in inventory table where the price is equal to the highest item price.

8)  List the distinct order ids of all orders that contain an item such that the color of the item contains the word "u" or ends with "e".

9)  List the inventory id, item id, color, and quantity on hand of the inventory record with the largest quantity on hand. If two records have the same largest quantity on hand, list both.

10) List the inventory id, item id, color, and quantity on hand of the inventory record with the smallest quantity on hand. If two records have the same smallest quantity on hand, list both.

11) Write a single [[SQL]] statement that produces the output of the two previous problems as a single result set.  Each line of output should have an additional column labeled "comments" with the value "largest" or "smallest," depending on whether the record represents the largest or the smallest quantity on hand.

**Bonus (5 pts total):**

**Use a subquery for each of the following problems.**

1.  Find the item with the largest *total* quantity on hand (qoh) and display the item id, item description, the price of the item, and the total quantity on hand for the item. If two items have the same largest total quantity on hand, list both.

2.  Find the item with the smallest *total* quantity on hand (qoh) and display the item id, item description, the price of the item, and the total quantity on hand for the item. If two items have the same smallest total quantity on hand, list both.
