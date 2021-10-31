---
created: 2021-10-14
aliases:
- 
cssclass: evergreen
tags: evergreen
sr-due: 2021-11-01
sr-interval: 4
sr-ease: 270
---
#### [[Monolithic vs Micro Kernels]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

[[Monolithic Kernel]]s are faster and more volatile but more difficult to extend, while [[Micro Kernel]]s are slower but more robust, smaller, and easier to extend. I think that in the end the question comes down to use case. If reliability and security are the most important then you may want to go with a micro kernel as its modular design will result in less system-wide crashes and makes it easier to clean up security vulnerabilities as the servers are less connected and less likely to impact other parts of the OS than if they were all part of one kernel. However, if speed is of concern and volatility is taken care of by the fact that you are running a cloud of computers anyway a monolithic kernel is the best way to go, and we see this with Linux being used for most server applications. But these are both specific applications and in the broad space of consumer PC usage, neither of these approaches fit perfectly. Both windows and mac are hybrid systems which makes sense as while speed and lack of crashes are nice, most people do not need that speed, and it is far from possible to stop all crashes, but the feature set and the amount of people working on these [[Operating Systems|OS]]'s is so large that having a monolithic kernel would be hard to maintain and expand.

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT 
*edited `=this.file.mtime`*

**Topics**:: [[Operating Systems]],  [[Computer Science]], [[programming]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*


