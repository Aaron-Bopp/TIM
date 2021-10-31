**CSIS 44-345 [[Computer]] Organization Spring 2020**

**Hw#2 Due Date: Feb. 3, Class time (Hard Copy) 25 points**

**Different Representations of unsigned, signed integer numbers**

1.  Convert the following hexadecimal numbers to binary.

    a.  7C

Sol: [7]{.ul} [C]{.ul}

> 0111 1100

b.  4EDA

Sol: [4]{.ul} [E]{.ul} [D]{.ul} [A]{.ul}

> 0100 1110 1101 1010

c.  1403AB0C

Sol: [1]{.ul} [4]{.ul} [0]{.ul} [3]{.ul} [A]{.ul} [B]{.ul} [0]{.ul} [C]{.ul}

> 0001 0100 0000 0011 1010 1011 0000 1100

2\. Convert the following two's complement binary numbers to decimal.

a\) 1010

> Sol:1 . First bit is 1, so the number Is a negative number
>
> 2\. Take the 2's complement of 1010
>
> 0101
>
> [1]{.ul}
>
> 0110
>
> 3\. Convert binary number to decimal = 0\*2^3^+1\*2^2^+1\*2^1^+0\*2^0^ =6
>
> 4\. Adjust the sign (1010)~2~ = (-6)~10~

b\) 110110

> sol: 1. First bit is 1, So the number is negative number
>
> 2\. Take 2's complement of 110110
>
> 001001
>
> [1]{.ul}
>
> 001010
>
> 3\. Convert binary to decimal = 0\*2^5^+0\*2^4^+1\*2^3^+0\*2^2^+1\*2^1^+0\*2^0^=10
>
> 4\. Adjust the sign (110110)~2~=(-10)~10~

c\) 01110000

> sol: 1. First bit is 0, So the number is positive number
>
> 2\. So, no need to take 2's complement
>
> 3\. Convert binary to decimal = 0\*2^7^+1\*2^6^+1\*2^5^+1\*2^4^+0\*2^3^+0\*2^2^+0\*2^1^+0\*2^0^= 64+32+16=112
>
> 4\. (01110000)~2~=(112)~10~

3\. Convert the following decimal number to 8-bit sign/magnitude binary numbers.

a)  42

Sol: 1. Given is a positive number

2.  Apply division remainder algorithm: (42)~10~=(00101010)~2~

```{=html}
<!-- -->
```
b)  -63

Sol: 1. Given is a negative number

> 2\. Apply division remainder algorithm: (63)~10~= (11 1111)~2~
>
> On 8-bit sign/magnitude number= (0011 1111)~2~
>
> Bit sign

3.  -63 is a negative number, so replace sign bit with 1

4.  (-63)~10~ = (1011 1111)~2~

```{=html}
<!-- -->
```
c)  127

Sol: 1. Given is a positive number

> 2\. Apply division remainder algorithm: (127)~10~=(0111 1111)~2~

d)  -128:

Sol: 1. Given is a negative number

> 2\. Apply division remainder algorithm: (128)~10~= (1000 0000)~2~
>
> 3\. 8^th^ bit has 1, overflow occurred. So, extend it to 16 bits
>
> = (0000 0000 1000 0000)~2~
>
> Bit sign

5.  -128 is a negative number, so replace sign bit with 1

6.  (-128)~10~ = (1000 0000 1000 0000)~2~

4\. (i) Convert the following decimal number to 8-bit two's complement binary number.

\(ii\) Perform the operations in binary. (iii) Verify your answers from binary to decimal.

a)  30 + -32

> Sol: 1. (30)~10~ =(11110)~2~ =[(0001 1110)~2~]{.ul}
>
> 8 bit
>
> (32)~10~ = ( 100000)~2~ [= (0010 0000)~2~]{.ul}
>
> 8 bit
>
> (-32)~10~ = Take 1's complement and add 1 to it.
>
> 1101 1111
>
> [+ 1]{.ul}
>
> 1110 0000
>
> (30)~10~ + (-32)~10~ = 0001 1110
>
> [1110 0000]{.ul}

1111 1110

In 2's complement

1111 1110 0000 0001 ( 1's complement)

[+ 1]{.ul}

sign 0000 0010 (-2)

b)  16 + 9:

> Sol: (16)~10~ = (0001 0000)
>
> (9)~10~ [=+( 0000 1001)]{.ul}
>
> 0001 1001 25

c)  -19 + (-22):

> (19)~10~ = (0001 0011)~2~
>
> (-19)~10\ =~ 1110 1100
>
> [+ 1]{.ul}
>
> 1110 1101 ( In 2's complement)
>
> (22)~10~ = (0001 0110)~2~
>
> (-22)~10\ =~ 1110 1001
>
> [+ 1]{.ul}
>
> 1110 1010 ( In 2's complement)
>
> (-19)**~10~**+(-22)**~10~** = 1110 1101
>
> [+1110 1010]{.ul}

11101 0111 ( In 2's complement)

Sign bit

11101 0111 00010 1000

[+ 1]{.ul}

000101001 2^5^+2^3^+2^1^ =41 (result is negative ) (-41)

5\. What is the largest 16-bit binary number that can be represented using

a.  Unsigned numbers representation (write the formula and the result)

> 2^N-1^ 2^16-1^ = 65535

b.  Sign/magnitude numbers representation (write the formula and the result)

2^N-1^-1 2^15^ -1 32767

c.  Two's complement representation (write the formula and the result)

> 2^N-1^-1 2^15^ -1 32767

6\. What is the smallest 6-bit binary number that can be represented using

> a\. Unsigned numbers representation (write the formula and the result)
>
> 0

a.  Sign/magnitude numbers representation (write the formula and the result)

> -2^N-1^ +1 -2^15^ +1 -32767

b.  Two's complement representation (write the formula and the result)

> -2^N-1^ -2^15^ -32768

7.  Convert the following 4-bit two's complement binary number to 8-bit two's complement binary number.

    a.  0101 0000 0101

    b.  1010 1111 1010
