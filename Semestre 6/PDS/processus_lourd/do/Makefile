EXEC = do
CC = gcc
CFLAGS = -Wall -Wextra

all: $(EXEC) oclean



$(EXEC): $(EXEC).o
	$(CC) $(CFLAGS) -o $@ $^



oclean:
	rm -f *.o

clean: oclean
	rm -f $(EXEC)

default:
	all

.PHONY: all oclean clean default
