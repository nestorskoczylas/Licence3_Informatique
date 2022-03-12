CC = gcc

run : myDNS MyDNS.c
	./MyDNS

DNSsimple : DNSsimple.c
	$(CC) $? -o $@

sender : Sender.c
	$(CC) $? -o $@

receiver : Receiver.c
	$(CC) $? -o $@

myDNS : MyDNS.c
	$(CC) $? -o $@ -Wall

clean:
	rm -f sender receiver DNSsimple myDNS
