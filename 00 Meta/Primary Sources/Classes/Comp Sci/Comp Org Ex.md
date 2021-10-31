Comp Org Ex#1

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

Ex#2

Main:

main:

mov r0, \#5 \@0x21024

mov r1, \#10 \@0x21028

bl mult \@0x2102C LR:0x21030 PC:0x24096

mov r3, r2 \@0x21030

mult:

add r0, r0, r1 \@0x24096

bx lr \@0x2409A LR:0x21030 PC:0x21030

  -------------------------------------------------------------------------
  Mov   IF    ID    EX    MEM   WB 
  ----- ----- ----- ----- ----- ----- ------- ----- ----- ----- ----- -----
  Sub         IF    ID    EX    MEM   WB      IF    ID    EX    MEM   WB

  b                 IF    ID    EX    stall   MEM   WB 

  Mov                     IF    ID 

  Mov                           IF 

        1     2     3     4     5     6       7     8     9     10    11
  -------------------------------------------------------------------------
