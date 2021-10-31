Pratice#2 Solution

Ex#1.

Translate the following fragment of code into ARM assembly Language and comment each line of your code.

int x= 11;

int y = 22

int z= 0;

z =x + y ;

Use the following pseudo-code

1.  Load the address of x into r1

2.  Get the value of x into r0

3.  Load the address of y into r1

4.  Get the value of y into r2

5.  Add r0 and r2 and store the value into r0

6.  Load the address of z into r1

7.  Store r0 into z

8.  Use echo \$? to display the value of z, which is 33

Sol:

.global main

.test

main:

push {lr}

ldr r1,=x

ldr r0,\[r1\]

ldr r1,=y

ldr r2,\[r1\]

add r0,r0,r2

ldr r2,=z

str r0,\[r2\]

bx lr

.data

. balign 4

x: . word 10

y: . word 15

z: . word

Ex#2:

Let assume that the variable hexval has been initialized using the following directive

.data

Hexval: .word 0xAABBCCDD

1.  Using LDRB instruction, write a program to load the value of hexval into register r0. (Show the result using echo \$?)

2.  Add the value 5 to r0 and save it into the memory location hexval5. (Show the result using excho \$?)

3.  Using STRB, store r0 in hexval5

Sol:

.global main

.text

main:

push {lr}

ldr r1,=hexval

ldrb r0,\[r1\]

add r0,r0,#5

ldr r1,=hexval5

strb r0,\[r1\]

bx lr

.data

.balign 4

hexval: .word 0XAABBCCDD

.balign 4

Hexval5: .byte
