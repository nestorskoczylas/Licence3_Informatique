JC = javac

all: receiveUDP.class sendUDP.class test

receiveUDP.class: receiveUDP.java
	$(JC) $^

sendUDP.class: sendUDP.java
	$(JC) $^

test: receiveUDP.class sendUDP.class
	java receiveUDP &
	java sendUDP "test validé"

clean:
	rm -rf *.class *~
