---
created: 2021-10-23
aliases:
  - null
tags: created/evergreen/2021/10/23, node/evergreen, node/technique
sr-due: 2022-01-08
sr-interval: 8
sr-ease: 230
---

#### [[Embed notes from a dataview query with dataviewjs]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

```js
let transclude = dv.pages('query').map(p => "![[" + p.file.name + "]]")

transclude.forEach(p => dv.paragraph(p))

```

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT 
*edited `=this.file.mtime`*

**Topics**:: [[Dataview]], [[Obsidian (software)]], [[programming]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
