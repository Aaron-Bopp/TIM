
```dataview
TABLE round(file.size / 1024, 2) as "File Size (kb)"  
FROM #evergreen
SORT file.size desc
```

```dataviewjs
customJS.dv_funcs.sortableColumns()
```