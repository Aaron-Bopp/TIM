---
created: 2021-09-16
tags: node/topic/tool
aliases:
  - null
---

`$=customJS.dv_funcs.mentionedIn(dv)`
# [[Regex]] 

A regular expression is a sequence of characters that specifies a search pattern. Usually such patterns are used for "find" or "find and replace" operations or input validation.   [^1]

**Topics**:: [[Computer Science]], [[programming]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

[^1]: https://en.wikipedia.org/wiki/Regular%20expression

## Getting started

- [RegExr: Learn, Build, & Test RegEx](https://regexr.com/) is extremely handy for building and checking expressions before you start using them. It also has a quick reference that should jog your memory if you are already familiar with [[Regex]]
- [Regular Expressions for Non-Programmers](https://medium.com/geekculture/regular-expressions-for-non-programmers-ed2047d2181f) is good starting place and has links to more resources
- [Visual Studio Code's Search and Replace Multiline Mode](https://code.visualstudio.com/updates/v1_29#_multiline-search)

## Snippets

- Replace [underlinedtext]{.ul}
	- `\[([\w\s\(\)\:]*)\]{.ul}` or `/\[([^\]]+)\]\{\.ul\}/`
	- `<u>$1</u>`
- Replace numbered lists in markdown syntax
	- `/^[\*\_\>\s]+(\d*)[\*\_\>\s\.]+/`
