#ifndef _CHARLIE_ASM_H
#define _CHARLIE_ASM_H
#define FIRST_TSS_ENTRY 4
#define str(n) \
__asm__("str %%ax\n\t" \
	"subl %2,%%eax\n\t" \
	"shrl $4,%%eax" \
	:"=a" (n) \
	:"a" (0),"i" (FIRST_TSS_ENTRY<<3))

int inline m_strlen(const char * s)
{
        register int __res ;
        __asm__("cld\n\t"
                "repne\n\t"
                "scasb\n\t"
                "notl %0\n\t"
                "decl %0"
                :"=c" (__res):"D" (s),"a" (0),"0" (0xffffffff));
        return __res;
}
extern inline int m_strlen(const char * s);





#endif