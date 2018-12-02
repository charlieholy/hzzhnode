#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>
#define FIFO_PATH "/tmp/hover_fifo"
int main(){
printf("ads\n");
int a = access(FIFO_PATH,F_OK);
printf("a %d\n",a);
int b = mkfifo(FIFO_PATH,0666);
printf("b %d\n",b);
return 0;
}