```dataview
TABLE
	Status,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created,
	sr-interval as Itv
FROM #node/evergreen 
SORT sr-interval
LIMIT 50
```
