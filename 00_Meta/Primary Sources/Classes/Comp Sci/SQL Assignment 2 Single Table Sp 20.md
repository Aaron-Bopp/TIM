> **44-460/660 Database Systems**
>
> **Spring 2020**
>
> **SQL Assignment 02 (Single Table Processing -- Ref: Chapter 6)**
>
> **Total: 30 Points**
>
> **[Overview of Assignment:]{.ul}**
>
> In this assignment you will write [[SQL]] statements, each of which will process a single table. All the information you need to write these [[SQL]] statements can be found in Chapter 6 of your textbook.

You will use MySQL to test your statements. Not only will you get practice using [[SQL]], but you will also get some experience with MySQL! The easiest way to do this assignment will be to create a text file, using your choice of text editors, and write your [[SQL]] statement in the text file. You can then execute the statements in the text file by using the **source** command at the **mysql** prompt. Details of exactly how to do this are included in this document.

**Loading the database:­­­­**

-   This assignment uses the Clearwater Traders database. You should create a folder on your C: Drive called "0", then download the database and save it in that folder.

-   When running MySQL, at the **mysql>** prompt enter **source c:/0/clearwater.sql**

-   At the **mysql>** prompt enter **use clearwater**

-   Execute [[SQL]] statements at the **mysql>** prompt.

-   Create a text file containing your [[SQL]] statements and run it using the **source** command.

-   Keep in mind that for grading purposes you must create a text file that will produce the correct output when run with the source command. See instructions below.

**Format of text file submitted for grading:**

You will turn in a single text file for grading. The text file should contain the following. Note that a pair of hyphens, ***followed by a required space***, is used to indicate a comment.

**\-- *your first and last name***

**\-- [[SQL]] Assignment 02**

**\-- #1**

**solution to problem number 1 goes here**

**\-- #2**

**solution to problem number 2 goes here**

etc.

The text file must be named using your last name, followed by your first initial followed by **02**, with **txt** extension: **SmithJ02.txt** for example.

**Testing your solution:** Your solution must run as a script. When we run your solution, we will first run the **clearwater.sql** script so that we start with a clean copy of the database. Then we will type in the following command for student Joe Smith, with the appropriate path information included:

> **source c:/.../SmithJ02.txt**

This single command should result in all of the assigned problems executing correctly. You should try this before submitting your solution for grading. Compare your output to the desired output, available on the course website.

**Submitting your work:**

Assignments must be uploaded to the appropriate dropbox on the course website by the deadline.

# The SQL statements

Note that your solution to each of these problems must work for arbitrary data, not just the data currently in the clearwater tables. To see the data that is loaded using **clearwater.sql**, download **clearwatertables.doc** from the course website.

Write a single [[SQL]] statement to produce each of the following.

1)  Display the first name, last name and city for all customers.

2)  Display the shipment id, inventory id and date received for each record in the shipment line table with a date received before August 25, 2003. Note: date\_ received is of type DATE. Represent DATE variables in MySQL using the format yyyy-mm-dd, enclosed in single quotes, '2018-10-20' for example.

3)  Display the count of all items using a label of ItemCount for which the quantity on hand is 137 in the inventory table.

4)  Display the item id, color and price of all records in the inventory table that have item size of 'S'.

5)  Display item id, item size and quantity on hand of all records in inventory table that have a color of 'Navy' and a price of 29.95.

6)  Display the average price of all records with item id of 559 in the inventory table.

7)  Display all available information from the customer table for those customers whose first name starts with 'M'.

8)  Display the order id, order date, order payment method for all customer orders that have an order source id listed as either 2 or 6.

9)  Display all the information from the inventory table for which the color contains the phrase "ight", or for which the color starts with the letter 's', the inventory id is greater than 11700 and quantity on hand is not equal to zero.

10) Display all the payment methods in cust_order table. Note: Each payment method should be displayed only once.

11) Display all the information from the shipment line table sorted in ascending order on inventory id. If two records have the same inventory id, order those records by the received date. If some records share the same received date, order those records by the shipment id.

12) Display all available information in the customer table for which the first name ends with 'a' and the zip code is 54867.

13) Display all the order ids from the order line table along with a count of the number of entries for each order id. The final result should be sorted in descending order by the count value.

14) Display the same output as the previous problem, except list only those records for which number of entries is greater than one.
