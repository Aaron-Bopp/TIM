# Introduction to Using SQL\*PLUS and SQL Developer (12c)

## Using SQL\*Plus

-   Open command prompt and enter the below command to open SQLPLUS prompt

**SQLPLUS sys as sysdba**

Enter the default password **Oracle_1**.

Show pdb

Note: If you had chosen a different administrative password during installation, replace Oracle_1 with the appropriate password in the command.

Now you have logged into database as sys user with sysdba permissions.

-   After logging in, you have to check the pluggable databases(PDB) that are present and verify the openmode / state of those pdbs. To view that information, enter the below command.

**Show pdbs;**

![](media/image1.png){width="5.541666666666667in" height="0.9270833333333334in"}

In the above image, you can observe that ORCLPDB is not opened and is in mounted state.

For some, the PDB might be PDBORCL. If the PDB is in mounted state, follow the below steps.

-   Before opening the database, we must change our session to that particular container. To change the session enter the below command

**Alter session set container=ORCLPDB;**

![](media/image2.png){width="3.6354166666666665in" height="0.5416666666666666in"}

-   Now Open the database by entering below command

**ALTER PLUGGABLE DATABASE OPEN;**

Enter the show pdbs command to check whether the open mode has changed to READ WRITE.

![](media/image3.png){width="5.510416666666667in" height="1.375in"}

If your PDB is already open, you may get an error -- it is fine.

**Creating a User and granting permissions:**

-   To create a user, enter the below command:

**CREATE USER \<username> IDENTIFIED BY \<Password>;**

Replace the username and password with your own.

Example: **CREATE USER adbstudent IDENTIFIED BY adb12345;**

![](media/image4.png){width="4.239583333333333in" height="0.4895833333333333in"}

-   Now let us grant permissions to this user. You can grant roles and privileges to the user.

To know the roles and privileges that you can grant to a user visit the below link:

<https://docs.oracle.com/cd/A97630_01/server.920/a96521/privs.htm>

Here let us grant Connect, Resource, DBA roles to the user we have created earlier.

Enter the below command to grant roles to the user:

![](media/image5.png){width="4.09375in" height="0.59375in"}

Learn the operations that a user can perform if user is granted the above permissions.

-   Check whether the above user can connect to database, enter the below command:

> **Connect \<Username>/\<Password>@\<PDBname>**

![](media/image6.png){width="3.4791666666666665in" height="0.375in"}

-   You can enter [[SQL]] statements directly in SQL\*Plus. Be sure to start each phrase of the [[SQL]] statement on a new line, as shown here, and terminate each statement with a semicolon.

Example -- type this statement to see all the tables for this user account:

> **SELECT table_name from user_tables;**
>
> As there are no tables created as of now, result will be shown as no rows selected.

-   Now let us create a sample table named modules which has moduleID as primary key and modulename.

**Create table modules(moduleID number primary key,modulename varchar(20));**

After the table is created, you can view tablename in user_tables.

![](media/image7.png){width="6.5in" height="1.26875in"}

## 

## Using SQL Developer:

You can also run scripts and execute [[SQL]] statements directly in [[SQL]] Developer.

-   Now, create a connection for the user to the pluggable database created earlier. Add a new connection, enter the following and click test.

If **Status** (in the lower left-hand corner) is listed as **Success**, click on **Connect**.

![](media/image8.png){width="6.479166666666667in" height="3.3645833333333335in"}

-   Verify the connection name by typing the following command and running in the window:

**Show con_name;**

![](media/image9.png){width="6.5in" height="2.451388888888889in"}

-   You can view the tables that are created by the user by expanding the connection that we have created in the connection window on [[the left]] side.

![](media/image10.png){width="2.90625in" height="2.6041666666666665in"}

## Using Scripts:

A script is a collection of one or more [[SQL]] statements that you want to execute together.

Open Notepad and enter the below statement in it and save the file with .sql extension.

![](media/image11.png){width="5.364583333333333in" height="3.6145833333333335in"}

After establishing a connection, click on File and select Open to open a [[sql]] script file.

![](media/image12.png){width="5.635416666666667in" height="2.4270833333333335in"}

Select the script you created earlier, and run it by pressing **F5**, or press the **Run Script** button.

![](media/image13.png){width="6.5in" height="2.310416666666667in"}

NOTE: If you edit the script file and click on the Save icon the changes are reflected in the original script file.
