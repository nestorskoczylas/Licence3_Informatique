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
    int fd[2];

    int arg_nb = 0;
    for(index_to = 2; index_to < argc - 1; index_to++) {
        if(strcmp(argv[index_to], "to") == 0) {
            argv[index_to] = NULL;
            arg_nb++;
        }
    }

    // ./pipe2 ls to wc
    //      0   1 2  3
    // argc = 4
    int i;
    int curr = 0;
    int oth;

    assert(pipe(fd) == 0);

    for (i = 1; i < argc-1; i++) {

        if (!fd[0]) {
            assert(pipe(fd) == 0);
        }

        curr = (curr==1)?0:1;
        oth = (curr==0)?1:0;
        printf("FORK 1 Oth : %d\n", oth);
        printf("FORK 1 Curr : %d\n\n", curr);

        switch(fork()) {
            case -1 :
                perror("fork");
                return 2;

            case 0 :
                if(close(fd[oth]) == -1) perror("close");
                if(dup2(fd[curr], curr) == -1) perror("dup2"); // STDOUT_FILENO == 1
                if(close(fd[curr]) == -1) perror("close");
                
                if(execvp(argv[i], argv+i) == -1) perror("execvp");

            default: break;
        }
    }

    // ici i == argc-1 donc l'avant dernier argument
    switch(fork()) {
        case -1 :
            perror("fork");
            return 3;

        case 0 :
            curr = (curr==1)?0:1;
            oth = (curr==0)?1:0;
            printf("FORK 2 Oth : %d\n", oth);
            printf("FORK 2 Curr : %d\n", curr);

            if(close(fd[curr]) == -1) perror("close");
            if(dup2(fd[oth], oth) == -1) perror("dup2");  // STDIN_FILENO == 0
            if(close(fd[oth]) == -1) perror("close");
            
            if(execvp(argv[i], argv+i) == -1) perror("execvp");

        default: break;
    }

    wait(NULL);
    
    return 0;
}
