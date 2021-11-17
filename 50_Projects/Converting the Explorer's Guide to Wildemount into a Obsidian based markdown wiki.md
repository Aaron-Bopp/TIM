---
created: 2021-11-16 
aliases:
  - null
tags: node/evergreen
---

# [[Converting the Explorer's Guide to Wildemount into a Obsidian based markdown wiki]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

This is a documentation of how I converted *[The Explorer's Guide to Wildemount](https://dnd.wizards.com/products/wildemount)* into Obsidian specific markdown.
The goal for this project was to take a mainly linear campaign guide and convert it into a wiki-style Obsidian vault that could be used to run [[DnD]] campaigns in the session. The results were quite successful:

![[20210721Exandria.png|ctr]]

## Background

Prior to starting this project and I had bought and read [Explorer's Guide to Wildemount on DnD Beyond](https://www.dndbeyond.com/marketplace/sourcebooks/explorers-guide-to-wildemount), this meant that I was familiar with navigating the content and the content itself. The campaign guide is written linearly, and while there are hyper-links to other parts of the book in places, it was nowhere near the level of your average wiki. [^1] 

I also had familiarity with tools in [[Obsidian (software)|Obsidian]] that lend themselves well to a wiki-style database, i.e [[Dataview]], [[Breadcrumbs]]. Additionally, there are many Obsidian plugins that [lend themselves well](https://www.youtube.com/watch?v=Ovqu_1aW3Sw) to running [[TTRPG]]'s, which means that converting this book could work very well for running a campaign in Obsidian.

Finally, I had experience with processing text using [[Python]] and [[Regex]], add I wanted to use this project to increase those skills. This note will be a documentation of what I was able to achieve and the tools I used, and I am intending to make a more general purpose guide that will go into more detail on how one could replicate this process for other source books: [[Parsing markup text for Obsidian projects]]

## Tools

- Getting plaintext files
    - [MarkDownload - Markdown Web Clipper - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173)
- Seperating sections in seperate files
    - [Note Refactor Plugin](https://github.com/lynchjames/note-refactor-obsidian)
    - [[Python]] scripts
- Converting data into [[Dataview]] fields and tags
    - [[Regex]] statements in scripts and [[Visual Studio Code]]'s mass search and replace
- Automatically linking all note names
    - Fork of [obstools/forward-linker: Auto-Linking Tool](https://forum.obsidian.md/t/auto-linking-tool/2218) that I modified to work on all files
- Version control
    - [GitHub Desktop](https://desktop.github.com/) is by far the most simple way using [[Git]]'s version control and let's you iterate quick as you can easily save changes, revert changes, and test your code. It's [[GUI]] is powerful and intuitive, and the ways it displays changes will help you spot errors. At the very least it works well so that you easily undo if you mess up.

### A note on unfamiliar tools

While I had experience going into this project, I do believe that these tools are entry level enough to be approached by a novice or non-programmer (yes, even [[Regex]]). There are plenty of tools out there for learning the basics (I will link some below), and I hope that this article can give you enough of a framework to go out and learn these tools. That said, this is still largely a manual process, and depending on how anal you are could suck up hours. If this isn't your cup of tea, I hope to design tools that are even more helpful in the future: [[Modular Markup Processor]]

#TO/TEND/REFACTOR these resources into respective topic notes, and move this section to [[Parsing markup text for Obsidian projects]]

Now if you are ready to learn or just need to brush up on your skills, here are some resources:
- [[Regex]]
    - [RegExr: Learn, Build, & Test RegEx](https://regexr.com/) is extremely handy for building and check expressions before you start using them. It also has a quick reference that should job your memory if you are already familiar with [[Regex]]
    - [Regular Expressions for Non-Programmers](https://medium.com/geekculture/regular-expressions-for-non-programmers-ed2047d2181f) is good starting place and links to more resources
    - [Visual Studio Code's Search and Replace Multiline Mode](https://code.visualstudio.com/updates/v1_29#_multiline-search)
- [[Python]]
    - [How to Read a Text file In Python Effectively](https://www.pythontutorial.net/python-basics/python-read-text-file/) this is very basic, but if you are completely unfamiliar with Python it will help the gists make more sense
    - #TO/DO/FIND Good resource for python basics so that people can better understand gh gists
- [[Github]] 
    - [Getting Started with Git and GitHub Desktop | Codecademy](https://www.codecademy.com/articles/what-is-git-and-github-desktop)
    - [Getting started with GitHub Desktop - GitHub Docs](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/overview/getting-started-with-github-desktop)
- [[Intro to Obsidian]]
    

## Process

### Getting book in plaintext

There are many tools for [[Converting existing file formats to plaintext]], but for this project I used a tool from Obsidian community member [[death.au]]: [MarkDownload - Markdown Web Clipper - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173). One benefit we have here is that DndBeyond displays all of their source books in [[HTML]] which is much easier to parse into plaintext than [[PDF]]s, [^2] which is what most [[DnD]] source books are distributed as.

The EGtW is divided into eight sections, and twenty seperate webpages. I opened all these pages at once and used Markdownload to download all tabs. 

 ### Pre-processing... processing
 
 

### Creating wiki structure

 The [Note Refactor Plugin](https://github.com/lynchjames/note-refactor-obsidian) was pivotal in this as it gives you the `Split note by heading - H[123]` which will take all headings of a certain size and put them into their file.
 Otherwise, this process was mostly manual.
 I would look through each of the files and finding the headings that I wanted to split and
 split the lowest level heading up the highest so that I could run the commands the least number of times.
 At times, I had to use find and replace to make H4s into H3s so that I could target the with Note refactor is only gives the split note command for `H1`, `H2`, and `H3`.
 
 Unfortunately, not all sections that I wanted to split had headings. Some were just denoted by **bold** text or others would have even more markdown, i.e `_**Text**_`. This was helpful as it made it easier to match desired lines using Regex, so for these sections I used [[Python]] scripts and created my own Regex statements.
 
 #TO/DO/CREATE gh gist
 

### <hr class="footnote"/>

**Status**:: #EVER/SEED/UNPLANTED
*edited `=this.file.mtime`*

**Topics**::
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

[^1]: [Mighty Nein | Critical Role Wiki | Fandom](https://criticalrole.fandom.com/wiki/Mighty_Nein)
[^2]: [[Converting existing file formats to plaintext#Converting PDFs to markdown]]
