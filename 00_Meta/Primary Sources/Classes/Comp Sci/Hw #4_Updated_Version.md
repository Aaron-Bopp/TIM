**CSIS 44-345 [[Computer]] Organization Spring 2020**

**Hw #4: 25 points (updates)**

**Due Date: Wednesday 25^h^ March, 11:59 PM (Zip File with all files)**

**For any clarifications or questions, e-mail to your TA and cc me.**

**Deliverables:** Refer to the label What to Submit.

**Ex#1**

2 .global main

3 .func main

4 .data

5 .balign 4

6 mess: .asciz \"?\"

7 a: .word ?

8 b: .word ?

9 result: .word 0

10

11 .text

12 main:

13 push {lr}

14 ldr r0,=mess \@r0 gets address of mess

15 ldr r1,=a \@r1 gets address of a

16 ldr r2,=b \@r2 gets the address of b

17 ldr r1,\[r1\] \@r1 gets the value of a

18 ldr r2,\[r2\] \@r2 gets the value of b

19 add r0,r1,r2 \@add the value of a and b

20 ldr r1, =result \@r1 gets the address of result

21 str r0,\[r1\] \@result gets a+b

23 bx lr

1.  The address of the variable mess is 0x21024

2.  The address of the variable a is: 0x2104a

3.  The address of the variable b is 0x2104e

4.  The address of the variable result is 0x21052

Given the following memory dump, What is the message stored in the variable mess. \[6 pts\]

0x21024: 0x54 0x68 0x61 0x74 0x20 0x77 0x68 0x61

0x2102c: 0x74 0x20 0x69 0x73 0x20 0x77 0x68 0x69

0x21034: 0x63 0x68 0x20 0x61 0x6e 0x64 0x20 0x77

0x2103c: 0x68 0x69 0x63 0x68 0x20 0x69 0x73 0x20

0x21044: 0x77 0x68 0x61 0x74 0x3f 0x00 0xd3 0xff

0x2104c: 0xff 0xff 0x20 0x00 0x00 0x00 0xf3 0xff

0x21054: 0xff 0xff

1.  What is the value in decimal of the variable a? (Show your work for full credit) \[3pt\]

2.  What is the value in decimal of the variable b? (Show your work for full credit) \[3pt\]

3.  What is the value in decimal of the variable result? (Show your work for full credit) \[3 pt\]

> What to Submit: A word doc named "Hw4ex1.docx"

**Ex#2**

A.  Given the following machine code image in hex, translate each line of the machine language code into the appropriate ARM Assembly instruction. (Refer to your lecture notes 4.3 Representing instruction in a [[computer]]). Add your assembly code to the following template and test it.

Opcodes:

Add: 0100

Sub: 0010

Mov: 1101

Mul: 0000

> .global main
>
> .func main
>
> .text
>
> main:
>
> push {lr}
>
> Add your Instructions corresponding to the following machine code

e3 a0 60 2f

1110 0011 1010 0000 0110 0000 0010 1111

e2 46 40 01

1110 0010 0100 0110 0100 0000 0000 0001

e2 86 50 18

1110 0010 1000 0110 0101 0000 0001 1000

e0 06 05 94

1110 0000 0000 0110 0000 1001 1001 0100

Mul r6, r4, r9

e2 46 50 ba

1110 0010 0100 0110 0101 0000 1101 1100

Sub r5, r6, 220

e1 a0 70 06

1110 0001 1010 0000 0111 0000 0000 0110

Mov r7, r0, r6

bx lr

> What to Submit: "hw4ex2.docx"
