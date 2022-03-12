#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <assert.h>

int myCat(const char *file){
    FILE* fd;
    int c;
    fd = fopen(file, "r");
    while ((c = fgetc(fd)) != EOF){
        fputc(c, stdout);
    }
    return(EXIT_SUCCESS);
}

int main(int argc, char *argv[])
{
    assert(argc == 2);
    myCat(argv[1]);
    return 0;
}

