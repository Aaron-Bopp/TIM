---
created: 2021-10-23
edited: 2021-10-23
tags: created/evergreen/2021/10/23, review, node/evergreen/technique
sr-due: 2022-01-29
sr-interval: 35
sr-ease: 270
---

#### [[Convert words docs (docx) to markdown (md) with powershell and pandoc]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

This will convert all word docs in a folder (non-recursive) to Markdown when used in windows [[powershell]].

```powershell
Get-ChildItem . -Filter *.docx | 
Foreach-Object {
    pandoc --from docx --to markdown --wrap=none $_ -o $_.Name.Replace('.docx', '.md')
}
```

### <hr class="footnote"/>
**Topics**:: [[programming]], [[pandoc]], [[powershell]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

%% DO NOT EDIT BELOW %%
#### Related 
```dataview
LIST FROM [[#]]
WHERE contains(topics, this.file.link)
```
%% DO NOT EDIT ABOVE %%
