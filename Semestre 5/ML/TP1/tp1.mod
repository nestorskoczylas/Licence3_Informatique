/*
var x1 >= 0;
var x2 >= 0;
maximize z : 25*x1 + 30*x2;
subject to bandes : x1 <= 6000;
subject to rouleaux : x2 <= 4000;
subject to production : (1/200)*x1 + (1/140)*x2 <= 40;
solve;
display z, x1, x2;
*/

/*fichier .mod
set PROD;
param heures_ouvrees >= 0;
param vitesse_production {PROD} >= 0;
param prix_vente {PROD} >= 0;
param vente_max {PROD} >= 0;
var qte_produite {p in PROD} >= 0, <= vente_max [p];
maximize profit :
    sum {p in PROD} qte_produite [p] * prix_vente [p];
subject to production_limitee :
    sum {p in PROD} (qte_produite[p] / vitesse_production [p]) <= heures_ouvrees;
*/

/*data; obsolète si séparation en deux fichiers .mod et .dat*/

/*fichier .dat
set PROD := bandes rouleaux;
param heures_ouvrees := 40;
param : vitesse_production prix_vente vente_max :=
bandes          200          25          6000
rouleaux        140          30          4000;
*/

/*Exercice 2 TD1*/

set PUB;
param cout {PUB} >= 0;
param audience {PUB} >= 0;
param budget >= 0;

param tps {PUB} >= 0;
var temps {p in PUB} >= tps[p];

param pers_sem_disp >= 0;
param personnes {PUB} >= 0;

maximize customers :
    sum {p in PUB} temps [p] * audience [p];

subject to prix :
    sum {p in PUB} (cout [p] * temps [p]) <= budget;

subject to personnel :
    sum {p in PUB} ( temps [p] * personnes [p] ) <= pers_sem_disp;

data;

set PUB := tele mag;
param budget := 1000000;
param pers_sem_disp := 100;
param : cout    audience    tps     personnes:=
tele    20000   1800000     10      1
mag     10000   1000000     2       3;
radio   2000    250000      120     0.2;

solve;
display temps;

/*
MINOS 5.51: optimal solution found.
2 iterations, objective 9.2e+07
temps [*] :=
 mag  20
tele  40
;
*/

/*
MINOS 5.51: optimal solution found.
2 iterations, objective 1.18e+08
temps [*] :=
  mag    0
radio  400
 tele   10
;
*/

/*
MINOS 5.51: optimal solution found.
2 iterations, objective 117500000
temps [*] :=
  mag    2
radio  390
 tele   10
;
*/