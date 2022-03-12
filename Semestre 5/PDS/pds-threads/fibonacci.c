#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <unistd.h>
#include <semaphore.h>
#include <pthread.h>

#define NB_THREADS 4
#define NB_FIBO 20

static int fibo [NB_FIBO];
pthread_mutex_t m;

void fib(){
    for (int i = 0; i < NB_FIBO; i++) {
        fibo[i] = -1;
    }
}

void *geNB_FIBO(int f) {
    int x, j;

    for(int i = 2; i < f; i++){

        x = pthread_mutex_lock(&m);
        assert(x!=-1);

        j = fibo[i];

        if (j == -1){
            fibo[i] = fibo[i-1] + fibo[i-2];
        }

        x = pthread_mutex_unlock(&m);
        assert(x != -1);
    }
    return NULL;
}


int main (int argc, char *argv[])  {
    pthread_t t[NB_THREADS];
    int x, nb;

    fib();
    nb = atoi(argv[1]) ;
    fibo[0] = 1;
    fibo[1] = 1;

    x = pthread_mutex_init(&m, NULL);
    assert(x != -1);

    for(int i = 0; i < NB_THREADS; i++) {
        x = pthread_create(&(t[i]), NULL, (void*)&geNB_FIBO, (int)nb);
        assert(x != -1);
    }

    for(int i = 0; i < NB_THREADS; i++) {
      x = pthread_join(t[i], NULL);
      assert(x != -1);
    }

    x = pthread_mutex_destroy(&m);
    assert(x != -1);

    for (int i = 0; i < NB_FIBO; i++) {
        if(fibo[i] != -1){
          printf("%d\n", fibo[i]);
        }
    }
    return 0;
}
