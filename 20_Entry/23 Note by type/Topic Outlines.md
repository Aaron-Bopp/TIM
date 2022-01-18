```dataview
TABLE
	length(file.inlinks) as Inlinks
FROM #node/topic
WHERE contains(topics, file.inlinks)
```