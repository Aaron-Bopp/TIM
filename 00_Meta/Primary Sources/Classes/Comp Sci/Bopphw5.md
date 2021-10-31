**Ex1.s**

main:

> cmp r1, #15
>
> blt elseX
>
> mov r1, #1
>
> cmp r2, #15
>
> blt elseY
>
> mov r2, #2
>
> b end

elseX:

add r1, r1, #1

b end

elseY:

add r2, r2, #2

end:

add r3, r1, r2

Missing ldr and str statements -3

Ex2.s

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

missing ldr statement -1.5
