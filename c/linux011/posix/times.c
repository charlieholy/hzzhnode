#include <stdio.h>
#include <sys/times.h>
int main(){
    struct tms s;
    long ss = times(&s);
    printf("%ld\n",ss);
    printf("as\n");
}