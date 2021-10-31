#### Content Notes related to this topic
```dataview
TABLE type, file.mday AS "Edited", file.cday AS "Created"
FROM [[TOPICNOTE]] and "ContentNotes"
WHERE file.name != "QUICKNOTE" and file.name != "TOPICNOTE" and !contains([[TOPICNOTE]].file.outlinks, link(file.name))
SORT Status
```
