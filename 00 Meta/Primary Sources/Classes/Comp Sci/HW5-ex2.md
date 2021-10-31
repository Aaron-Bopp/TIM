**Ex2.s**

.global main

.func main

.text

main:

mov r1, #2

mov r2, #6

mov r3, #1

b while

while: cmp r3, r2

bgt end_while

mul r1, r1, r1

add r3, r3, #1

b while

end_while:

mov r0, r1

bx lr
