# Décodage du format tar

## Binome : SKOCZYLAS Nestor & FRET Gaëlle

## Questions traitées


### Exercice 17

```$ tree
.
├── lstar.c
├── Makefile
├── RAPPORT.md
├── README.md
├── test
├── test.tar
├── test1.tar
└── vide
```

Créé deux fichiers ordinaires, "vide" de 0 octet et "test" contenant 20 octets, et créez une archive `test.tar` en lancant :

```$ bash
tar -H ustar -c vide test > test.tar
```

On obtient à présent :

```$ tree
.
├── RAPPORT.md
├── README.md
├── tar.c
├── test
├── test.tar
└── vide
```

Pour lire le contenu de l'archive :

```$ bash
tar -tv < test.tar

-rw-r--r-- skoczylas/l3      0 2021-10-15 08:21 vide
-rw-r--r-- skoczylas/l3     20 2021-10-15 08:21 test
```

Pour lire le contenu de l'archive et la décoder à la main, utilisez l'outil "od" :

```$ bash
od -Ad -t x1z -v test.tar

0000000 76 69 64 65 00 00 00 00 00 00 00 00 00 00 00 00  >vide............<
0000016 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000032 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
...
0010208 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0010224 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0010240
```

L'affichage produit est assez long, utilisez un tube avec la commande `less` pour afficher la sortie de `od` page par page :

```$ bash
od -Ad -t x1z -v test.tar | less

0000000 76 69 64 65 00 00 00 00 00 00 00 00 00 00 00 00  >vide............<
0000016 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000032 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000048 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000064 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000080 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000096 00 00 00 00 30 30 30 30 36 34 34 00 30 30 32 34  >....0000644.0024<
0000112 30 35 34 00 30 30 30 32 34 32 34 00 30 30 30 30  >054.0002424.0000<
0000128 30 30 30 30 30 30 30 00 31 34 31 33 32 32 31 36  >0000000.14132216<
0000144 37 34 35 00 30 31 32 33 34 36 00 20 30 00 00 00  >745.012346. 0...<
0000160 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000176 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000192 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000208 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
0000224 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  >................<
:
```

Dans `less`, les touches "page précédente" et "page suivante" permettent de vous déplacer et "q" permet de quitter.

Il est également possible d'enchaîner toutes les commandes d'un coup :

```$ bash
tar -H ustar -c vide test | od -Ad -t x1z -v | less
```

### Exercice 18

``` $ bash
./lstar

1024
1536
```

Cette commande permettait au début du TP de vérifier si la fonction `amount512()` fonctionnait ou non.<br/>
Si l'on veut la lancer, il faut commenter tout le code sauf `amount512()`.

### Exercice 19

``` bash
tar -H ustar -c vide test | ./lstar test.tar

0
```

La permière version de `lstar` ne peut donner que la taille (en octets) du premier block de donnée de l'archive.

### Exercice 20

``` bash
tar -H ustar -c vide test | ./lstar test.tar

0
20
```

En ajoutant la lecture d'un autre block, on affiche déshormais deux block de donnée de l'archive.

### Exercice 21

``` bash
tar -H ustar -c vide test | ./lstar test.tar

0
20
```

`lseek` permet ici d'appliquer le même procédé à tous les blocks de l'archive.<br/>
`magic()` et `version()` permettent la vérification de ces deux champs.

### Exercice 22

``` bash
tar -H ustar -c vide test | ./lstar test.tar

Nom : vide
Taille : 0
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:25

Nom : test
Taille : 20
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:19
```

> `posix.name` correspond au nom du fichier<br/>
`getcwd()` permet d'avoir le chemin complet du fichier<br/>
`type()` fonction indiquant le type du fichier<br/>
`mode()` fonction correspondant aux droits d'accès du fichier<br/>
`date_modification()` fonction permettant d'avoir la date de modification

### Exercice 23

``` bash
tar -H ustar -c vide test | ./lstar

Nom : vide
Taille : 0
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:25

Nom : test
Taille : 20
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:19
```

Une boucle `while` permet d'avancer au block suivant (octets de bourrage).

### Exercice 24

``` bash
tar -H ustar -c vide test | ./lstar

Nom : vide
Taille : 0
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:25
Checksum : 6185

Nom : test
Taille : 20
Chemin complet : /mnt/c/Users/Utilisateur/Desktop/Licence Informatique/Semestre 5/Programmation Des Systèmes/pds/tar
Type du fichier : Regular file
Droits d accès : 0644 | rw-r--r--
Date de modification : 15/10/2021 08:21:19
Checksum : 6211
```

La fonction `checksum()` verifie si la somme de contrôle, *checksum*, est correcte.<br/>
On compare ici la somme de tous les autres champs au champ `posix.chksum`, si l'assertion est correct le fichier n'est pas corrompu sinon une erreur se déclenche.

## Questions non-traitées

Toutes les questions ont été traitées.

## Notions

* utilisation de la structure `posix_header`
* commandes tar
