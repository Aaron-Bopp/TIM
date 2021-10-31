**[44-560 Advanced Topics in Database Systems]{.ul}**

**[Assignment-02: Normalization]{.ul}**

Answer the following questions (Answers should be short and precise, preferably one line. Place the answer below the question and highlight your answer in yellow like This is the Answer):

1)  **Provide three reasons why we do normalization?**

**We need to prevent data redundancy by reducing wasted space, keeping data integrity and preventing inconsistent data**

2)  **In most cases, which normal form is a relation normalized to? (Is this what you mean?)**

**3nf, yes 3nf will address the three reasons from the question above (the second part of the question is not clear)**

3)  **Condition(s) for a relation to be in First Normal Form?**

**A relation must have no repeating groups to be 1nf**

4)  **Condition(s) for a relation to be in Second Normal Form?**

**A 1nf relation with no partial dependencies**

5)  **What is Partial Dependency?**

**When a non-key attribute is determined by only part of the primary key**

6)  **What is Transitive Dependency?**

**When a non-key attribute uniquely determines the value of another attribute**

7)  **Condition(s) for a relation to be in Third Normal Form?**

**A 2nf relation with no transitive dependencies**

Consider a college that offers [[Computer]] Science degree. New students are enrolled in the degree and have begun their first semester. They are offered a pool of courses among which they should pick some courses. Every student is provided with a registrationID. Every student registers at least one course. The college has maintained a single spreadsheet to store all details so far. As the result, it has become very difficult for the administration to keep track of the information being accumulated.

![](media/image1.jpeg){width="4.642712160979878in" height="3.033333333333333in"}

**[Normalization:]{.ul}**

The data is not atomic, and there are partial dependencies and transitive dependencies. From the point of view of a database developer, please look for opportunities to normalize the data into third Normal Form. Now apply the necessary normalizations on the data as required and transform the data into the third normal form. Feel free to add attributes when necessary.

The below excel sheet has a list of data, consisting of Student details, Faculty details, Course details, Class details and Registration details.

![](media/image2.emf)

Double click the icon of excel to open it.

[Note:]{.ul}

For all addresses, in this assignment and future assignments, use the following format unless specifically indicated otherwise:

address_line1, address_line2, city, state_or_region, postal_code, country

**To submit your assignment, you are responsible for the following.**

-   Rename this given file with your Lastname_Assignment02.

-   Include 3NF normalized excel sheet. Consider one tab in excel sheet as a table. Highlight the primary key attribute cell in yellow color \_\_\_\_ and foreign keys in \_\_\_\_.

-   Design and draw the ER diagram with all normalized entities and relationships and submit it via Screenshot from Lucid chart, ERD plus, or other diagramming tools. Clearly show key attributes, including primary keys and foreign keys, and the relationships between the entities.

Note:

-   Do not introduce new surrogate keys as primary keys in the entities in your solution.

-   Do not include any composite keys in your solution.

Attach the excel sheet and diagram screenshot separately in your submission. For the diagram, make sure to add enough of your desktop to show the screen is running in your laptop (for example, a command prompt window with your SID in command line).
