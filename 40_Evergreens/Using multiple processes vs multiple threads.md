---
created: 2021-10-14
aliases:
  - null

tags: created/2021/10/14, review, node/evergreen/claim
sr-due: 2022-07-06
sr-interval: 178
sr-ease: 310
---

#### [[Using multiple processes vs multiple threads]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

Processes are parents to threads, somewhat like the [[Operating Systems|operating system]] is the parent to processes. The process will create and use threads within its own memory space to accomplish tasks more efficiently, but both processes and threads are dynamic which means that their respective controllers must maintain and keep track of them. Multiple threads/processes can be used have multiple operations that can happen concurrently. Managing threads within your process can be quite complicated, but it can be very beneficial if you are waiting on long operations such as slow I/O or slow algorithms. Threads should be used if sharing of data structures and memory is needed, but multiple processes make more sense when the parallel tasks are logically separate. 
^[[https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)]

### <hr class="footnote"/>

**Status**:: #EVER/GREEN 
*edited `=this.file.mtime`*

**Topics**:: [[Operating Systems]], [[Computer Science]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
