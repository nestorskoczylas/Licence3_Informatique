#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <stddef.h>
#include <assert.h>
#include <signal.h>

int main(int argc, char ** argv) {
    int index_to;

    for(index_to = 2; index_to < argc - 1; index_to++) {
        if(strcmp(argv[index_to], "to") == 0) break;
    }

    argv[index_to] = NULL;

    if(argc != 4) {
        printf("ERROR. Usage : [cmd] to [cmd]. EXACTLY two commands are required.\n");
        return 1;
    }

    int fd[2], pid;

    assert(pipe(fd) == 0);

    switch(pid = fork()) {
        case -1 :
            perror("fork");
            return 2;

        case 0 :
            close(fd[0]);
            dup2(fd[1], 1);
            close(fd[1]);
            if(execvp(argv[1], argv+1) == -1) perror("execvp");

        default: break;
    }

    switch(pid = fork()) {
        case -1 :
            perror("fork");
            return 3;

        case 0 :
            close(fd[1]);
            dup2(fd[0], 0);
            close(fd[0]);
            if(execvp(argv[3], argv+3) == -1) perror("execvp");

        default: break;
    }

    wait(NULL);
    return 0;
}
