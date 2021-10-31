---
created: 2021-10-23
aliases:
- 
tags: topic/technique
---
#### [[Convert words docs (docx) to markdown (md) with powershell and pandoc]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

```powershell
Get-ChildItem . -Filter *.docx | 
Foreach-Object {
    pandoc --from docx --to markdown --wrap=none $_ -o $_.Name.Replace('.docx', '.md')
}
```

### <hr class="footnote"/>

**Status**:: #EVER/SEED
*edited `=this.file.mtime`*

**Topics**:: [[programming]], [[pandoc]], [[powershell]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

