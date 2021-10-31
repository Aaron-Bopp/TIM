**Computer Organization**

**Quiz \#3 Solution**

Translate the following code fragments into ARM assembly instructions. There is no need to write a complete program

R0 and R1 are ARM registers.

Ex\#1 **4 pts**

If (R1 \< 5)

R1 = R1 +1 ;

else R1 = 2  ;

Sol CMP R1, \#5

> BGE        else                 if BLT is used Check the statement sequences
>
> ADD R1, R1, \#1 
>
> B       continue 

     else                 MOV  R1 \#2 

         continue           \.....                                    OR continue bx  lr is acceptable

Ex\#2 **6 pts**

R0 = 10;

R1= 5;

while (R0 \> 0) {

R1= R1\*R0 ;

R0= R0 - 1;

}

Sol :

> MOV    R0, \#10 

                                MOV    R1, \#5 

LOOP                     CMP     R0, \#0 

                               BLE       Continue 

                              MUL     R1, R1, R0 

                               SUB      R0, R0, \#1 

                              B           LOOP 

Continue  \...\...                                              or continue  bx lr

Ex\#3 **6.25 pts (1.25 each)**

Given the following instructions (use matching)

R1 = 0xFFFF

AND R0, 0xC20C, 0xA15F

**1100 0010 0000 1100**

**[1010 0001 0101 1111]{.ul}**

**[1000 0000 0000 1100 800C]{.ul}**

ORR R0, 0xC20C, 0xA15F

**1100 0010 0000 1100**

**[1010 0001 0101 1111]{.ul}**

**[1110 0011 0101 1111]{.ul} E35F**

EOR R0, 0xC20C, 0xA15F

**1100 0010 0000 1100**

**[1010 0001 0101 1111]{.ul}**

**[0110 0011 0101 0011]{.ul} 6353**

BIC R0, R1, 0xA15F = AND R1 (NOT 0xA15F) R1 = 0xFFFF

**NOT(0xA15F) 0101 1110 1010 0000**

**1111 1111 1111 1111**

> **[0101 1110 1010 0000]{.ul}**

**[0101 1110 1010 0000]{.ul} 5EA0**

MOV R0, R1, LSL \#3 R1 = 0xFFFF

**R1\*8 1111 1111 1111 1111**

**R0** **[1111 1111 1111 1000]{.ul} FFF8**

Ex\#4 1.75 pts

Given the following instruction:

MOV R0, \#0x0A

Which of the following instructions invert ALL bits of R0.

A.  MVN R0, R0

B.  AND R0, R0

C.  ORR R0, R0

D.  XOR R0, R0

**0000 1010** R0 = \#0x0A

**1111 0101 (ALL BITS of R0 are inverted)**

Ex\#5. 2 pts

Given the following instruction:

MOV R0, \#0xAA

Which of the following instructions clear the four most significant bits (high bits)

A.  BIC R0, R0, \#0xF0 same as AND R0 (NOT \#0xF))

B.  AND R0, \#0xF0

C.  ORR R0, \#0xF0

D.  XOR R0, \#0xF0

\#0xF0: 1111 0000

NOT (\#0xF0) 0000 1111

R0 1010 1010

NOT (\#0xF0) 0000 1111

> \_ \_\_\_\_\_\_\_\_

AND 0000 1010
