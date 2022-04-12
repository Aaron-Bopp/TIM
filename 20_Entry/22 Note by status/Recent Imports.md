```dataview
TABLE Creator, file.outlinks, file.mday as Imported
FROM "10_Sources/Readwise"
SORT created desc
WHERE file.mday > date(now) - dur(14 days)
```