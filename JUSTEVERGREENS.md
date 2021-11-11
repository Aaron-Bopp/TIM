```dataview
TABLE
	Status,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created
FROM #node/evergreen 
SORT length(file.outlinks) DESC
```