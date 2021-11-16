---
created: 2021-11-16 
aliases:
  - null
tags: node/evergreen
---

#### [[Converting the Explorer's Guide to Wildemount into a Obsidian based markdown wiki]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

This is a documentation of how I converted *[The Explorer's Guide to Wildemount](https://dnd.wizards.com/products/wildemount)* into Obsidian specific markdown.
The goal for this project was to take a mainly linear campaign guide and convert it into a wiki-style Obsidian vault that could be used to run [[DnD]] campaigns in the session. The results were quite successful:

![[20210721Exandria.png|ctr]]

##### Background

Prior to starting this project and I had bought and read [Explorer's Guide to Wildemount on DnD Beyond](https://www.dndbeyond.com/marketplace/sourcebooks/explorers-guide-to-wildemount), this meant that I was familiar with navigating the content and the content itself. The campaign guide is written linearly, and while there are hyper-links to other parts of the book in places, it was nowhere near the level of your average wiki. [^1] 

I also had familiarity with tools in [[Obsidian (software)|Obsidian]] that lend themselves well to a wiki-style database, i.e [[Dataview]], [[Breadcrumbs]]. Additionally, there are many Obsidian plugins that [lend themselves well](https://www.youtube.com/watch?v=Ovqu_1aW3Sw) to running [[TTRPG]]'s', which means that converting this book could work very for running a campaign in Obsidian.

Finally, I had experience with proccessing text using [[Python]] and [[Regex]], add I wanted to use this project to increase those skills. This note will be a documentation of what I was able to achieve and the tools I used, and I am intending to make a more general purpose guide that will go into more detail on how one could replicate this process for other source books: [[Parsing markup text for Obsidian projects]]

##### Tools

- Getting plaintext from DnDBeyond
    - [MarkDownload - Markdown Web Clipper - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173)
- Seperating sections in seperate files
    - [Note Refactor Plugin](https://github.com/lynchjames/note-refactor-obsidian)
    - [[Python]] scripts
- Converting data into [[Dataview]] fields and tags
    - [[Regex]] statements in scripts and [[Visual Studio Code]]'s mass search and replace
- Automatically linking all note names
    - Fork of 

##### Process

###### Getting book in plaintext

There are many tools for [[Converting existing file formats to plaintext]], but for this project I used a tool from Obsidian community member [[death.au]]: [MarkDownload - Markdown Web Clipper - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/markdownload-markdown-web-clipper/173). One benefit we have here is that DndBeyond displays all of their source books in [[HTML]] which is much easier to parse into plaintext than [[PDF]]s, [^2] which is what most [[DnD]] source books are distributed as.

The EGtW is divided into eight sections, and twenty seperate webpages. I opened all these pages at once and used Markdownload to download all tabs. 

###### Creating wiki structure




### <hr class="footnote"/>

**Status**:: #EVER/SEED/UNPLANTED
*edited `=this.file.mtime`*

**Topics**::
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

[^1]: [Mighty Nein | Critical Role Wiki | Fandom](https://criticalrole.fandom.com/wiki/Mighty_Nein)
[^2]: [[Converting existing file formats to plaintext#Converting PDFs to markdown]]