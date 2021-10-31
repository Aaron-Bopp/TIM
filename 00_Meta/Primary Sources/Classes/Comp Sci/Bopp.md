a.  LDR R0, \[R1, \#8\] @ R0 = Memory Location \[0x2102C\], R1 = 0x21024

b.  LDR R0, \[R1\], \#-4 @ R0 = Memory Location \[0x21024\], R1 = 0x21020

c.  LDR R0, \[R1, \#12\]! @ R0 = Memory Location \[0x2102C\], R1 = 0x2102C

R0= Memory Location \[0x21030\], R1 = 0x21030 -1

d.  LDR R0, \[R1, R2\] @ R0 = Memory Location \[0x21034\], R1 = 0x2102C

> R0= Memory Location \[0x2102C\], R1 = 0x21024 -1

e.  LDR R0, \[R1\], R2 @ R0 = Memory Location \[0x21034\], R1 = 0x21034

> R0= Memory Location \[0x21024\], R1 = 0x2102C -1

f.  LDR R0, \[R1, R2\]! @ R0 = Memory Location \[0x2103C\], R1 = 0x2103c

> R0= Memory Location \[0x2102C\], R1 = 0x2102C -1

g.  LDR R0, \[R1, R2, LSL \#3\] @ R0 = Memory Location \[0x2107C\], R1 = 0x2103c

> R0= Memory Location \[0x21088\], R1 = 0x21024 -1

a.  R0 = r1 + r2\*2\^3

b.  R0 = 0x2103c + 8\*2\^3

```{=html}
<!-- -->
```
h.  LDR R0, \[R1\], R2, LSR \#1 @ R0 = Memory Location \[0x2103c\], R1 = 0x21040

> \@R0= Memory Location \[0x21024\], R1 = 0x21032 -1

a.  R0 = r1

b.  R1 = r1 + r2/2

c.  R1 = 0x2103c + 8/2

```{=html}
<!-- -->
```
i.  LDR R0, \[R1, R2, LSL \#2\]! @ R0 = Memory Location \[0x2105C\], R1 = 0x21040

R0= Memory Location \[0x21056\], R1 = 0x21056 -1

a.  R0 = r1 + r2\*2\^2

b.  R0 = 0x21040 + 8\*4

Ex 2:

Main:

mov r0, \#5 \@0x21024

mov r1, \#10 \@0x21028

bl mult \@0x2102C LR:0x21030 PC:0x24096

mov r3, r2 \@0x21030

mult:

add r0, r0, r1 \@0x24096

bx lr \@0x2409A LR:0x21030 PC:0x21030

pc for callee is 2409a

Ex 3: - Good
