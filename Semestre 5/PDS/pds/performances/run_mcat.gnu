reset
set terminal png
set output "mcat.png"
set title "Influence de la taille des tampons"
set xlabel "Taille du tampon (en octets)"
set ylabel "Temps (en secondes)"
plot "mcat.dat" using 1:2 title "Temps global"