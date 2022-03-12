#include <pthread.h>
#include <stdio.h>
#include <assert.h>
#include <unistd.h>
#include <semaphore.h>
#include <stdlib.h>

#define N 10

/*Q1. Les a doivent être exécuté avant les b, a1 doit être suivi de b2 et a2 de b1
On se connaît pas l'ordre dans lequel ils seront éxécutés.*/

sem_t sem1, sem2, sem3;
sem_t sems[N];
sem_t m, rdv;

int nb_attente = 0;

void a(int i) {
    sleep(1);
    printf("a%d\n", i);
    sleep(1);
}

void b(int i) {
    sleep(1);
    printf("b%d\n", i);
    sleep(1);
}

void *p1(void *arg) {
    assert(arg == NULL);
    a(1);
    assert(sem_post(&sem2) == 0);
    assert(sem_post(&sem3) == 0);
    assert(sem_wait(&sem1) == 0);
    assert(sem_wait(&sem1) == 0);
    b(1);
    return NULL;
}

void *p2(void *arg) {
    assert(arg == NULL);
    a(2);
    assert(sem_post(&sem1) == 0);
    assert(sem_post(&sem3) == 0);
    assert(sem_wait(&sem2) == 0);
    assert(sem_wait(&sem2) == 0);
    b(2);
    return NULL;
}

void *p3(void *arg) {
    assert(arg == NULL);
    a(3);
    assert(sem_post(&sem1) == 0);
    assert(sem_post(&sem2) == 0);
    assert(sem_wait(&sem3) == 0);
    assert(sem_wait(&sem3) == 0);
    b(3);
    return NULL;
}

void *p(int n) {
    a(n);
    int i;
    for (i = 0; i < N; i++) {
        sem_post(&sems[i]);
    }
    for (i = 0; i < N; i++) {
        sem_wait(&sems[i]);
    }
    b(n);
    return 0;
}

//Q4.
void *pQ4(void *arg) {
    int n = (int) arg;
    a(n);
    int i;
    sem_wait(&m);
    if (nb_attente != N - 1) {
        nb_attente ++;
        sem_post(&m);
        sem_wait(&rdv);
    }
    else {
        for (i = 0; i < N - 1; i++) {
            sem_post(&rdv);
            sem_post(&m);
        }
    }
    b(n);
    return 0;
}

int main() {
    assert(sem_init(&sem1, 0, 0) == 0);
    assert(sem_init(&sem2, 0, 0) == 0);
    assert(sem_init(&sem3, 0, 0) == 0);

    //Q3.
    int i;
    for (i = 0; i < N; i++) {
        sem_init(&sems[i], 1, 0);
    }

    //Q4.
    assert(sem_init(&m, 1, 1) == 0);
    assert(sem_init(&rdv, 1, 0) == 0);

    int *j;
    j = malloc(sizeof(int) * N);

    // assert(N > 0); ici N est définis et égal à 10

    pthread_t *t;
    t = malloc(sizeof(pthread_t) * N);

    int k;
    for (k = 0; k < N; k++) {
        pthread_create(&t[k], NULL, (void *)&pQ4, (void *)k);
    }

    for (k = 0; k < N; k++) {
        pthread_join(t[k], (void *)&j[k]);
    }

    for (k = 0; k < N; k++) {
        assert(j[k] == 0);
    }
    return 0;
}
