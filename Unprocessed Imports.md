```dataview
TABLE Creator, file.outlinks as Links, highlight_tags, created as Imported
FROM "10_Sources/Readwise"
SORT created desc
WHERE length(file.inlinks) < 1
```