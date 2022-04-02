<% tp.file.include("[[META]]") %> created/<% tp.date.now("YYYY/MM/DD") %>, review, node/evergreen/claim
---

<% tp.file.include("[[EVERGREEN_HEADER]]") %>

<% tp.file.cursor(0) %>

### <hr class="footnote"/>

**Status**:: <% "#EVER/SPROUT" %>
*edited `=this.file.mtime`*

**Topics**:: <% tp.file.cursor(1) %>
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
