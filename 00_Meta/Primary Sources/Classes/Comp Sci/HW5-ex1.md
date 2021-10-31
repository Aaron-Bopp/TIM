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
