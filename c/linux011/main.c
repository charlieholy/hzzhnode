#include "include/termios.h"
#include <stdio.h>

inline int m_strlen(const char * s)
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

int main(){
printf("a\n");
char *ss = "123a";
    int l = m_strlen(ss);
    printf("%d\n",l);
    return 0;
}