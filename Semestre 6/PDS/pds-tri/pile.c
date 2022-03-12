#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <assert.h>
#include "pile.h"

void init_pile(pile * p) {
    p->dessus = 0;
}

int pile_vide(pile * p) {
    return p->dessus == 0;
}

bloc_t depile(pile * p) {
    assert(p->dessus > 0);
    p->dessus--;
    return p->contenu[p->dessus];
}

void empile(pile * p, bloc_t e) {
    if(p->dessus >= TAILLE_PILE) {
        printf("Stack overflow!\n"
               "Vous pouvez modifier la taille maximale de la pile dans pile.h.\n"
               "(Pouvez-vous prévoir de quelle taille de pile vous avez besoin ?)\n");
        abort();
    }
    p->contenu[p->dessus] = e;
    p->dessus++;
}
