**[44-560 Advanced Topics in Database Systems]{.ul}**

**[Assignment-05: Query Optimization]{.ul}**

Solve the given problems in this worksheet using the following database

![A close up of a map Description automatically generated](media/image1.jpeg){width="6.5in" height="4.172916666666667in"}

The above ER diagram is the assumed database design of an electronics store like BestBuy, Walmart, etc., representing Point-of-Sale transactions at a store by a customer buying electronic devices. The customer table contains the registered customers for the company. There will be thousands of transactions occurring in an hour across all the stores in the USA. The data management design must be optimized to make the transactions fast and efficient. There are two access plans given below where it varies in the approach of the execution of the same query. You will need to calculate the cost for both access plans and compare with each other.

Assume that

-   The Electronics table has 70,000 rows.

-   The Customer table has 10,000 rows.

-   The Transaction table has 3,000,000 rows.

-   The Transaction Type table has 10 rows.

-   The transaction date \'06-07-2018\' shows up in 500 rows of the Transaction table.

-   Electronics with Device Name 'iPhone' shows up in 30000 rows of the Transaction table.

-   Customer '111345' shows up in 500 rows of the Transaction table

-   Transaction type 'CASH' shows up in 800 rows of the Transaction table.

-   Transaction type 'CREDIT-CARD' shows up in 900 rows of the Transaction table.

1)  Consider the following query:

> SELECT CUSTOMER.customerID, CUSTOMER.firstName, CUSTOMER.lastName, TRANSACTION.storeId, TRANSACTION.date, TRANSACTION.transactionType
>
> FROM CUSTOMER, TRANSACTION
>
> WHERE CUSTOMER.customerID = TRANSACTION.customerID
>
> AND TRANSACTION.date = \'06-07-2018\';

Below are two access plans for executing this query. Fill in the missing information in the last four columns. Assume that the cost for each I/O operation is 1.

> Plan A:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Step**   **Operation**                                                **I/O Operations**               **I/O Cost**   **Resulting Rows**   **Total I/O Cost**
  ---------- ------------------------------------------------------------ -------------------------------- -------------- -------------------- --------------------
  A1         Cartesian product (CUSTOMER, TRANSACTION)                    10,000 + 3,000,000 = 3,010,000   3,010,000      30,000,000,000       3,010,000

  A2         Select rows from A1 with matching customerID                 30,000,000,000                   3,010,000      10,000               30,003,010,000

  A3         Select rows from A2 with Transaction.date = \'06-07-2018\'   10,000                           10,000         500                  30,003,020,000
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

> Plan B:

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Step**   **Operation**                                                         **I/O Operations**   **I/O Cost**   **Resulting Rows**   **Total I/O Cost**
  ---------- --------------------------------------------------------------------- -------------------- -------------- -------------------- --------------------
  B1         Select rows from Transaction with Transaction.date = \'06-07-2018\'   3,000,000            3,000,000      500                  3,000,000

  B2         Cartesian product (B1, CUSTOMER)                                      500+10,000           10,500         5,000,000            3,910,500

  B3         Select rows in B2 with matching customerID                            5,000,000            5,000,000      10,000               8,910,500
  --------------------------------------------------------------------------------------------------------------------------------------------------------------

2)  Which plan is better between the two plans in question 1? And why?

> Plan b has a lower overall I/O cost for entire query so it is better

3)  Consider the following query:

> SELECT TRANSACTION.transactionType, TRANSACTION.date, Electronics.deviceName,
>
> FROM TRANSACTION, ELECTRONICS
>
> WHERE TRANSACTION.modelID = Electronics.modelID
>
> AND TRANSACTION.transactionType = 'CASH';
>
> Below are two access plans for executing this query. Fill in the missing information in the last four columns. Again assume that the cost for each I/O operation is 1.
>
> Plan A:

-   The Electronics table has 70,000 rows.

-   The Customer table has 10,000 rows.

-   The Transaction table has 3,000,000 rows.

-   The Transaction Type table has 10 rows.

-   The transaction date \'06-07-2018\' shows up in 500 rows of the Transaction table.

-   Electronics with Device Name 'iPhone' shows up in 30000 rows of the Transaction table.

-   Customer '111345' shows up in 500 rows of the Transaction table

-   Transaction type 'CASH' shows up in 800 rows of the Transaction table.

-   Transaction type 'CREDIT-CARD' shows up in 900 rows of the Transaction table.

  ----------------------------------------------------------------------------------------------------------------------------------
  Step   Operation                                           I/O Operations    I/O Cost          Resulting Rows    Total I/O Cost
  ------ --------------------------------------------------- ----------------- ----------------- ----------------- -----------------
  A1     Cartesian product (TRANSACTION, ELECTRONICS)        3,070,000         3,070,000         210,000,000,000   3,070,000

  A2     Select rows from A1 with matching modelID's         210,000,000,000   210,000,000,000   70,000            210,003,070,000

  A3     Select rows from A2 with transactionType = 'CASH'   3,000,000         3,000,000         800               210,006,070,000
  ----------------------------------------------------------------------------------------------------------------------------------

Plan B:

  ----------------------------------------------------------------------------------------------------------------------------------
  Step   Operation                                                    I/O Operations   I/O Cost    Resulting Rows   Total I/O Cost
  ------ ------------------------------------------------------------ ---------------- ----------- ---------------- ----------------
  B1     Select rows from Transaction with transactionType = 'CASH'   3,000,000        3,000,000   800              3,000,000

  B2     Cartesian product (B1, ELECTRONICS)                          70,800           70,800      56,000,000       3,070,800

  B3     Select rows in B2 with matching modelID's                    70,000           70,000      800              3,140,800
  ----------------------------------------------------------------------------------------------------------------------------------

4)  Which plan is better between the two plans in question 3? And why?

**Plan b, less cost**

**Please submit this word document in submission without zipping the file with the naming convention as LastName_Assignment05.docx.**
