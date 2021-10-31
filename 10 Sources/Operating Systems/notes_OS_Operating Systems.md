---
created: 2021-10-13
aliases:
- 
cssclass: content
tags: content
type:
- notes
bib:
aliases:
---

##### [[notes_OS_Operating Systems]]

**Creator**:: [[@Nathan Eloe]]

**Source**:: [[00_intro_to_os 1.pdf]]

**Related**:: [[Computer Science]]



# [[notes_OS_Operating Systems]] 

- [[Kernel Space]] - memory locations the kernel and other processes that have no restrictions in access to harware, instructions or memory locations execute from 
	- [04:33](https://www.youtube.com/watch?v=ORLqB_2a1PQ#t=273.99443777493286)
- [[User Space]] - restricted memory locations from which process cannot access harware or kernel memory directly
	- [05:28](https://www.youtube.com/watch?v=ORLqB_2a1PQ#t=328.145502912262)
- [[Monolithic Kernel]] 
	- All kernil services ([[Virtual File System| VFS]], schedulers, device drivers) live in [[Kernel Space]] and share memory while communicated through the [[Application Binary Interface | ABI]]

Q: What are the pros and cons of monolithic vs micro kernels

A: [[Monolithic Kernel]]s are faster and more volatile but more difficult to extend while [[Micro Kernel]]s are slower but more robust smaller and easier to extend

- [[Micro Kernel]] [06:44](https://www.youtube.com/watch?v=ORLqB_2a1PQ#t=404.3835089923706)
	- [[Kernel Space]] only holds [[Inter Process Communication | IPC]], [[CPU]] scheduling and virtual memory while all other services run in user space using sockets and message passing to communicated
- [01:31](https://www.youtube.com/watch?v=ORLqB_2a1PQ#t=91.4331031411438) [[ENIAC]] first computer with no OS
- [[Monolithic vs Micro Kernels]]
### <hr class="dataviews"/>

`$=customJS.dv_funcs.topicNoteDataviews({dv, that:this})`

