JC = javac

all: receiveUDP.class sendUDP.class test

receiveUDP.class: receiveUDP.java
	$(JC) $^

sendUDP.class: sendUDP.java
	$(JC) $^

test: receiveUDP.class sendUDP.class
	java receiveUDP 1500 &
	java sendUDP localhost 1500 "test validé"

clean:
	rm -rf *.class *~
