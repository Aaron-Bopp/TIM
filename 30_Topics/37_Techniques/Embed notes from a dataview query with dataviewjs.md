---
created: 2021-10-23
aliases:
  - null
tags: created/2021/10/23, review, node/evergreen/technique
sr-due: 2022-09-22
sr-interval: 154
sr-ease: 230
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### [[Embed notes from a dataview query with dataviewjs]] 

```js
let transclude = dv.pages('query').map(p => "![[" + p.file.name + "]]")

transclude.forEach(p => dv.paragraph(p))

```

### <hr class="footnote"/>

**Status**:: #EVER/SAPLING 
*edited `=this.file.mtime`*

**Topics**:: [[Dataview]], [[Obsidian (software)]], [[programming]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
