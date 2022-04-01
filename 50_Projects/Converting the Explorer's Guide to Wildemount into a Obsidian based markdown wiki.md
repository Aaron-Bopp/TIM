---
created: 2021-11-16 
aliases:
  - null
tags: created/2021/11/16, node/project
---

# [[Converting the Explorer's Guide to Wildemount into a Obsidian based markdown wiki]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

This is a documentation of how I converted *[The Explorer's Guide to Wildemount](https://dnd.wizards.com/products/wildemount)* into Obsidian specific markdown.
The goal for this project was to take a mainly linear campaign guide and convert it into a wiki-style Obsidian vault that could be used to run [[DnD (Dungeons and Dragons)]] campaigns in the setting. The results were quite successful: 

![[20210721Exandria.png]]

## Background

Prior to starting this project and I had bought and read [Explorer's Guide to Wildemount on DnD Beyond](https://www.dndbeyond.com/marketplace/sourcebooks/explorers-guide-to-wildemount), this meant that I was familiar with the content of the book and how it was organized. The campaign guide is written linearly, and while there are hyperlinks to other parts of the book in places, it was nowhere near the level of your average wiki. [^1] 

[^1]: [Mighty Nein | Critical Role Wiki | Fandom](https://criticalrole.fandom.com/wiki/Mighty_Nein)

I also had familiarity with tools in [[Obsidian (software)|Obsidian]] that lend themselves well to a wiki-style database, i.e [[Dataview]], [[Breadcrumbs]]. Additionally, there are many Obsidian plugins that [lend themselves well](https://www.youtube.com/watch?v=Ovqu_1aW3Sw) to running [[TTRPG]]'s, which means that converting this book could work very well for running a campaign in Obsidian.

Finally, I had experience with processing text using [[Python]] and [[Regex]], and I wanted to use this project to increase those skills. 

## What is this article and who is it for

This note will be a documentation of what I was able to achieve and the tools I used, but it is not going to be an in-depth tutorial. I am intending to make a more general purpose guide that will go into more detail on how one could replicate this process for other source books: [[Parsing markup text for Obsidian projects]], and I am hoping to create a more general purpose tool that can be applied to these scenarios: [[Modular Markup Processor]].

If you are an [[TTRPG]] game master with a lot of motivation, or a novice programmer with some time on your hands, I think this article could definitely be enough for you to replicate this process.  

## Tools


- Getting plaintext files
    - [MarkDownload - Markdown Web Clipper](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173)
- Seperating sections in seperate files
    - [Note Refactor Plugin](https://github.com/lynchjames/note-refactor-obsidian)
    - [[Python]] scripts
- Converting data into [[Dataview]] fields and tags
    - [[Regex]] statements in scripts and [[Visual Studio Code]]'s mass search and replace
- Automatically linking all note names
    - Fork of [obstools/forward-linker: Auto-Linking Tool](https://forum.obsidian.md/t/auto-linking-tool/2218) 
- Version control
    - [[Github#Github Desktop]]

### A note on unfamiliar tools

While I had experience going into this project, I do believe that these tools are entry level enough to be approached by a novice or non-programmer (yes, even [[Regex]]). There are plenty of resources out there for learning the basics, [^2] and I hope that this article can give you enough of a framework to go out and learn these tools. That said, this is still largely a manual process, and depending on how anal you are could suck up hours. If this isn't your cup of tea, I hope to design tools that are even more helpful in the future: [[Modular Markup Processor]]

[^2]: [[Basic tools for working with plaintext]]

## Process

### Getting the book into plaintext

There are many tools for [[Converting existing file formats to plaintext]], but for this project I used a tool from Obsidian community member [[death.au]]: [MarkDownload - Obsidian Showcase](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173). One benefit we have here is that DndBeyond displays all of their source books in [[HTML]] which is much easier to parse into plaintext than [[PDF]]s, [^3] which is what most [[DnD (Dungeons and Dragons)]] source books are distributed as.

[^3]: [[Converting existing file formats to plaintext#Converting PDFs to markdown]]

The EGtW is divided into eight sections, and twenty seperate webpages. I opened all these pages at once and used Markdownload to download all tabs. 

 ### Pre-process processing
 
 While MarkDownload did a very good job, due to the nature [[markup]] formatting there are still some artifacts that will not work perfectly with [[Obsidian (software)|Obsidian]].
 
 These mainly included embedded images in headers: `### ![]() Title` and other small idiosyncracies.
 
For this I used a [[Regex]] like this `^(#+)\s*(!\[[^\]]*\]\([^\)]+\))(.*)` and used [[Visual Studio Code]] to replace it like this `$1 $3\n$2`

So not that bad, :D

Just kidding, let me break it down a little more:
1. `^(#+)` matches 1 or more `#`'s at the beginning of the line. The parenthesis denote capture group 1 (`$1`)
2. `(!\[[^\]]*\]\([^\)]*\))` matches `![]()` aka our embedded image with any number of characters in between the brackets and any number between the parenthesis
3. `(.*)` matches anything else until the end of the line
4. Finally, we replace the whole line, putting our first and third capture group basically back where they were and our image on the line below (`\n` starts a new line)

The final result would look like this:
```md
### Title
![]()
```

### Creating note structure

 The [Note Refactor Plugin](https://github.com/lynchjames/note-refactor-obsidian) was pivotal in this as it gives you the `Split note by heading - H[123]`command which will take all headings of a certain size and put them into their file.
 Otherwise, this process was mostly manual.
 I would look through each of the files and finding the headings that I wanted to split and
 split the lowest level heading up the highest so that I could run the commands the least number of times.
 At times, I had to use find and replace to make H4s into H3s so that I could target the with Note refactor is only gives the split note command for `H1`, `H2`, and `H3`.
 
 Unfortunately, not all sections that I wanted to split had headings. Some were just denoted by **bold** text or others would have even more markdown, i.e `_**Text**_`. This was helpful as it made it easier to match desired lines using Regex, so for these sections I used [[Python]] scripts and created my own Regex statements to create the notes. 
 
 ### Finding and creating inline fields
 
 ### Autolinking note titles
 ## Obsidian Integration
 ### Breadcrumbs
 ### Dataview
 ### Tags
 
 ## Results
 ### Graph
 ### Dataview queries
 ### New connections
 
 
 
