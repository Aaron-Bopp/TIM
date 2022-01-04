---
created: 2021-09-16
tags: created/topic/2021/09/16, node/topic/tool
aliases:
  - null
---

`$=customJS.dv_funcs.mentionedIn(dv)`
# [[Regex]] 

A regular expression is a sequence of characters that specifies a search pattern. Usually such patterns are used for "find" or "find and replace" operations or input validation.   [^1]

**Topics**:: [[Computer Science]], [[programming]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

%% DO NOT EDIT BELOW %%

%% DO NOT EDIT ABOVE %%
[^1]: https://en.wikipedia.org/wiki/Regular%20expression

## Getting started

- [RegExr: Learn, Build, & Test RegEx](https://regexr.com/) is extremely handy for building and checking expressions before you start using them. It also has a quick reference that should jog your memory if you are already familiar with [[Regex]]
- [Regular Expressions for Non-Programmers](https://medium.com/geekculture/regular-expressions-for-non-programmers-ed2047d2181f) is good starting place and has links to more resources
- You will need a tool that can properly recognize and execute [[Regex]]. Most [[programming]] languages can do this, as well as many text editors, such as [[Visual Studio Code]]

## Snippets

- Replace [underlinedtext]{.ul}
	- `\[([\w\s\(\)\:]*)\]{.ul}` or `/\[([^\]]+)\]\{\.ul\}/`
	- `<u>$1</u>`
- Replace numbered lists in markdown syntax
	- `/^[\*\_\>\s]+(\d*)[\*\_\>\s\.]+/`
