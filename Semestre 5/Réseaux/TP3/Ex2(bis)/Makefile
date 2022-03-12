JC = javac

all: ClientTCP.class ServerTCP.class ServerTCPThread.class

ClientTCP.class: ClientTCP.java
	$(JC) $^

ServerTCP.class: ServerTCP.java
	$(JC) $^

ServerTCPThread.class: ServerTCPThread.java
	$(JC) $^

clean:
	rm -rf *.class *~
