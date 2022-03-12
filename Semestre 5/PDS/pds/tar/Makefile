CC      = gcc
CFLAGS  = -Wall -Wextra
CFLAGS += -D_XOPEN_SOURCE=500
CFLAGS += -g

all: lstar

lstar : lstar.o
	$(CC) $(CFLAGS) -o lstar lstar.o

lstar.o : lstar.c
	$(CC) $(CFLAGS) -c lstar.c

clean:
	rm -f *.o lstar

.PHONY : all clean