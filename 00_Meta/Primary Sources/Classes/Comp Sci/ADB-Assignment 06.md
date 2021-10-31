**[44-560 Advanced Topics in Database Systems]{.ul}**

**[Assignment-06: Distributed Databases]{.ul}**

1.  Consider the following partial distributed database schema for a library system that shares resources (much like our University library system):

  -----------------------------------------------------------------------
  Tables                  Fragments               Location
  ----------------------- ----------------------- -----------------------
  BOOK                    \-                      A

  BOOKCOPY                BOOKCPY_A\              A\
                          BOOKCPY_B               B

  REQUEST                 \-                      B

  LIBRARY                 \-                      B
  -----------------------------------------------------------------------

> For each of the following [[SQL]] transactions, identify the type of operation the distributed database must support (remote request, remote transaction, distributed transaction, distributed requests) and explain why you chose that type of operation.

a.  BEGIN;

> SELECT title
>
> FROM book
>
> WHERE isbn=\'0900542365\';
>
> COMMIT;
>
> remote request
>
> one site, one request

b.  BEGIN;

> SELECT isbn, COUNT(isbn)
>
> FROM bookcopy
>
> GROUP BY isbn;
>
> COMMIT;
>
> distributed requests
>
> bookcopy is multiple sites in one statement

c.  BEGIN;

> SELECT title, isbn, COUNT(isbn)
>
> FROM bookcopy, book
>
> WHERE bookcopy.isbn = book.isbn
>
> GROUP BY isbn,title;
>
> COMMIT;
>
> distributed requests
>
> bookcopy is multiple sites in one statement

d.  BEGIN;

> SELECT isbn FROM request;
>
> SELECT library_Name FROM library;
>
> COMMIT;
>
> remote transaction
>
> same site multiple requests

e.  BEGIN;

> INSERT INTO book VALUES ('1432436419\', \'MongoDB: The Definitive Guide: Powerful and Scalable Data Storage\');
>
> INSERT INTO request VALUES (\'1432436419\', \'B.D.OwensLibrary\', \'27-Sep-2020\');
>
> COMMIT;
>
> distributed transaction
>
> book and request is multiple sites but only one per statement

2.  Consider the following (partial) table of books:

  ------------------------------------------------------------------------------
  ASIN_ISBN    PUBLISHER              IS_FICTION   YEAR        PURCHASE_PRICE
  ------------ ---------------------- ------------ ----------- -----------------
  1491954461   OReilly                False        2019        33.49

  B004G606K8   OReilly                False        2020        37.99

  1848000693   Springer               False        2011        34.33

  0394820371   Bullseye Books         True         1988        7.89

  B00HTJTX1C   Tor Fantasy            True         1990        23.99

  B004G606K8   Wizards of the Coast   True         2010        7.99
  ------------------------------------------------------------------------------

a.  Show how to fragment the above data horizontally by whether it is fiction or not. Call the fragments FICTION and NONFICTION

b.  Fragment each of your fragments from part a by publisher. Name each of the new fragments using the existing fragment name, followed by an underscore, followed by the publisher's name.

```{=html}
<!-- -->
```
3.  Consider the following situation. A simplified procurement (relational) database has the following three relations:

> SUPPLIER (SUPPLIER_NUMBER, CITY) 50,000 records stored in Detroit
>
> PART (PART_NUMBER, COLOR) 350,000 records stored in Chicago
>
> SHIPMENT (SUPPLIER_NUMBER, PART_NUMBER) 2,500,000 records stored in Detroit

A query is made (in [[SQL]]) to list the supplier numbers for Cleveland suppliers of red parts:

SELECT SUPPLIER.SUPPLIER_NUMBER

FROM SUPPLIER, SHIPMENT, PART

WHERE SUPPLIER.CITY = 'Cleveland'

AND SHIPMENT.PART_NUMBER = PART.PART_NUMBER

AND SHIPMENT.SUPPLIER_NUMBER = SUPPLIER.SUPPLIER_NUMBER

AND PART.COLOR = 'RED';

> Each record in each relation is 300 characters long. There are 30 red parts, a history of 100,000 shipments from Cleveland, and a negligible query computation time compared with communication time. Also, there is a very old communication system with a very slow data transmission time of 8,000 characters per second- and two-seconds access delay to send a message from one node to another. Consider operating time to execute the query as 4 seconds. Assume the time taken to transfer the query results as negligible.

Determine the time to process this remote query assuming the following strategy:

**Move SUPPLIER relation to Chicago; then move SHIPMENT relation to Chicago; process whole query at Chicago [[computer]].**

Answer should be expressed in hours, with one decimal place.
