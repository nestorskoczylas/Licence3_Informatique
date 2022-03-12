reset
set terminal png size 900,800
set output "genome.png"
set title "Calcul du taux de GC"
set xlabel "Taille du fichier"
set ylabel "Nombre de threads"
set zlabel "Temps"
set dgrid3d 30,30
set pm3d
splot "genome.dat" using 1:2:3 with lines title "Calcul du taux de GC"