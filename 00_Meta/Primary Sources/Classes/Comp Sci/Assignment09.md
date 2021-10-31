**[Assignment 09: Data Warehousing]{.ul}**

**[Question: 01]{.ul}**

A Data ware housing is a data management system mainly helpful for storing historical data and support the decision making and BI activities. To make better decisions we require large amount of data to analyze. With large amount of data comes the problem of organizing it. We can only take proper decisions when the data is appropriate and understandable.

As a Data base administrator, you have been asked to construct a star schema for the company's data which keeps track of information regarding books, authors and reader.

The data present in different tables are as follows:

**Authors table:**

+-----------+------------------------+-----------------------+-----------------------+-------------+
| Author ID | Author name            | Author contact number | Author address        | Book ID     |
+===========+========================+=======================+=======================+=============+
| A01       | Anna, Todd             | 6601123210            | Maryville, MO, 64468  | B01         |
+-----------+------------------------+-----------------------+-----------------------+-------------+
| A02       | David, Sky & Anna Todd | 6611134324            | Kansas city, MO,      | B02         |
|           |                        |                       |                       |             |
|           |                        |                       | 67842                 |             |
+-----------+------------------------+-----------------------+-----------------------+-------------+
| A03       | Justin, Hayley         | 6669991234            | Alexandria, TN, 37012 | B03         |
+-----------+------------------------+-----------------------+-----------------------+-------------+
| A04       | Hardon, Titan          | 6667779999            | Alexandria, TN, 37012 | B05         |
+-----------+------------------------+-----------------------+-----------------------+-------------+
| A01       | Anna, Todd             | 6601123210            | Maryville, MO, 64468  | B04         |
+-----------+------------------------+-----------------------+-----------------------+-------------+

**Books table:**

  -----------------------------------------------------------------------------
  Book ID           Book Name           Book price        Book published year
  ----------------- ------------------- ----------------- ---------------------
  B01               After               9.99              2014

  B02               Princess            12.99             2016

  B03               Broken              5.99              2017

  B04               After we collided   9.99              2017

  B05               Pride               1.99              2015
  -----------------------------------------------------------------------------

**Readers table:**

  -----------------------------------------------------------------------
  Reader Id         Reader name       Reader age        Book ID
  ----------------- ----------------- ----------------- -----------------
  R01               Rahul             19                B01, B02, B04

  R02               Mandy, Scott      18                B01, B03

  R04               Jacob, Malik      20                B01, B04

  R03               Molly, Jonas      21                B02

  R05               Taylor, James     25                B02

  R06               Selena, Thomas    23                B02

  R07               Tessa             28                B01, B02

  R08               Zed, Pure         19                B05
  -----------------------------------------------------------------------

Note: Name are given as First Name, Last Name.

The following are the tasks you have been asked to perform:

-   Draw a star schema entity relationship diagram suitable for above data.

    -   Identify fact table and dimension tables for the data.

    -   Identify which columns will be under which dimension and place them accordingly in the model.

    -   The only facts to be stored are bookID, authorID and readerID.

    -   Identify proper cardinality between fact table and dimension tables.

-   **Extract** data from all the branches of the company into one place.

-   **Transform** the data into required formats

    -   First name and Last Name should be separated into separate fields.

    -   Address should be separated into street, City, State fields.

    -   Whenever we collect information it is not necessary that people will respond everything in proper manner. In this case we may have missing data. To solve this problem, we either have to fill the field with null value or with appropriate data but never leave any cell empty.

    -   Contact number should be in \_ \_ \_- \_ \_ \_ - \_ \_ \_ \_ format.

        -   E.g.: 9990001111 to 999-000-1111

-   **Load** the data according to the model and store them into the data warehouse or data mart

-   Draw the final tables with data after completion of ETL process.

**[Question: 02]{.ul}**

Define dimension and fact in detail.

**[Question: 03]{.ul}**

What is the difference between additive, semi-additive and non-additive facts? Provide one example for each type of fact.

**[For submission:]{.ul}**

-   For question 01: Draw the star schema and the final table with data in this document itself. And write a little explanation regarding your star schema.

-   Answer all the questions.

-   Highlight your answers in yellow color.

-   View the rubric to gain full score.

-   Rename this file as LastName_Assignment09.doc where LastName is your last name.
