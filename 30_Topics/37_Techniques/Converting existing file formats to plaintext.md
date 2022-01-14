---
created: 2021-11-16
aliases:
  - null
tags: created/evergreen/2021/11/16, review, node/evergreen, node/topic/technique,
sr-due: 2022-02-11
sr-interval: 30
sr-ease: 206
---

# [[Converting existing file formats to plaintext]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

Most text editing program have some way of formatting text. The two most common are [[markup]] text formatting and [[rich text formatting]]. [[rich text formatting]] usually relies on a proprietary software, i.e. Word, Pages, etc., but [[markup]] is designed to work with plaintext that can be read by any computer without specific software.

## Converting from rich text files

### Converting PDFs to plaintext

Compared to [[HTML]], [[Markdown]], or even [[XML]], [[PDF]] is exceptionally hard to convert to plain text. This because while those other three are [[markup]] file formats, [[PDF]]s are binary files that draw characters and images on the screen. This means that if a tool wants to extract the text from a PDF, it has to infer characters and structure from the binary, rather than being able to read it in explicitly. This means that getting complex structure like tables, columns, asides, or even heading structure from PDFs can be quite difficult and result in messy or unusable markdown.

## Converting between markup files

### Converting HTML to plaintext

## What to do after you have plaintext

- [[Basic tools for working with plaintext]]
- [[Parsing markup text for Obsidian projects]]

# <hr class="footnote"/>

**Status**:: #EVER/SPROUT
*edited `=this.file.mtime`*

**Topics**:: [[programming]], [[Markdown]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

%% DO NOT EDIT BELOW %%

%% DO NOT EDIT ABOVE %%
