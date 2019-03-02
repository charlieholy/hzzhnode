#include "include/termios.h"
#include "include/asm.h"
#include <unistd.h>
#include <stdio.h>
#include <sys/syscall.h>


int main(){
printf("a\n");
char *ss = "123aasdasdw56";
    int l = m_strlen(ss);
    printf("%d\n",l);
    int i;
    str(i);
    printf("%d\n",i);
    int j;
    printf("%d\n",get_base(j));
    int euid = sys_geteuid();
    return 0;
}