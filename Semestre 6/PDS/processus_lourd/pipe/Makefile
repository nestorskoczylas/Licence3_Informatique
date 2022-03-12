EXEC = pipe2 pipen
CC = gcc
CFLAGS = -Wall -Wextra

all: $(EXEC) oclean



pipe2: pipe2.o
	$(CC) $(CFLAGS) -o $@ $^

pipen: pipen.o
	$(CC) $(CFLAGS) -o $@ $^



oclean:
	rm -f *.o *.gch

clean: oclean
	rm -f $(EXEC)

default:
	all

.PHONY: all oclean clean default
