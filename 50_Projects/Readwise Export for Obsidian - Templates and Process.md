---
created: 2021-12-26 
edited: 
aliases:
  - null
tags: created/evergreen/2021/12/26, review, node/project
sr-due: 2022-03-22
sr-interval: 11
sr-ease: 242
---

#### [[Readwise Export for Obsidian - Templates and Process]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

#TO/WRITE How [[Readwise (software)|Readwise]] influences how I hightlight
#TO/PROGRAM A way to show off my Readwise templates
#TO/WRITE How I use my highlights as fleeting notes and as part of my process [[Often the best editing tool is time]]

##### On "action tags"
[[Readwise (software)|Readwise]] supports the use of a few different action tags will trigger certain functionality when you **import** highlights into [[Readwise (software)|Readwise]].

These tags include
- *.h1, .h2, etc.* which will save that highlight as header instead of a regular highlight (although you can still add notes and tags to these headers). If you use these consistently you can recreate the outline of whatever you are reading which will be preserved in [[Readwise (software)|Readwise]] or when your export to [[Obsidian (software)|Obsidian]]
- *.\<tagname\>* this will add given text as a tag of that highlight and remove it from the note in [[Readwise (software)|Readwise]]. This is really useful for things like [[Kindle (software)|Kindle]] which don't allow for tagging of highlights.
- *.c1, .c2, etc.* which will take multiple different highlights and concatenate them together with "..." as a separator. This is the most finicky of the action tags, as it depends on other highlights. [[Readwise (software)|Readwise]] is based off of importing highlights from different services, and each service has a different method of importing. If you tag one note with *.c1* and the highlights are imported before you tag the next one with *.c2* the concatenation will not take place. Thankfully, with most services this isn't a problem, and you will get the hang of it.
- *.qa Question? Answer* this is only relevant if you use [[Readwise (software)|Readwise]]'s builtin [[spaced repetition]] tool (which you should)
