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


static inline unsigned long _get_base(char * addr)
{
         unsigned long __base;
         __asm__("movb %3,%%dh\n\t"
                 "movb %2,%%dl\n\t"
                 "shll $16,%%edx\n\t"
                 "movw %1,%%dx"
                 :"=&d" (__base)
                 :"m" (*((addr)+2)),
                  "m" (*((addr)+4)),
                  "m" (*((addr)+7)));
         return __base;
}

#define get_base(ldt) _get_base( ((char *)&(ldt)) )


#endif