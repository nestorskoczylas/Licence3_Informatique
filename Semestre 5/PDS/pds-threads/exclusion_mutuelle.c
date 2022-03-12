#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <unistd.h>
#include <semaphore.h>
#include <pthread.h>

#define NB_THREADS 4

/*
Q1. Le problème qui pourrait survenir lors de l'utilisation de cette fonction dans un programme multithreadé est que les
threads aient accès au même moment à `count`.

Q2. La structure utiliser pour protéger les accès à `count` est une structure pthread_mutex_t.

Q3. Pour retrouver la valeur de `count`, on peut utiliser la fonction print ou une variable globale.
*/

static int count = 0;
pthread_mutex_t m;

int unique() {
    static int count = 0; /* variable globale à visibilité locale */
    count++;
    return count;
}

int unique_bis() {
    int p;
    for(int i = 0; i < 1000000; i++) {
        p = pthread_mutex_lock(&m);
        assert(p != -1);
        static int count = 0; /* variable globale à visibilité locale */
        count++;
        p = pthread_mutex_unlock(&m);
        assert(p != -1);
    }
    return count;
}

int main (int argc, char *argv[])  {
    int p;
    pthread_t t[NB_THREADS];

    p = pthread_mutex_init(&m, NULL);
    assert(p != -1);

    for (int i = 0; i < NB_THREADS; i++) {
        p = pthread_create(&(t[i]), NULL, (void *)&unique_bis, NULL);
        assert(p != -1);
    }

    for(int i = NB_THREADS-1; i >= 0; i--) {
        p = pthread_join(t[i], NULL);
        assert(p != -1);
    }

    p = pthread_mutex_destroy(&m);
    assert(p != -1);

    printf(count);

    return 0;
}
