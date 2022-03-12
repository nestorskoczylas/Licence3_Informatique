/*Ensemble de transistors*/
set TRANS;

/*Nombre de paquets de transistors*/
param P >= 0;
/*Ensemble de paquets*/
set PAIRES = 1..P;

/*Ensemble de transistors de type NPN*/
set NPN within TRANS := {t in TRANS : type[t] = "npn"}

/*Ensemble de transistors de type PNP*/
set PNP within TRANS := {t in TRANS : type[t] = "pnp"}

/*solver : Gurobi*/
option solver gurobi;

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

/*Paire de transistor de type NPN : 1 si le transistor de type npn est en binome avec un autre, sinon 0*/
var binome_npn {TRANS, NPN} binary;

/*Paire de transistor de type PNP : 1 si le transistor de type pnp est en binome avec un autre, sinon 0*/
var binome_pnp {TRANS, PNP} binary; 


# A PARTIR D'ICI LE MODEL DOIT ETRE MODIFIER POUR PRENDRE EN COMPTE LES NOUVEAUX ENSEMBLES ET BINARY :
# LE BINARY est_affecte DOIT ETRE REMPLACÉ PAR LES NOUVEAUX BINARY binome_npn ET binome_pnp
# LES VARIABLES DOIVENT ETRE ATTACHEES AUX NOUVEAUX ENSEMBLES
# LA SEULE SOLUTION TROUVEE EST DE MULTIPLIER PAR DEUX TOUTES LES VARIABLES ET CONTRAINTES UTILISANT LES NOUVEAUX ENSEMBLES OU BINARY 
# MAIS ON SE RETROUVE ALORS AVEC L'ERREUR DISANT QU'ON UTILISE TROP DE VARIABLES ET CONTRAINTES


/*La dispersion d'un paquet selon son type*/
var disp {PAIRES} >= 0;

/*Variable dh : maximum de hi soustrait au minimum de hi*/
var dh {PAIRES} >= 0;
/*Variable dv : maximum de vi soustrait au minimum de vi*/
var dv {PAIRES} >= 0;

/*Dispersion moyenne des paquets*/
var moyenne_disp >= 0;


/*Maximum d'hfe*/
var maxhi {PAIRES} >= 0;
/*Minimum d'hfe*/
var minhi {PAIRES >= 0;
/*Maximum de vbe*/
var maxvi {PAIRES} >= 0;
/*Minimum de vbe*/
var minvi {PAIRES} >= 0;


#ne change pas dans cette question
/*Minimisation de la dispersion*/
minimize dispersion : moyenne_disp;


#Contrainte hfe et vbe pour le calcul de la dispersion

/*dh résulte de la soustraction de maxhi et minhi*/
subject to dhfe {p in PAIRES} : dh[p] = maxhi[p] - minhi[p];
/*dv résulte de la soustraction de maxvi et minvi*/
subject to dvbe {p in PAIRES} : dv[p] = maxvi[p] - minvi[p];


#Contrainte sur le hfe transistor

/*On multiplie par le binary correspondant commme ça si le binary vaut 1 c'est que le transistor se trouve dans l'ensemble correspondant au binary donc on garde la valeur de hfe
 sinon on garde 0 pour max et max pour min (comme pour la Q4)*/
subject to maxhfei {t in TRANS, p in PAIRES} : maxhi[p] >= hfe[t] * est_affecte[t,p];
subject to minhfei {t in TRANS, p in PAIRES} : minhi[p] <= est_affecte[t,p] * hfe[t] + (1 - est_affecte[t,p]) * MAXHFE;


#Contrainte sur le vbe transistor

/*On multiplie par le binary correspondant commme ça si le binary vaut 1 c'est que le transistor se trouve dans l'ensemble correspondant au binary donc on garde la valeur de vbe
 sinon on garde 0 pour max et max pour min (comme pour la Q4)*/
subject to maxvbei {t in TRANS, p in PAIRES} : maxvi[p] >= vbe[t] * est_affecte[t,p];
subject to minvbei {t in TRANS, p in PAIRES} : minvi[p] <= est_affecte[t,p] * vbe[t] + (1 - est_affecte[t,p]) * MAXVBE;


#Contrainte sur la dispersion

/*La dispersion dépend de la division entre dh et MAXHFE*/
subject to maxdh {p in PAIRES} : disp[p] = dh[p] / MAXHFE;
/*La dispersion dépend de la division entre dv et MAXVBE*/
subject to maxdv {p in PAIRES} : disp[p] = dv[p] / MAXVBE;


#Contrainte sur la moyenne de la dispersion

/*Moyenne de la dispersion des paquets*/
subject to moyenne:
    sum {p in PAIRES} disp[p] / P = moyenne_disp;


/*Chaque transistors est affecté à un seul et unique binôme*/
subject to affectation_trans {t in TRANS} :
    sum {p in PAQUETS} est_affecte[t,p] = 1;

/*Les paquets doivent tous avoir le meme nombre de transistor (c'est à dire une différence d'effectir égale à 0)*/
subject to effectif_paquet {p1 in PAQUETS, p2 in PAQUETS} :
    (sum {t1 in TRANS} est_affecte[t1, p1]) - (sum {t2 in TRANS} est_affecte[t2, p2]) = 0;


data;

param MAXHFE := 600;
param MAXVBE := 1.0;
param P := card(TRANS)/2;

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
display binome_npn;
display binome_pnp;
display dispersion;
display disp;