Ex#1 (7.5 pts)

Assume that R1 = 1024 (decimal) and R2 = 16 (decimal), answer the following questions.

After each of the following instruction is executed

1.  In decimal, what is the memory location in decimal loaded into the register R0?

2.  In decimal, what is the value of R1?

```{=html}
<!-- -->
```
a.  LDR R0, \[R1\] R0 = Memory Location\[1024\] and R1 = 1024

b.  LDR R0, \[R1, \#4\] R0 = Memory Location\[1028\] and R1 = 1024

c.  LDR R0, \[R1\], \#-8 R0 = Memory Location\[1024\] and R1 = 1016

d.  LDR R0, \[R1, R2\] R0 = Memory Location\[1040\] and R1 = 1024

e.  LDR R0, \[R1, \#20\]! R0 = Memory Location\[1044\] and R1 = 1044

Ex#2 (5 pts)

Match the following instructions with the most appropriate addressing modes.

SUB R0, R1, \#15 Immediate

ADD R0, R1, R2 Register

STR R0, \[R1\] Indirect

LDR R0, \[R1, \#4\] pre-indexing

LDR R0, \[R1\], \# 4 post-indexing

Ex#3 (3 pts)

What are the three registers used in invoking functions, calls and returns.

PC, LR and SP,

Ex#4 (2.5 pts)

Adding the name of the function, type of the functions, and it paramerters before the main function is referred to as:

A.  void function

B.  prototype

C.  \<stdio.h>

D.  scanf( )

.

Ex#5 (2 pts)

Given the following code fragment:

int grades\[ \] = {90, 86, 67};

char courseName \[ \] = "44-345";

int size1 = sizeof(grades)/sizeof(int);

int size2 = sizeof(coursesName)/sizeof(char);

printf(\"The number of elements in size1 and size2 are: %d\\n %d\\n\", size1, size2);

The number of elements in size1 and size2 are: 4 6

The number of elements in size1 and size2 are: 3 6

The number of elements in size1 and size2 are: 4 7

The number of elements in size1 and size2 are: 3 7
