**44-460 Database Systems**

**Worksheet Chapter3C**

**Use the same notation as in the textbook for this exercise.**

Draw an E-R diagram to model the following situation. Your E-R diagram must include subtype discriminators for all supertype entities. State any additional assumption you make.

**Mountain View Community Hospital**

As a large service organization, Mountain View Community Hospital (MVCH) depends on four major groups of persons for its continued success: employees, physicians, patients, volunteers. A small number of persons in the hospital community do not belong to any of these four groups. A particular person may belong to two (or more) of these groups at a given time. For example, a volunteer or employee may also be a [[patient]] at the hospital at some point in time.

The four groups of people listed previously share many common characteristics such as a unique identifier, Name, Address, City/State/Zip, Birth Date, and Phone. Then there are characteristics that apply to only one of these groups. For example, a hire date (Date Hired) is recorded for employees only. Volunteer Services records the skills of its volunteers in order to place them appropriately. Physicians have a pager number (Pager#) and a Specialty. For patients, the hospital records the date of first contact with the hospital (Contact Date).

At MVCH, each [[patient]] has one (and only one) physician responsible for that [[patient]]. A given physician may not be responsible for a [[patient]] at a given time or may be responsible for one or more patients. A [[patient]] can be only one of two types: resident [[patient]] or outpatient. Each outpatient is scheduled for zero or more visits. A visit has a unique identifier (Date) and Comments. Notice that an instance of visit cannot exist without an outpatient owner entity. Some patients that are seen as outpatients, for example, in the emergency room, are subsequently admitted to the hospital and become resident patients. Each resident [[patient]] has a Date Admitted attribute.

Employees fall into three categories: nurses, technicians, and staff. Nurses are assigned to one (and only one) care center at a time. One of the nurses assigned to a care center is appointed nurse-in-charge (Nurse In Charge). A care center has Name and a Location.

Each technician has a skill attribute and may have more than one skill. Also, each technician is assigned to one or more laboratories. Each laboratory has a Name and Location.

Staff members have a job classification (Job Class), such as secretary, administrative assistant, admitting specialist, collection specialist, and so on.

In addition to nurses, a care center also might have many beds or no beds assigned to it. The only attribute of bed is the identifier Bed ID, which consists of two components: Bed# and Room#. Each resident [[patient]] must be assigned to a bed. Because MVCH doesn't always fill all its beds, a bed may or may not have a resident [[patient]] assigned to it at a given time.

In addition:

-   A visit is always with a single [[patient]].

-   Add an entity named RN Certificate, which has attributes certificate number (identifier) and date granted. A nurse has at most one RN certificate. A specific RN certificate is awarded to a single nurse.
