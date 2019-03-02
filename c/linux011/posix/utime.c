#include <fcntl.h>
#include <utime.h>
#include <stdio.h>
#include <stdlib.h>

struct utimenuf{
time_t actime;
time_t modtime;
};
#define F "/tmp/hover_fifo"
int main(){
struct utimbuf timebuf;
utime(F,&timebuf);
printf("ac %d\n",timebuf.actime);
printf("mo %d\n",timebuf.modtime);
printf("ad\n");
return 0;
}