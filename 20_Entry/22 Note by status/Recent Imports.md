```dataview
TABLE Creator, Source, file.mday as Imported
FROM "10_Sources/Readwise"
SORT file.mtime desc
WHERE file.mday > date(now) - dur(7 days)
```