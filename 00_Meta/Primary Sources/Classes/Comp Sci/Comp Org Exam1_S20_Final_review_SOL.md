**Comp Org Exam 1 Spring 2020** REVIEW \_\_\_ANSWER!\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

*For questions that require a calculation, if you don\'t trust your arithmetic skills, just write out the calculation. e.g., if the answer is 1 + 4 + 16 + 128, just write that out*

**Part I: Raspian**

**1. Provide the Raspian command(s) to accomplish each task**:

a\) Create a directory, **cs345**

mmkdir CS345

b\) Add a user, **foo**, to the system

adduser foo

c\) Create a new empty file, **exam.s**

touch exam.s or nano exam.s

d\) List the files in /bin, showing details (time, stamp, permission, etc.)

**ls -l /bin**

**e**) Rename **exam.s** as **quiz.s**

mv exam.s quiz.s

f\) Delete the file **quiz.s**

rm quiz.s

g\) Change to the directory **/home/guest/A**

cd /home/guest/A

h\) Install the program **fortune**

sudo apt-get install fortune

i\) Delete the directory **A**

rmdir A

j\) Clear the screen

clear

k\) Show the name of your current directory (e.g., /home/pi)

pwd

**Part II: Numbering Systems**

1 . Express the value 183 in base 2. Use the algorithmic approach (division/remainder) to do so.

185/ 2 = 92 r 1

92 / 2 = 46 r 0

46 / 2 = 23 r 0

23 / 2 = 11 r 1

11 / 2 = 5 r 1

5 / 2 = 2 r 1 10110111

2/2 = 1 r 0

1/2 = 0 r 1

2\. Find the base 10 value of the unsigned number 0000 0010 0111 1000

8 + 16 + 32 + 64 + 512 =632

3\. Using the sign and magnitude system, what is the decimal value of 1001 1011?

-27

4\. Find the 2\'s complement of 1111 1111 0111 1000 (express your answer in binary).

0000 0000 1000 0111 + 1 = 0000 0000 1000 1000

5\. Assume 2's complement representation. Is 1111 1111 0111 1000 positive or negative? How can you tell?

Negative since it starts with a 1 (MSB)

6\. Covert 1101 1010 1100 1001 to hexadecimal.

DAC9

7\. Assume 2's complement representation. What is the decimal value of 1010 1010

0101 0101 + 1 = 0101 0110 = 86, so -86 8.

8\. Add the binary numbers 1110 1101 and 0010 0111

1110 1111

**Part III: General Knowledge**

1\. How many bits are in a byte?

8

a\) How many registers are in a Raspberry Pi.

16 (r0 - r15) + 1 register cpsr (current program status register)

16 or 17, both are acceptable

b\) How many bytes long is a Raspberry Pi register?

4

c\) How many bytes are in a word on a Raspberry Pi?

4

d\) The sequence of an instruction cycle is:

Fetch, Decode, Execute

2\. A CPU designer wants to be able to store unsigned values between **0-63** (nothing smaller or larger). What size of register (in bits) will they need? Briefly justify your answer.

8 bits. 2^6^ - 1 different patterns, 0 - 63

3\. Name the program responsible for each task:

assembler (as)

a\) Convert assembly language into machine code

assembler (as)

b\) Convert a high level language into assembly language

compiler

c\) Join object modules together to produce an executable program

linker (gcc)

d\) Debug a program (name the debugger used in class)

gdb

4\. a) Name the register in ARM architecture used to store the address of the next instruction to execute. PC

b\) Name the component in a CPU where **calculations** take place

arithmetic logic unit

c\) Name two advantages of RISC architecture over CISC architecture.

1\. all instructions are of the same length

2\. all instructions take the same amount of time to execute cheaper (in terms of hardware)

3\. fewer instructions

5\. Give the ARM assembly symbols that indicate:

a\) the beginning of a single-line comment.

@

b\) the start of an assembly directive

.

c\) the end of a label

:

d\) an immediate value

\#

e\) a hexadecimal value

0X

6\. Write a complete ARM assembly program to calculate (13 + 39) x (16-22). Just use immediate values (#13, etc.). Your program should be written so that the result can be displayed using echo \$?

.func main

.global main

.text

main:

mov r0, #13

mov r1, #39

add r0, r0, r1

mov r2, #16

mov r3, #22

sub r2, r2, r3

mul r0, r0, r2

bx lr

7\. Write the **.data** portion of an ARM assembly program that has 2 variables, **lock** and **bagel**, with values 10 and \"cream cheese\" respectively.

.data

lock: .word 10

bagel: .asciz \"cream cheese\"

8\. Write *just* the code required by each comment:

// Read the value of lock into r0 (2 statements)

ldr r0, =lock

ldr r0, \[r0\]

// Decrement r0 by 5

sub r0, r0, #5

// Write r0 back out to lock (2 statements)

ldr r1, =lock

str r0, \[r1\]

9\. a) The hexadecimal number 0x22AACCEF is stored in memory as shown:

Is the system using **little endian** or **big endian**? How do you know?

  -----------------------------------------------------------------------
  **Memory Address**                               **Value**
  ------------------------------------------------ ----------------------
  0x21024                                          22

  0x21025                                          AA

  0x21026                                          CC

  0x21027                                          EF
  -----------------------------------------------------------------------

Big Endian, because the big numbers come first

b\) The number 0x00 00 00 19 is stored in memory, and when inspected, it appears as follows in gdb:

**0x21024 19 00 00 00**

Is this system using **little endian** or **big endian?** How do you know?

little endian, because the little end of the number is coming first.

10\. **One** of these statements about memory is **incorrect.** Which **one**?

a\) Each label in assembly is a symbolic name for a memory address.

b\) Code and data are stored in a single section, indicated by the .codata directive

c\) A .word occupies 4 bytes

d\) The .asciz directive is used to allocate room for strings

e\) The .balign 4 directive is used to ensure that addresses are multiples of 4 bytes

10.5. An .asciz string contains: **\"Go Bearcats!\"**. How many bytes does it occupy? Note: there is one space between the o and the B

13

11\. Name the ARM assembly statement (**just** the 3-letter mnemonic, no operands) that

a\) loads in a value from memory into a register

ldr

b\) stores a value from a register into memory

str

12\. Match each gdb command with its [[purpose]] (write the Roman numeral in the blank):

a\) Displays memory \_iv\_\_\_\_\_

b\) Executes one statement \_\_iii\_\_\_\_

c\) Sets a break point \_\_i\_\_\_\_

d\) displays the contents of register r0 \_\_\_ii\_\_\_

i\) break ii) info reg iii) step iv) x/
