NWMSU - School of CSIS

Theory & Impl. of Prog. Lang. (CSIS 44-525) Fall 2020

Quiz #2 (Section 01 Sept. 25)

[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_NAME:]{.ul} [Aaron Bopp\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_]{.ul}

***Instructions:***

-   ***Open lecture notes and books***

-   *NFA means Nondeterministic Finite Automata*

-   *DFA: means Deterministic Finite Automata*

-   ***In-class students**: Paper quiz will be handed out to students who will taking the quiz physically in class.*

-   ***Virtual students** are students who will be taking the quiz remotely. These students need to upload and **[submit their answers in a word document]{.ul}**. Instead of drawing the DFA and NFA for Ex#2 and Ex#3, students can submit their answers in terms of a transition table or transition function as posted in the document that has posted on the course webside in Modules/DFA-NFA-Different_Representations.pdf*

**[Ex #1]{.ul} (5pts)**

What is the language accepted by the following DFA. In other words, write your answer in terms of a regular expression

![](media/image1.png){width="5.0in" height="1.6666666666666667in"}

b\*a((a+b) (a+b))\*

**[Ex #2]{.ul} (5pts)**

Draw the DFA of the regular expression: **ab\* + b**

**[DFA \| a b]{.ul}** **qx = final state**

qo \| q1 q2

q1 \| q3 q1

q2 \| q3 q3

q3 \| q3 q3

**[Ex #3]{.ul} (5pts)**

Draw the NFA of the regular expression: **ab\* + b**

**qx = final state**

  -----------------------------------------------------------------------
  NFA               a                 b                 λ
  ----------------- ----------------- ----------------- -----------------
  Q0                                                    {q1, q3}

  Q1                                  Q2 

  Q2                                                    Q8

  Q3                Q4 

  Q4                                                    {q7, q5}

  Q5                                  Q6 

  Q6                                                    Q7

  Q7                                                    {q4,q8}

  Q8 
  -----------------------------------------------------------------------

**[Ex #4]{.ul} (5pts)**

Indicate whether the following automata are of type NFA or DFA.

**(A) NFA**

> ![](media/image2.png){width="2.8229166666666665in" height="1.1852351268591426in"}

**(B) DFA**

> ![](media/image3.png){width="4.248047900262467in" height="0.90625in"}

**(C) DFA**

> ![](media/image4.png){width="4.053183508311461in" height="1.163484251968504in"}

**(D) NFA (because it can accept lambda on q0 or q1)**

> ![](media/image5.png){width="2.9270833333333335in" height="0.9699660979877516in"}

**(E) DFA**

> ![](media/image6.png){width="1.0104166666666667in" height="1.2291666666666667in"}
