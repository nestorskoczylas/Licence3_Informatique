/*Ensemble de transistor*/
set TRANS;

/*Changement de solver : Minos*/
option solver minos;

/*Type de transistor : npn ou pnp*/
param type {TRANS} symbolic;

/*Maximum que peut atteindre hfe*/
param MAXHFE >= 0;
/*Maximum que peut atteindre vbe*/
param MAXVBE >= 0;

/*Coefficient d'amplification d'un transistor*/
param hfe {TRANS} >= 0, <= MAXHFE;
/*Tension base émetteur d'un transistor*/
param vbe {TRANS} >= 0, <= MAXVBE;

/*La dispersion, ce qu'il faut obtenir*/
var disp >= 0;

/*Variable dh : maximum de hi soustrait au minimum de hi*/
var dh >= 0;
/*Variable dv : maximum de vi soustrait au minimum de vi*/
var dv >= 0;

/*Maximum de hfe*/
var maxhi >= 0;
/*Minimum de hfe*/
var minhi >= 0;
/*Maximum de vbe*/
var maxvi >= 0;
/*Minimum de vbe*/
var minvi >= 0;

/*Minimisation de la dispersion*/
minimize dispersion : disp;


#Contrainte hfe et vbe pour le calcul de la dispersion

/*dh résulte de la soustraction de maxhi et minhi*/
subject to dhfe : dh = maxhi - minhi;
/*dv résulte de la soustraction de maxvi et minvi*/
subject to dvbe : dv = maxvi - minvi;


#Contrainte sur le hfe transistor

/*le transistor aillant le hfe le plus grand*/
subject to maxhfei {t in TRANS} : maxhi >= hfe[t];
/*le transistor aillant le hfe le plus petit*/
subject to minhfei {t in TRANS} : minhi <= hfe[t];


#Contrainte sur le vbe transistor

/*le transistor aillant le vbe le plus grand*/
subject to maxvbei {t in TRANS} : maxvi >= vbe[t];
/*le transistor aillant le vbe le plus petit*/
subject to minvbei {t in TRANS} : minvi <= vbe[t];


#Contrainte sur la dispersion

/*la dispersion dépend de la division entre dh et MAXHFE*/
subject to maxdh : disp = dh / MAXHFE;
/*la dispersion dépend de la division entre dv et MAXVBE*/
subject to maxdv : disp = dv / MAXVBE;

data;

param MAXHFE := 600;
param MAXVBE := 1.0;

param : TRANS : hfe         vbe         type =
        T1      369.713399  0.505002    npn
        T2      172.445927  0.527908    pnp
        T3      388.349744  0.678436    pnp
        T4      345.246256  0.506357    pnp
        T5      159.318987  0.601071    pnp
        T6      330.622531  0.643204    npn
        T7      160.220311  0.617853    pnp
        T8      429.403684  0.531932    npn
        T9      220.125258  0.531096    npn
        T10     101.105138  0.575985    npn
        T11     473.747183  0.620745    pnp
        T12     414.865893  0.607246    npn
        T13     89.400099   0.558636    npn
        T14     338.676073  0.640914    pnp
        T15     380.631659  0.654614    pnp
        T16     477.658861  0.673297    npn
        T17     188.986802  0.627137    npn
        T18     131.327049  0.571054    npn
        T19     400.910157  0.636710    pnp
        T20     354.565503  0.534228    pnp
        T21     131.701247  0.575891    pnp
        T22     392.307125  0.668570    pnp
        T23     164.524036  0.506420    npn
        T24     250.582394  0.513238    npn
        T25     156.313272  0.599846    npn
        T26     121.435795  0.527926    npn
        T27     423.506906  0.585687    npn
        T28     230.998222  0.699465    pnp
        T29     304.763147  0.518182    pnp
        T30     480.551455  0.530568    pnp
        T31     446.039682  0.584432    pnp
        T32     242.383656  0.619178    npn;

solve;
display disp;