#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <stddef.h>
#include <assert.h>
#include <signal.h>
#include <string.h>
#include <errno.h>

#define AND "-a"
#define OPT "-o"
#define RES "-c"
#define KIL "-k"

/* FONCTION FOURNIE PAR LE RESPONSABLE
 * D'UE POUR RECUPERER LES OPTIONS */
#define DELIMITERS " \t"
char **makeargv(const char *s) {
    int error;
    int i;
    int numtokens;
    int skip;
    char *t;
    char **argv;

    if (s == NULL) {
        errno = EINVAL;
        return NULL;
    }

    /* Skip initial delimiters */
    skip = strspn(s, DELIMITERS);
    t = strdup(s + skip);
    if (t == NULL)
    return NULL;

    /* count the number of tokens in s */
    numtokens = 0;
    if (strtok(t, DELIMITERS) != NULL)
    for (numtokens = 1; strtok(NULL, DELIMITERS) != NULL; numtokens++);

    /* create argument array for ptrs to the tokens */
    argv = (char **) malloc((numtokens + 1) * sizeof(char *));
    if (argv == NULL) {
        error = errno;
        free(t);
        errno = error;
        return NULL;
    }
    /* insert pointers to tokens into the argument array */
    if (numtokens == 0)
    free(t);
    else {
        strcpy(t, s + skip);
        argv[0] = strtok(t, DELIMITERS);
        for (i = 1; i < numtokens; i++)
        argv[i] = strtok(NULL, DELIMITERS);
    }
    /* put in the final NULL pointer */
    argv[numtokens] = NULL;

    return argv;
}

/* Se lance si argv[1] == "-a"
 * OU si argv[1] == "-c" ou "-k"
 * OU si argv[1] est une commande */
void conjonction(int argc, char *argv[]) {
    int pid[argc];
    int i, stat, ret_val;
    char **cmdargv;
    int res_flag = 0;
    int kill_flag = 0;
    for (i = 1; i < argc; i++) {
        if (strcmp(argv[i], AND) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], RES) == 0 && i+1 < argc) {
            i++;
            res_flag += 1;
        }
        if (strcmp(argv[i], KIL) == 0 && i+1 < argc) {
            i++;
            kill_flag += 1;
        }
        cmdargv = makeargv(argv[i]);
        switch(pid[i] = fork()) {
            case -1:
                perror("fork");
                break;
            case 0:
                if (execvp(*cmdargv, cmdargv)) {
                    cmdargv++;
                    exit(EXIT_FAILURE);
                }
                else {
                    cmdargv++;
                    exit(EXIT_SUCCESS);
                }
                break;
            default:
                continue;
        }
    }

    ret_val = EXIT_SUCCESS;
    for (i = 1; i < argc; i++) {
        if (strcmp(argv[i], AND) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], RES) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], KIL) == 0 && i+1 < argc) { i++; }
        wait(&stat);
        if (WIFEXITED(stat) && WEXITSTATUS(stat)) {
            ret_val = EXIT_FAILURE;
            if (kill_flag > 0) pid[i-1] = 0;
            if (res_flag > 0) {
                if (kill_flag > 0) {
                    for (int j = 0; j < argc; j++) {
                        if (pid[j]!=0) kill(pid[j], SIGKILL);
                    }
                }
                printf("%d\n", ret_val);
                exit(ret_val);
            }
        }
    }
    printf("%d\n", ret_val);
    exit(ret_val);
}

/* Se lance si argv[1] == "-o" */
void disjonction(int argc, char *argv[]) {
    int pid[argc], i, stat;
    char **cmdargv;
    int kill_flag = 0;
    int res_flag = 0;
    for (i = 2; i < argc; i++) {
        if (strcmp(argv[i], OPT) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], RES) == 0 && i+1 < argc) {
            i++;
            res_flag += 1;
        }
        if (strcmp(argv[i], KIL) == 0 && i+1 < argc) {
            i++;
            kill_flag += 1;
        }
        cmdargv = makeargv(argv[i]);
        switch(pid[i] = fork()) {
            case -1:
                perror("fork");
                break;
            case 0:
                if (execvp(*cmdargv, cmdargv)) {
                    cmdargv++;
                    exit(EXIT_FAILURE);
                }
                else {
                    cmdargv++;
                    exit(EXIT_SUCCESS);
                }
                break;
            default:
                continue;
        }
    }
    int flag = EXIT_FAILURE;
    for (i = 2; i < argc; i++) {
        if (strcmp(argv[i], OPT) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], RES) == 0 && i+1 < argc) { i++; }
        if (strcmp(argv[i], KIL) == 0 && i+1 < argc) { i++; }
        wait(&stat);
        if (WEXITSTATUS(stat)==EXIT_SUCCESS && WIFEXITED(stat)) {
            flag = EXIT_SUCCESS;
            if (res_flag > 0) {
                if (kill_flag > 0) {
                    for (int j = 0; j < argc; j++) {
                        if (pid[j]!=0) kill(pid[j], SIGKILL);
                    }
                }
                exit(flag);
            }
        }
        else {
            if (kill_flag > 0) pid[i-2] = 0;
        }
    }
    printf("%d\n", flag);
    exit(flag);
}


int main(int argc, char **argv) {

    assert(argc>1);

    if (strcmp(argv[1], OPT) == 0)
        disjonction(argc, argv);

    else {
        if (strcmp(argv[1], AND) == 0) {
            assert(strcmp(argv[2], KIL) != 0);
        }
        else assert(strcmp(argv[1], KIL) != 0);
        conjonction(argc, argv);
    }

    exit(EXIT_SUCCESS);
}
