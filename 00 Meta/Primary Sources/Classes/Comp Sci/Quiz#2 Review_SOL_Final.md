> Quiz \#2 Review

1.  What is the [[purpose]] of ls, cd, mkdir, as, gcc, echo\$?, etc.

> Possible Sol: ls -l To list the files in a directory with all related information such creation time, permission, size, etc
>
> cd: To change the directory. Example cd ARM
>
> as: Assemble an assembly program. Ex: as -g -o file.o file.s
>
> gcc: Link the program. Ex: gcc -o file file.o
>
> echo \$? Print the content of register r0, only the least significant byte.

2.  How many registers are there in the ARM's CPU?

> Sol: 16 integer registers

3.  How many registers are general [[purpose]] registers?

> Sol: 12 general [[purpose]] registers (r0 -- r12)

4.  Name the register that keeps track of the next instruction to be executed

Sol: r15 (Program Counter Register)

5.  Write the instruction that stores 53 in decimal into register r0

Sol: mov r0, \#53

6.  Write the instruction that stores 35 in hex into register r1

Sol: mov r1,#0x35

7.  Write the ARM instructions to perform the operation 16 + 10 -- 2\*5

> Sol: mov r1, \#16
>
> add r1, r1, \#10
>
> mov r2, \#2
>
> mov r3, \#5
>
> mul r0, r2,r3
>
> sub r0, r1,r0

8.  Write the ARM assembly program of the following fragment of high-level language

    a.  int a = 111;

    b.  int b = 222

    c.  c= a + b;

> Sol: . global main
>
> .func main
>
> .data
>
> .balign 4
>
> a: . word 111
>
> b: . word 222
>
> c: . word
>
> .text
>
> main:
>
> ldr r1, =a
>
> ldr r1,\[ r1\]
>
> ldr r2,=b
>
> ldr r2, \[r2\]
>
> ldr r3,=c
>
> add r0, r1,r2
>
> str r0,\[r3\]

9.  Assume x is a variable has been initialized with value 0x1A2B3C4D

> Given a layout of a memory with addresses, show how x is stored in the memory using little endian and big-endian representations
>
> Big Endian:
>
> 0x21040 0x21041 0x21042 0x21043

  ------------------------------------------------------------------------
  1A               2B               3C                  4D
  ---------------- ---------------- ------------------- ------------------

  ------------------------------------------------------------------------

> Little Endian:

  ------------------------------------------------------------------------
  4D               3C               2B                  1A
  ---------------- ---------------- ------------------- ------------------

  ------------------------------------------------------------------------

10. LDR and STR question:

Given a memory layout with addresses and the values of some initialed registers and memory locations. You should be able to show the contents of the registers after the executions of LDR and STR instructions. (Same process that we used in class).

Assuming big endien and x is stored as shown below . Show the contents of registers after execution of LDR

Let x= 0x1A2B3C4D at memory location 0x12400

ldr r1,=x

r1:

  -----------------------------------------------------------------------
  0x12400
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

ldr r0, \[r1\]

r0:

  -----------------------------------------------------------------------
  0x1A2B3C4D
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

Memory

  -----------------------------------------------------------------------
  0x12400          1A           2B            3C            4D
  ---------------- ------------ ------------- ------------- -------------
  0x12404 

  0x12408 

  0x1241C 
  -----------------------------------------------------------------------

11. Assuming y is stored as shown below. Show the contents of registers after execution of STR. Let y is stored at memory location 0x12400 and initialed to 0xAABBCCDD. Assuming big endian.

ldr r2, =y

r2:

  -----------------------------------------------------------------------
  0X12400
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

mov r0, \#0x1A2B3C4D

r0:

  -----------------------------------------------------------------------
  0x1A2B3C4D
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

Str r0, \[r2\]

Memory

+---------------+------------+-------------+-------------+-------------+
| 0x12400       | AA         | BB          | CC          | DD          |
|               |            |             |             |             |
|               | 1A         | 2B          | 3C          | 4D          |
+===============+============+=============+=============+=============+
| 0x12404       |            |             |             |             |
+---------------+------------+-------------+-------------+-------------+
| 0x12408       |            |             |             |             |
+---------------+------------+-------------+-------------+-------------+
| 0x1241C       |            |             |             |             |
+---------------+------------+-------------+-------------+-------------+

Y:

  -----------------------------------------------------------------------
  1A2B3C4D
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
