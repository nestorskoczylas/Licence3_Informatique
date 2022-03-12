JC = javac                 

all: tchat.class

receiveUDP.class: receiveUDP.java
	$(JC) $^

sendUDP.class: sendUDP.java
	$(JC) $^

tchat.class: tchat.java sendUDP.class receiveUDP.class
	$(JC) tchat.java

clean:
	rm -rf *.class *~
