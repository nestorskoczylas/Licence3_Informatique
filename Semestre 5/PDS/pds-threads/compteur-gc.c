#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <assert.h>

struct arg_s {
    char *bloc;
    unsigned long taille;
    unsigned long ret;
};

unsigned long compteur_gc(char *bloc, unsigned long taille) {
    unsigned long i, cptr = 0;

    for (i = 0; i < taille; i++)
        if (bloc[i] == 'G' || bloc[i] == 'C')
            cptr++;

    return cptr;
}

void * threads(void *arg) {
    struct arg_s *args = (struct arg_s *) arg;
    args->ret = compteur_gc(args->bloc, args->taille);
}

long competeur_gc_thread(char * tampon, unsigned long taille, int nbthreads) {
    int i;
    pthread_t *t;
    struct arg_s **args;
    unsigned long taille_seg;
    unsigned long ret = 0;

    t = (pthread_t*) malloc(sizeof(pthread_t) * nbthreads);
    assert(t != NULL);

    args = (struct arg_s **) malloc(sizeof(struct args_s *) * nbthreads);
    assert(args != NULL);

    taille_seg = taille / nbthreads;

    for(i = 0; i < nbthreads - 1; i++) {
        args[i] = (struct arg_s *) malloc(sizeof(struct arg_s));
        assert(args[i] != NULL);
        args[i]->bloc = &tampon[taille_seg * i];
        args[i]->taille = taille_seg;
        args[i]->ret = 0;
        pthread_create(&(t[i]), NULL, threads, args[i]);
    }

    args[i] = (struct arg_s *) malloc(sizeof(struct arg_s));
    assert(args[i] != NULL);
    args[i]->bloc = &tampon[taille_seg * i];
    args[i]->taille = taille - taille_seg * i;
    args[i]->ret = 0;
    pthread_create(&(t[i]), NULL, threads, args[i]);

    for(i = 0; i < nbthreads; i++) {
        pthread_join(t[i], NULL);
        ret += args[i]->ret;
        free(args[i]);
    }

    free(t);
    free(args);

    return ret;
}

int main(int argc, char *argv[]) {
    struct stat st;
    int fd;
    char *tampon;
    int lus;
    unsigned long cptr = 0;
    off_t taille = 0;
    struct timespec debut, fin;

    int nbthreads;

    assert(argv[1] != NULL);
    assert(argv[2] != NULL);

    nbthreads = atoi(argv[2]);
    assert(nbthreads > 0);

    /* Quelle taille ? */
    assert(stat(argv[1], &st) != -1);
    tampon = malloc(st.st_size);
    assert(tampon != NULL);

    /* Chargement en mémoire */
    fd = open(argv[1], O_RDONLY);
    assert(fd != -1);
    while ((lus = read(fd, tampon + taille, st.st_size - taille)) > 0)
        taille += lus;
    assert(lus != -1);
    assert(taille == st.st_size);
    close(fd);

    /* Calcul proprement dit */
    assert(clock_gettime(CLOCK_MONOTONIC, &debut) != -1);
    cptr = competeur_gc_thread(tampon, taille, nbthreads);
    assert(clock_gettime(CLOCK_MONOTONIC, &fin) != -1);

    /* Affichage des résultats */
    //printf("Nombres de GC:   %ld\n", cptr);
    //printf("Taux de GC:      %lf\n", ((double)cptr) / ((double)taille));

    fin.tv_sec  -= debut.tv_sec;
    fin.tv_nsec -= debut.tv_nsec;
    if (fin.tv_nsec < 0) {
        fin.tv_sec--;
        fin.tv_nsec += 1000000000;
    }

    //printf("Durée de calcul: %ld.%09ld\n", fin.tv_sec, fin.tv_nsec);
    //printf("(Attention: très peu de chiffres après la virgule sont réellement significatifs !)\n");

    printf("%d %d %ld.%09ld\n", (int)st.st_size, nbthreads, fin.tv_sec, fin.tv_nsec);
    printf("%d\n", compteur_gc(tampon, taille));

    return 0;
}
