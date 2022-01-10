```dataview
TABLE
	Status,
	filter(file.etags, (t) => contains(t, "TEND")) as Tags,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created
FROM #node/evergreen and #TO/TEND or #EVER/SEED/UNPLANTED 
SORT length(file.tags)
```