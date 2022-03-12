for ((i = 1; i < 800000; i = i * 2)); do
    printf $i
    printf " "
    /usr/bin/time -f '%e %U %S' ./mcat $i Code-du-travail.txt > /dev/null
done