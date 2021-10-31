> **NWMSU - School of CSIS**
>
> **Theory & Implementation of Programming Languages (CSIS 44-525) Fall 2020**

Hw#2: (25 pts) Due Monday Sept. 28 - 5:00 PM

> Submit a soft copy of your work including JFLAP files

Ex#1: 8 points **Get familiar with JFLAP**

> JFLAP (Java Formal Languages and Automata Package) is an educational software graphical tool written in Java that can be used with several topics [[computer]] science, in particular in formal languages and automata. students can create/manipulate DFA, NFA, regular expressions, and grammars, etc. The comprehensive JFLAP user manual is at **http://www.jflap.org/tutorial/**
>
> Download and install JFLP software. It is best to run JFLAP locally on Windows. You need Java SDK to open JFLAP on Windows.
>
> For each of the following languages, (a) use a sheet of paper and pen to draw the Deterministic Finite Automaton (DFA) that recognizes the language. (b) Use JFLAP to create the DFA obtained in (a).
>
> ![](media/image1.jpeg){width="4.375in" height="5.833333333333333in"}

(a) All strings over Σ = {*a,b*} with at least one *a* and excatly two *b*^0^s.

    a.  aa\*ba\*ba\* + a\*baa\*ba\* + a\*ba\*baa\*

    b. 

> ![](media/image2.png){width="4.4375in" height="2.6458333333333335in"}

(b) All strings over Σ = {*a,b*} containing the substrings *aa*.

    a.  (a+b)\*aa(a+b)\*

> ![](media/image3.png){width="4.125in" height="1.7916666666666667in"}

Ex#2: 8 points **From Regular expressions to NFA http://www.jflap.org/tutorial/regular/index.html**

> Enter the following regular expression *a*^∗^*b* + *ab*^∗^ into JFLAP and convert it to an NFA. You may also test the NFA with strings that are accepted and rejected by the NFA.
>
> ![](media/image4.png){width="7.222916666666666in" height="4.079166666666667in"}

Ex#3: 9 points **Convert NFA to DFA**

> Given the following NFA as a transition table where *q*~0~ is the starting state and *q*~2~ is the final state. (Draw with JFLAP then use the JFLAP to convert it to a DFA).

(a) Use *λ*−Closure Algorithm that we used in the lecture to convert the NFA to a DFA.

(b) Use JFLAP to convert the NFA to a DFA.

    a.  ![](media/image5.png){width="5.5625in" height="2.8958333333333335in"}

(c) If the DFA's obtained in (a) and (b) are different then explain why they are different on your own opinion.

(d) It seems jflap deals deals differently with null values than the algorithm we have been taught. Otherwise they are similar.

(e) 

Table 1: Transition table of the NFA.

+-----------------+-----------------+-----------------+-----------------+
|                 | > **a**         | > **b**         | > *λ*           |
+=================+=================+=================+=================+
| *q*0            | *q*0            | *q*1            |                 |
+-----------------+-----------------+-----------------+-----------------+
| *q*1            | *q*2            |                 |                 |
+-----------------+-----------------+-----------------+-----------------+
| *q*2            | *q*0            | *q*0            | *q*1            |
+-----------------+-----------------+-----------------+-----------------+
