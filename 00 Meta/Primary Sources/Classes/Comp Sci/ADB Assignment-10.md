**[44-560 Advanced Topics in Database Systems]{.ul}**

**[Assignment-10: NoSQL - MongoDB]{.ul}**

All Northwest students (graduate and undergraduate) regardless of whether they are full-time or part-time and live on or off campus, are provided with a wireless-ready laptop [[computer]]. Northwest laptop models may vary between students depending on availability and enrollment status.  Online professional program students have a different fee structure and are ineligible to participate in the Northwest laptop program.

![](media/image1.jpg){width="3.9484372265966754in" height="2.625in"}

Let's assume that the data of all the issued laptops is maintained in a No-[[SQL]] database. The data in the DB is as follows,

  -----------------------------------------------------------------------------------------------------------------------
  **Student_id**   **Student_Name**   **Laptop_Brand**   **Laptop_Model**   **Issued_Date**   **Laptop_Price (in USD)**
  ---------------- ------------------ ------------------ ------------------ ----------------- ---------------------------
  919123456        Bob Iger           HP                 Probook            01/15/2020        999

  919234567        Scarlett Wilson    HP                 Elitebook          01/14/2020        899

  919345678        Steve Wozniak      APPLE              Macbook Air        08/03/2020        1099

  919456789        Reed Hastings      HP                 Elitebook          06/10/2020        899

  919567890        Jennifer Dorsey    DELL               XPS 13             07/30/2019        1499

  919654321        Kenneth Cole       HP                 Elitebook          09/02/2020        899

  919765432        Kim Gregory        HP                 Probook            01/16/2020        999

  919876543        Samantha Wheeler   APPLE              Macbook Air        09/01/2019        1099
  -----------------------------------------------------------------------------------------------------------------------

Consider the provided data and answer the following questions.

**Questions:**

1.  Create a new database names "NorthwestIT".

2.  Now write a query to create a collection to store the documents and name it as "laptops".

3.  Now write a query to insert the first record from the table given in the table above.

4.  Now write a query to insert the rest of the data using only one command.

5.  Now write a query to display the data using a single command.

> Note: we have a method called pretty(), by which we can see the data in a better structure. Please use it.

6.  Write a query that prints the names of all the people using "HP" branded laptop.

7.  Find the count of laptops priced more than USD 999.

8.  Update 'Laptop_Price' to 1599 for the records whose 'Laptop_Model' is 'XPS 13'.

9.  Calculate and display the Student_id and Student_Name who is possessing laptop with maximum price.

10. Delete the document with Student_id of 919456789

11. Now drop the 'laptops' collection

12. Drop the "NorthwestIT" database that you created

**For Submission:**

Make changes to this document and include your answers below each question. Also include the screenshots of all the queries you executed in this assignment. Rename the file to Lastname_Assignment10.doc and submit it through Canvas.
