**[44-560 Advanced Topics in Database Systems]{.ul}**

**[Assignment-02: [[SQL]] Review]{.ul}**

Consider the following ER diagram:

![](media/image1.jpeg){width="6.5in" height="4.127083333333333in"}

Create a .sql file that can be executed in [[SQL]] developer named lastname_A03.sql. Identify each answer (or output) in the file with a comment indicating the question number.

Write [[SQL]] statements that accomplish the following (or answer the following questions); whenever possible you should use one [[SQL]] statement

1.  Create all tables and relationships (include all primary keys, foreign keys, attributes, and appropriate data types) for the ERD above.

2.  Insert three records into each table except the [[COMPUTER]] table; [[COMPUTER]] should have at least two entries for each LAB. Note that not all labs need site licenses.\
    One of your OS records must contain (\'Kali Linux\', 2020.3) as the name and version, respectively. You must create at least 15 records overall (3\*3+3\*2=15).

3.  Alter the LAB table so that the name attribute has type VARCHAR(15)

4.  Update the 'Kali Linux' record to have a name and version of Ubuntu and 20.04

5.  Display the building, room, purchase date, and OS name for every [[computer]] in all the labs; the output should be sorted by building and room in ascending order.

6.  Display the total number of computers in each lab (think about GROUP BY)

7.  Commit the Database

8.  Display all data in all tables separately (do not use a join; use multiple SELECT statements)

9.  Drop all tables in the Database; in a comment in your [[sql]] file answer the question: Why must you drop the tables in a specific order?

10. Roll back the database

11. Display all data in all tables separately (do not use a join)

12. Explain the output you get from problem 11. Put your answer as a comment in the [[sql]] file.
