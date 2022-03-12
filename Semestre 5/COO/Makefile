all: jar docs

docs :
	mvn javadoc:javadoc

jar :
	mvn package

tests :
	mvn test

clean:
	rm -r target

.PHONY : all clean
