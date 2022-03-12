CC      = gcc

CFLAGS  = -Wall -Wextra
CFLAGS += -g

LDFLAGS = -pthread

TOUS := aleazard compteur-gc rdv exclusion_mutuelle fibonacci

tout: ${TOUS}

aleazard: aleazard.c
	${CC} ${CFLAGS} $< -o $@ ${LDFLAGS}

compteur-gc: compteur-gc.c
	${CC} ${CFLAGS} $< -o $@ ${LDFLAGS}

rdv: rdv.c
	${CC} ${CFLAGS} $< -o $@ ${LDFLAGS}

exclusion_mutuelle: exclusion_mutuelle.c
	${CC} ${CFLAGS} $< -o $@ ${LDFLAGS}

fibonacci: fibonacci.c
	${CC} ${CFLAGS} $< -o $@ ${LDFLAGS}

clean:
	rm -f core *.o

realclean: clean
	rm -f ${TOUS}

.PHONY: all clean realclean
