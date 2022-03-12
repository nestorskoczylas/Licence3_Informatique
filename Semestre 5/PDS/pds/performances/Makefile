CC      = gcc
CFLAGS  = -Wall -Wextra
CFLAGS += -D_XOPEN_SOURCE=500
CFLAGS += -g

all: mcat mcat-lib

mcat : mcat.o
	$(CC) $(CFLAGS) -o mcat mcat.o

mcat.o : mcat.c
	$(CC) $(CFLAGS) -c mcat.c

mcat-lib : mcat-lib.o
	$(CC) $(CFLAGS) -o mcat-lib mcat-lib.o

mcat-lib.o : mcat-lib.c
	$(CC) $(CFLAGS) -c mcat-lib.c

clean:
	rm -f *.o mcat mcat-lib

.PHONY : all clean