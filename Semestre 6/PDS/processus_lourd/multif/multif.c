#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

typedef int (*func_t) (char *);

int f(int i) {
  return i;
}

int testfunc(char * args) {
  (strcmp(args, "true") == 0) ? exit(EXIT_SUCCESS) : exit(EXIT_FAILURE);
}

int multif (func_t f[], char *args[], int n) {
  int i, stat;
  pid_t pid;
  for (i = 0; i < n; i++) {
    switch (pid = fork()) {
      case -1:
        break;
      case 0:
        exit(f[i](args[i]));
        break;
      default:
        continue;
    }
  }
  for (i = 0; i < n; i++) {
    wait(&stat);
    if (WIFEXITED(stat)) {
      printf ("%d\n", WEXITSTATUS (stat));
    }
    if (WEXITSTATUS(stat) != 0) {
      exit(EXIT_FAILURE);
    }
  }
  exit(EXIT_SUCCESS);
}

int main(int argc, char * argv[]) {
  func_t functions[argc];
  for (int i = 0; i < argc; i++) {
    functions[i] = &testfunc;
  }

  return multif(functions, ++argv, argc);
}
