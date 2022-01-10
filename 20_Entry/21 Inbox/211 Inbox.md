```dataview
TABLE
	Status,
	sr-interval as Interval,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created
FROM #node/evergreen 
WHERE sr-interval <= 10 and (contains(status, "SEED") or contains(status, "SPROUT"))
SORT created
```