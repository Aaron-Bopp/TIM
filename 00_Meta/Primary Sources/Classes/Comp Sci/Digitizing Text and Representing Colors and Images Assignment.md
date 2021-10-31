**44-101 Foundations of Computing**

**Digitizing Text and Representing Colors and Images Assignment**

**Note:** This is an *individual* assignment and should not be completed as a group.

1.  Encode the letters "Dream Big!\" (including the space but not the quotes) in ASCII (in base 16).

    -   447265616D 20 42696721

2.  Encode the letters "Let Go!" (including the space but not the quotes) in the ASCII (in base 2).

    -   01001101 01100101 01110100 00100000 01000111 01101111 00200001

3.  Describe, as best you can, the color that corresponds to the following color triad (R,G,B) (Feel free to check your work at [[colorpicker.com]{.ul}](http://colorpicker.com).)

    -   (180, 180, 180)

        i.  gray

    -   (255, 255, 110)

        i.  pale yellow

4.  What are the (R,G,B) values for the following colors

    -   Black

        i.  000000

    -   White

        i.  FFFFFF

    -   Red

        i.  FF0000

    -   Green

        i.  00FF00

    -   Blue

        i.  0000FF

For the next two problems, we suggest you use the web site [[flagpedia.net]{.ul}](http://flagpedia.net) to answer the questions.

5.  What colors (just list them in English) are used in the flags of:

    -   Gabon

        i.  green, yellow, blue

    -   Nepal

        i.  blue, red, white

6.  Perform GIF encoding on the flags of Indonesia and Lithuania. (Assume a 9x15 grid, as demonstrated in class.) Your solution should include the color table, a list of length:color pairs, and the percentage reduction in image size (in the same way as was explained in class).

> ![Flag of Indonesia](media/image1.png){width="1.1770833333333333in" height="0.7853991688538933in"}![Flag of Lithuania](media/image2.png){width="1.3229166666666667in" height="0.79375in"}

  ------------------------------------------------------------------------
  Color Table                         R            G           B
  ----------------------------------- ------------ ----------- -----------
  1                                   FF           FF          FF

  2                                   FF           00          00
  ------------------------------------------------------------------------

> Indonesia \[10x15\]: 75:2, 75:1 12/600 = 2%

  -----------------------------------------------------------------------
  Color Table                         R           G           B
  ----------------------------------- ----------- ----------- -----------
  1                                   FF          FF          00

  2                                   00          FF          00

  3                                   FF          00          00
  -----------------------------------------------------------------------

> Lithuania\[9x15\]: 45:1, 45:2, 45:3 18/540 = 3.3%
