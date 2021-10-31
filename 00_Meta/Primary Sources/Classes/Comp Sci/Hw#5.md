**CSIS 44-345 [[Computer]] Organization Spring 2020**

**Hw #5: 25 points**

**Due Date: Monday 30^th^ March, 11:59 PM (Zip File with all files)**

There is no need to use the Raspberry Pi. Just type the ARM assembly code in a word document. Zip both exercises and submit via Canvas.

Name the Zip File: LastName_Hw5

**Ex#1: Name the file ex1.s**

Write an ARM assembly language program to translate the following sequence of statements . Assume x and y are memory locations that store two unsigned integers. Use the following: **x** is in **R1**, **y** is in **R2,** and **z** in **R3**. Make sure that your program works for any value of x and y.

if (x \> 15)

{

x = 1;

if (y \> 15) {

y = 2;

}

else {

y = y + 2;

}

}

else {

x = x + 1;

}

z = x + y;

**Ex#2: Name the file ex2.s**

Suppose **R1** contains an integer value** x**, and** R2 **contains an integer value **y** that is greater than 0. Write **an ARM assembly** language program that stores in** R0** the value of **x^y^** that is,** R1** raised to the positive power found in **R2.**

Choose the values of x = 2 and y = 6. The result should be **2^6^** = 64.
