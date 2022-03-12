#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <assert.h>


int myCat(int taille_buff, const char * file){
    
    int fd, readn, w;
    fd = open(file, O_RDONLY);
    
    assert(fd != -1);
    
    char buff[taille_buff];
    
    readn = read(fd, &buff, taille_buff);

    while (readn != 0){

        w = write(STDOUT_FILENO, &buff, readn);
        assert(w != 0);
        readn = read(fd, &buff, taille_buff);
    }

    printf("\n");
    return 0;
}

int main (int argc, char *argv[]){
    assert(argc == 3);
    myCat(atoi(argv[1]), argv[2]);
    return 0;
}