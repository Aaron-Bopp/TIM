---
created: 2021-11-16 
aliases:
  - null
tags: node/evergreen
---

#### [[Converting existing file formats to plaintext]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

##### Converting HTML to markdown

##### Converting PDFs to markdown

Compared to [[HTML]], [[Markdown]], or even [[XML]], [[PDF]] is exceptionally hard to convert to plain text. This because while those other three are [[markup]] file formats, [[PDF]]s are binary files that draw characters and images on the screen. This means that if a tool wants to extract the text from a PDF, it has to infer characters and structure from the binary, rather than being able to read it in explicitely. This means that getting complex structure like tables, columns, asides, or even heading structure from PDFs can be quite difficult and result in messy or unusable markdown.

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT/WATER 
*edited `=this.file.mtime`*

**Topics**:: [[programming]], [[Markdown]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
