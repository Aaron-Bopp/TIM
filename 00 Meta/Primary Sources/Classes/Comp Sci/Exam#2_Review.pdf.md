> Exam#2 Review.

1.  Given an ARM instruction such as ADD, MOV, SUB with the format and representation of the instruction, you should be able to write the machine code in binary and hexadecimal.

    a.  Rd = register destination, Rs register source, operand2 can be register or immediate

    b.  Cond, 0, immediate, opcode, status register, RS, Rd, operand2

    c.  1110,00,I,opcode,1,Rs,Rd,Operand2

    d.  Add: 0100, sub:0010, mov 1101

2.  Given an ARM assembly code fragment, you should be able to trace it and give the contents of registers. The code includes the main instructions such as arithmetic, branches, and comparison instructions.

3.  Given a problem statement, you should be able to come with the corresponding ARM assembly program. For example, find the max.

.data

nums: .skip 32

.text

main: push{lr}

ldr r0, =nums

mov r1, \#0

ldr r2, \[r0\]

b loop

loop: cmp r1, \#8

bge done

add r1, r1, \#1

add r0, r0, \#4

cmp r2, \[r0\]

blt max

b loop

max: ldr, r2, \[r0\]

b loop

done: pop{lr}

bx lr

4.  Given the values of a set registers, you should be able to perform the bit-operations such as AND, XOR, BIC, LSL, LSR. Also, you should know how these instructions work.

> ![](media/image1.png){width="4.052083333333333in" height="2.3229166666666665in"}

5.  Given an arithmetic expression such R0 = 33 \* R0, you should be able to write a single ARM instruction to store 33 \* R0.

> mov r1, \#33
>
> mul r0, r0, r1

6.  Given an ARM assembly code fragment with some memory locations, you should be able to find the values of LR and PC.

7.  Different addressing modes, same type of exercises as quiz#4 and Hw#6

> ![](media/image2.png){width="3.46875in" height="2.5634175415573055in"}

a.  LDR R0, \[R1, \#8\] @ R0 = Memory Location \[0x2102C\], R1 = 0x21024

b.  LDR R0, \[R1\], \#-4 @ R0 = Memory Location \[0x21024\], R1 = 0x21020

c.  LDR R0, \[R1, \#12\]! @ R0 = Memory Location \[0x2102C\], R1 = 0x2102C

d.  LDR R0, \[R1, R2\] @ R0 = Memory Location \[0x21034\], R1 = 0x2102C

e.  LDR R0, \[R1\], R2 @ R0 = Memory Location \[0x21034\], R1 = 0x21034

f.  LDR R0, \[R1, R2\]! @ R0 = Memory Location \[0x2103C\], R1 = 0x2103c

g.  LDR R0, \[R1, R2, LSL \#3\] @ R0 = Memory Location \[0x2107C\], R1 = 0x2103c

    a.  R0 = r1 + r2\*2\^3

    b.  R0 = 0x2103c + 8\*2\^3

h.  LDR R0, \[R1\], R2, LSR \#1 @ R0 = Memory Location \[0x2103c\], R1 = 0x21040

    a.  R0 = r1

    b.  R1 = r1 + r2/2

    c.  R1 = 0x2103c + 8/2

i.  LDR R0, \[R1, R2, LSL \#2\]! @ R0 = Memory Location \[0x2105C\], R1 = 0x21040

    a.  R0 = r1 + r2\*2\^2

    b.  R0 = 0x21040 + 8\*4

j.  SUB R0, R1, \#15 Immediate

k.  ADD R0, R1, R2 Register

l.  STR R0, \[R1\] Indirect

m.  LDR R0, \[R1, \#4\] pre-indexing

n.  LDR R0, \[R1\], \# 4 post-indexing

```{=html}
<!-- -->
```
8.  The above are the main concepts that cover exam#2. However, other related questions to the course might be asked.

9.  There will be NO questions on C, but they will be in the [[Final Exam]].
