<%* 
const filename = String(tp.file.selection()).trim()
const template = tp.file.find_tfile("EGNOTE") 
console.log(tp.file)
%>
<% (await tp.file.create_new(template, filename)).basename %>
