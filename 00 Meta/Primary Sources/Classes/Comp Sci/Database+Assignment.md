**Foundations of Computing**

**Database Assignment Answer**

Download the *Assignment Databases.accdb* file from the Foundations of Computing web site. This file contains three database tables and three queries. Use the *Assignment Databases.accdb* file to answer the following questions below.

**What To Turn In For This Database Assignment:**

-   Your answers typed in this Database Assignment Word document

-   The *Assignment Databases.accdb* with your two queries added.

1.  Open the Cars_Table.

    a.  How many records are in this table?

        i.  406

    b.  How many fields are in this table?

        i.  11

    c.  What is the datatype of the *Cylinders* field?

        i.  Number

    d.  What is the datatype of the *ID* field?

        i.  AutoNumber

    e.  What is the primary key for this database table?

        i.  ID Number

2.  Open the Cereal_Table

    a.  How many records are in this table?

        i.  77

    b.  How many fields are in this table?

        i.  16

    c.  Notice the data type for the *mfr* field is Short Text. What is the field size of the *mfr* field? (Hint look below in the metadata for the *mfr* field size)

        i.  255

    d.  Notice that the datatype for the *fat* field is Number. What is the field size of the *fat* field? (Hint look below in the metadata for the *fat* field size)

        i.  Long integer

    e.  What is the primary key for this database table?

        i.  the name of the cereal

3.  Open the Film_Table

    a.  How many records are in this table?

        i.  1659

    b.  How many fields are in this table?

        i.  10

    c.  Notice the data type for the *Title* field is Short Text. What is the field size of the *Title* field? (Hint look below in the metadata for the *Title* field size)

        i.  255

    d.  Notice that the datatype for the *Length* field is Number. What is the field size of the *Length* field? (Hint look below in the metadata for the *Length* field size)

        i.  Long Integer

    e.  What is the primary key for this database table?

        i.  ID

4.  Open the Query 1 query in Design View

    a.  From which table is this query pulling data?

        i.  Film Table

    b.  What are the names of the fields displayed in this query?

        i.  ID and Title

    c.  What is the condition that restricts which records are displayed in this query?

        i.  Subject contains Action or Comedy

    d.  How many records are displayed from this query in the Datasheet View?

        i.  590

5.  Open the Query 2 query in Design View

    a.  From which table is this query pulling data?

        i.  Cereal Table

    b.  What are the names of the fields displayed in this query?

        i.  name, calories, sugars, carbo

    c.  What is the condition that restricts which records are displayed in this query?

        i.  calories between 110 and 140

    d.  How many records are displayed from this query in the Datasheet View?

        i.  12

6.  Open the Query 3 in Design View

    a.  From which table is this query pulling data?

        i.  Film Table

    b.  What are the names of the fields displayed in this query?

        i.  Title and Awards

    c.  What is the condition that restricts which records are displayed in this query?

        i.  Films that have awards

    d.  How many records are displayed from this query in the Datasheet View? \\

        i.  163

7.  Using the Film_Table, create a query named "Film Query" that displays all film titles in which "Lancaster, Burt" or "Wayne, John" are listed as the actor, the Length of the film is > 50 and \< 90 and the Subject is either "Western" or "Drama". Display the Datasheet View of this query, copy all records listed in the Title field, and paste the Title field and the Titles of the films returned from this query into your assignment.

  -----------------------------------------------------------------------
  **Film_Table Query**
  -----------------------------------------------------------------------
  **Title**

  Lady for a Night

  Wheel of Fortune

  Seven Sinners

  Desert Trail, The

  Lady from Louisiana

  Control

  Allegheny Uprising

  Dakota

  Overland Stage Raiders

  Pals of the Saddle

  Criss Cross

  Dawn Rider, The

  Frontier Horizon

  Hell Town

  King of the Pecos

  Lawless Frontier

  Lawless Frontier, The

  Lawless Nineties, The

  Lucky Texan

  Neath the Arizona Skies

  Randy Rides Alone

  Range Feud

  Riders of Destiny
  -----------------------------------------------------------------------

8.  Using the Cereal_Table, create a query named Cereal Query that displays all the cereal names in which all calories > 100, sugars are > 5 and \< 11, vitamins = 100 and fibers = 1. Display the Datasheet View of this query, copy all records listed in the names field, and paste the name of the cereal returned from this query.

  -----------------------------------------------------------------------
  **Cereal_Table Query**
  -----------------------------------------------------------------------
  **name**

  Just Right Crunchy Nuggets
  -----------------------------------------------------------------------
