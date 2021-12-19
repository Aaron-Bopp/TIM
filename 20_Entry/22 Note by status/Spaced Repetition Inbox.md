```dataview
TABLE
	Status,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created,
	sr-interval as Interval
FROM #node/evergreen 
SORT sr-interval
LIMIT 50
```