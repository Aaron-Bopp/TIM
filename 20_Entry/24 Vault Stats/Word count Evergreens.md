---
cssclass: wordcountTable
---
src:: [Word and Character Count of multiple notes in Obsidian, using dataviewjs. · GitHub](https://gist.github.com/chrisgrieser/ac16a80cdd9e8e0e84606cc24e35ad99)
%%

## Configuration

**Gets either notes in a folder or notes with a certain tag. Leave one of them empty.**

`sourceTag:: #node/evergreen
`

**set to 0 to ignore**


charTarget:: 

wordTarget:: 0

includeFootnotes:: true

charactersIncludeSpaces:: false

excludeComments:: true

**Notes to exclude**

Leave empty to disable. (Notes with the yaml-key "status" and value "exclude" for that key are also excluded)

excludeTag:: #exclude

**Bibliography estimate for Pandoc Citations**

includeBibliographyEstimate:: true

wordsPerCitation:: 22

charsPerCitation:: 155

**purely visual**

thousandSeperator:: .

naChar:: —

# Table

%%
```dataviewjs
const {word_count, dv_funcs} = customJS
word_count.table(dv, this)
dv_funcs.sortableColumns()

```
