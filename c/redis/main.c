#include <stdio.h>
#include "sds.h"
#include "atomicvar.h"
#include "zmalloc.h"
int main(){
    int a= 1;
    atomicIncr(a,1);
    printf("a %d\n",a);
    return 0;
}