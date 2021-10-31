# C
Docs:: [Reference - C++ Reference](http://cplusplus.com/reference/) (Stick to the c library part)
## Tools
- Valigrind: watches the memory you're using
	- helps you get rid of memory issues
- Makefile: helps to compile large projects
## Basics
- `type name = value`
- if you do not specify all values in a struct or in a array it will zero the rest of them out
- all array are just int pointers
- Segmentation Fault == you've accessed memory outside of what has been allocated to your program
	- it can still go a really long way
## Pointers
- `type * name = value` gets the memory address of that variable
- `&` gets teh memory address of a variable
- `*` gets the value of a pointer
	- `*ptr = value` assigns the value to the memory address
- `void*` just points to memory, it can be any type you want
### Pointer Arrays
- calloc zero initializes your array for you
- malloc is slightly faster if you don't need an intitalized array
- realloc doesn't copy all values when size of array is changed. If the memory at the end is unallocated then it just expands the array
	- also takes care of freeing past arrays
```c
int * int_dynamicarray = NULL;
int_dynamicarray = (int *) malloc (10 * sizeof(int));
//For every malloc or calloc have a free
free(int_dynamicarray);
free(NULL); //is always good

```
## Make file
- `$<` gives the first item of the  requirement list
- `$@` gives the target name for flags
	- `targetname.c -flag $@`
## Handy Functions

### Swap two variables
```c
void swap (int * a, int * b){
	int temp = *a;
	*a = *b;
	*b = temp;
	return;
}


//swap(intMemoryAddress, intMemoryAddress);
swap(&variable, pointer)
```

# Banker's Algorithm
- Allocation state
	- Number of each resource in the system
	- Number of allocated resources
	- how much of each resource a process needs (max claim)
- Vector 
	- Matrix A
		- `A[p][r]` = # resources of type r to porc p
		- `A[r][p]` = max claim