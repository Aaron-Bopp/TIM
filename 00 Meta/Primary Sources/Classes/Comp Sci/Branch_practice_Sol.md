![](media/image1.png){width="6.5in" height="3.75in"}

Solution:

.global main

.func main

.text

.data

x: .word 7

main:

ldr r1,=x

ldr r1,\[r1\] \@r1 gets 7

cmp r1,#9

bge else

@ X is less than 9

add r0,r1,#1

ldr r1,=x

str r0,\[r1\]

b end

else: mov r0,#0

ldr r1,=x

str r0,\[r1\]

end: bx lr
