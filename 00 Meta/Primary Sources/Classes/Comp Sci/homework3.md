**ex1.s**

.global main

.func main

.text

main:

mov r1, \#5 @ r1 \<- 5

mov r2, \#10 @ r2 \<- 10

mov r3, \#8 @ r3 \<- 8

add r0, r1, r2 @ r0 \<- 15

sub r0, r0, r3 @ r0 \<- 7

bx lr

**Output:**

pi\@abopp:\~/arm1 \$ echo \$?

7

**ex2.s**

.global main

.func main

.text

main:

mov r1, \#5 @ r1 \<- 5

mov r2, \#10 @ r2 \<- 10

mov r3, \#8 @ r3 \<- 8

mul r0, r1, r1 @ r0 \<- 25

mul r4, r2, r2 @ r4 \<- 100

mul r5, r3, r3 @ r5 \<- 64

add r0, r0, r4 @ r0 \<- 125

add r0, r0, r5 @ r0 \<- 189

bx lr

**Output:**

pi\@abopp:\~/arm1 \$ echo \$?

189

**ex3.s**

.global main

.func main

main:

mov r1, \#5 @ r1 \<- 5

mov r2, \#10 @ r2 \<- 10

mov r3, \#8 @ r3 \<- 8

add r4, r1, r2 @ r4 \<- 15

add r5, r1, r3 @ r5 \<- 13

mul r6, r4, r5 @ r6 \<- 195

mul r0, r6, r1 @ r0 \<- 975

bx lr

**Output:**

pi\@abopp:\~/arm1 \$ echo \$?

207

**ex4.s**

.global main

.func main

.text

main:

mov r1, \#5 @ r1 \<- 5

mov r2, \#10 @ r2 \<- 10

mov r3, \#8 @ r3 \<- 8

mov r4, \#16 @ r4 \<- 16

mul r5, r1, r1 @ r5 \<- 25

mul r6, r1, r1 @ r6 \<- 25

mul r7, r4, r2 @ r7 \<- 160

sub r0, r5, r6 @ r0 \<- 0

sub r0, r0, r7 @ r0 \<- -160

bx lr

**Output:**

pi\@abopp:\~/arm1 \$ echo \$?

96

**ex5.s**

.global main

.func main

.text

main:

push {lr}

ldr r0,=message1 \@r0 \<- memory address of the message

mov r1, \#18 @ r1 \<- 18

mov r2, \#0x56 @ r2 \<- 56

mov r3, \#0b01100001 \@r3 \<- 01100001

mov r4, \#0b0110000111010011 @ r4 \<- 0110000111010011

bl printf

mov r0, \#0 @ r0 \<- 0

pop {pc}

.data

message1: .asciz \"The value in decimal is %d\\nThe value in decimal of the hex number is %d\\nThe value in decimal of the binary number is %d\\nThe value in HEX of the binary number is %x\\n\"

**Output:**

pi\@abopp:\~/arm1 \$ ./ex5

The value in decimal is 18

The value in decimal of the hex number is 86

The value in decimal of the binary number is 97

The value in HEX of the binary number is b6d8a718
