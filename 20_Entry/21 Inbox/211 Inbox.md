```dataview
TABLE
	Status,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created,
	sr-interval as Interval
FROM #node/evergreen 
WHERE sr-interval <= 10 and (contains(status, "SEED") or contains(status, "SPROUT"))
SORT created
```