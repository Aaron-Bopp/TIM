<% tp.file.include("[[META]]") %> created/evergreen/<% tp.date.now("YYYY/MM/DD") %>, review, node/evergreen/claim
sr-due: <% tp.date.now() %>
sr-interval: 1
sr-ease: 230
---

<% tp.file.include("[[EVERGREEN_HEADER]]") %>

<% tp.file.cursor(0) %> 

### <hr class="footnote"/>

**Status**:: <% "#EVER/GROWING" %>
*edited `=this.file.mtime`*

**Topics**:: <% tp.file.cursor(1) %>
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*


