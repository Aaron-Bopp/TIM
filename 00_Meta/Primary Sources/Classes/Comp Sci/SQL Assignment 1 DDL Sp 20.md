**44-460/660 Database Systems**

**Spring 2020**

**SQL Assignment 01 -- Creating a Database and Tables -- 30 points**

**Overview of Assignment**

In this assignment you will write an [[SQL]] script that will create a database with five tables. In addition, you will use insert statements to add some initial records to the tables. For reference, use database scripts from the course site, Chapters 6 and 7 of your textbook, MySQL help menu, powerpoints from class, and online documentation. Note: some of the syntax in the slides may not work in MySQL, so double check the documentation as you go.

Follow the same instructions for formatting your solution file as in previous assignments. Be certain to include the following two lines at the top of your [[SQL]] assignment file.

**\-- [[SQL]] Assignment 01**

**\-- Your first and last name**

The text file must be named using your last name followed by your first initial followed by 01, with txt extension: SmithJ01.txt for example.

You should test your script periodically by running the source command.

**Instructions**

You have been chosen to create a database for the NFL (National Football League). You will be constructing five tables and loading a small amount of records into each of them. Your [[SQL]] statements will involve DDL (Data Definition Language) syntax, including data types, domain constraints, primary and foreign key designations, among others. Here are the relations you will use as input to build your tables:

TEAM(**[teamID]{.ul}**, name, city, state)

COACH(**[first]{.ul}**, **[last]{.ul}**, yearsExperience, currentTeam)

FK: currentTeam -\> TEAM

PLAYER(**[number]{.ul}**, [**team**,]{.ul} first, last, hometown, position)

FK: team -\> TEAM

GAME(**[team1]{.ul}, [team2]{.ul}, [dateOfGame]{.ul}**, winner)

FK: team1 -\> TEAM

team2 -\> TEAM

FRANCHISEHOLDER(**[franchiseHolderID]{.ul}**, team, number)

FK: team -\> TEAM

number, team -\> PLAYER

Here is some additional information regarding each table:

-   TEAM

    1.  "teamID" is an integer and should be automatically incremented each time a new record is inserted automatically.

    2.  "name" and "city" should be varying-size strings.

    3.  "state" will always be an abbreviation like "MO" or "CA".

    4.  The nfl will like to keep the "name" of the team unique- no copycats, no matter how jealous other teams may be!

-   COACH

    1.  "first" and "last" names should be varying-size strings.

    2.  "yearsExperience" should be an integer, at least zero, but no higher than 55. You will have to find out how to add a domain constraint to a column (Hint: check...).

-   PLAYER

    1.  "number" is an integer.

    2.  "first", "last", "position", and "hometown" should be varying-size strings. "first" and "last" should never be empty.

-   GAME

    1.  "team1" and "team2" are integers.

    2.  "dateOfGame" is of datetime type and has a default value of current_timestamp.

    3.  "winner" is an integer and should never be empty.

-   FRANCHISEHOLDER

    1.  "franchiseHolderID" is an integer and should automatically increment.

    2.  "team" is an integer and should never be empty. "team" should always be unique, i.e. teams can only have one franchise player.

    3.  "number" is an integer and should never be empty.

**Inserting Records**

1.  Add 3 records to TEAM. Only include values for "name", "city", and "state" ("teamid" will start at 1 and automatically increment).

2.  Add 3 records to PLAYER, one from each team.

3.  Add 3 records to COACH, one for each team.

4.  Add at least 1 record to GAME. The winner is up to you.

5.  Add 3 records to FRANCHISEHOLDER, one for each team.
