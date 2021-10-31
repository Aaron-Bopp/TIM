**44-460/660 Database Systems Name: [Aaron Bopp]{.ul}**

**Spring 2020 Exam 2 Take Home S#: 533127**

**65 Points 8am 9:30 2pm**

Transform the ER model below into a set of 3NF relations. Use the format shown here for relations:

FACULTY ([FacID]{.ul}, LastName, FirstName, Rank, DeptID)

FK DeptID DEPT

DEPT ([DeptID]{.ul}, DeptName, DeptPhone)

You must underline all components of each primary key. Denote each foreign key directly beneath the relation that contains the foreign key, as shown above. Do *not* use the graphical notation from the textbook. The notation shown above is the notation you are required to use. Be sure that all relations are in 3NF.

![](media/image1.png){width="8.137315179352582in" height="5.935064523184602in"}

BUILDING ([BuildingID**,**]{.ul} Name, SquareFeet, Rooms, Rent, Street, City, State, Zip, BuildingType?)

APARTMENT ([ApartmentID]{.ul}, NumOfBedrooms, NumOfBathrooms)

FK ApartmentID -\>BUILDING

GYM ([GymID, MembershipCost]{.ul})

FK GymID -\>BUILDING

GYM_EQUIPMENT ([GymID]{.ul}, [Equipment]{.ul})

FK GymID -\>GYM

STORE ([StoreID, Dept]{.ul})

FK StoreID -\>BUILDING

STORE_DEPARTMENT ([StoreID]{.ul}, [Dept]{.ul})

FK StoreID -\>STORE

RENT ([BuildingID, DepartmentID,]{.ul} DateRented, Duration)

FK BuildingID -\>BUILDING

DepartmentID -\>DEPARTMENT

DEPARTMENT ([DepartmentID]{.ul}, Name, Location, Email, phoneNumber, DepartmentHead)

OFFICE ([OfficeID,]{.ul} DepartmentID[,]{.ul} ExtensionNumber)

FK DepartmentID -\>DEPARTMENT

CONSTRUCT ([BuildingID,]{.ul} [OrganizationID,]{.ul} [DateConstructionStarted]{.ul})

FK BuildingID -\>BUILDING

OrganizationID -\>ORGANIZATION

ORGANIZATION ([OrganizationID]{.ul}, Name, NameBranches, AcquiredID)

FK AcquiredID -\>ORGANIZATION
