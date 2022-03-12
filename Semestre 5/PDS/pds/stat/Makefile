CC      = gcc
CFLAGS  = -Wall -Wextra
CFLAGS += -D_XOPEN_SOURCE=500
CFLAGS += -g

all: stat

stat : stat.o
	$(CC) $(CFLAGS) -o stat stat.o

stat.o : stat.c
	$(CC) $(CFLAGS) -c stat.c

clean:
	rm -f *.o stat

.PHONY : all clean