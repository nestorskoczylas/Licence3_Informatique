# Quelques commandes Unix

## Binome : SKOCZYLAS Nestor & FRET Gaëlle

### Questions traitées

Nous avons traité toutes les questions.

Les difficultés que nous avons rencontré sont : 
- la prise en main du man avec la navigation entre toutes les notions à retrouver
- comprendre comment les droits d'accès fonctionnent et ainsi appliquer les masques afin de récupérer les bonnes informations

### Exercice 5

Nous avons créé un fichier test et nous avons exécuté la commande :

```bash
stat test
```

Les données suivantes s'affichent : 

```bash
File: test.txt
Size: 364       	Blocks: 8          IO Block: 1048576 regular file
Device: 3dh/61d	Inode: 111947356   Links: 1
Access: (0644/-rw-r--r--)  Uid: (10284/skoczylas)   Gid: ( 1300/      l3)
Access: 2021-09-17 08:18:21.786107786 +0200
Modify: 2021-09-17 08:21:55.606394619 +0200
Change: 2021-09-17 08:21:55.606394619 +0200
Birth: -
```
Nous ne comprenons pas la plupart des champs.

### Exercice 6

En executant la commande :

```bash
whatis stat
```

Nous obtenons :

``` bash
stat (1)             - display file or file system status
stat (2)             - get file status
```

Avec les commandes :

```bash
man stat
```

```bash
man 2 stat
```

Nous avons pu lire les documentations sur les deux pages.


### Exercice 7

L'appel système qui permet à la commande "stat" d'obtenir les métadonnées qu'elle affiche est ls.
Le type utilisé en C pour les représenter est une structure.

Blocks : il s'agit du nombre de blocs alloués dans un fichier.
I/O Blocks : la taille des blocs pour le fichier du système.


### Exercice 8

Le seuil de taille pour lequel le nombre de blocs augmente est de 4097B.
Le nombre de blocs passent alors de 8 à 16 : ils augmentent de 8 en 8.
La taille de 8 blocs est de 4096B (1 bloc = 512B).


### Exercice 9

Création du lien physique :

```bash
ln test.txt testLienPhysique
```

Création du lien symbolique :

```bash
ln -s test.txt testLienSymbolique
```

Création de la copie :

```bash
cp test.txt testCopy
```

### Exercice 10

```bash
$ stat test.txt

Fichier : test.txt
Taille : 1330      	Blocs : 8          Blocs d E/S : 4096   fichier
Périphérique : 806h/2054d	Inœud : 7214454     Liens : 2
Accès : (0664/-rw-rw-r--)  UID : ( 1000/  gaelle)   GID : ( 1000/  gaelle)
Accès : 2021-09-27 17:05:01.085088212 +0200
Modif. : 2021-09-27 17:04:14.261112398 +0200
Changt : 2021-09-27 17:04:21.305108824 +0200
Créé : -
```

```bash
$ stat testLienPhysique

Fichier : testLienPhysique
Taille : 1330      	Blocs : 8          Blocs d E/S : 4096   fichier
Périphérique : 806h/2054d	Inœud : 7214454     Liens : 2
Accès : (0664/-rw-rw-r--)  UID : ( 1000/  gaelle)   GID : ( 1000/  gaelle)
Accès : 2021-09-27 17:05:01.085088212 +0200
Modif. : 2021-09-27 17:04:14.261112398 +0200
Changt : 2021-09-27 17:04:21.305108824 +0200
Créé : -
```

```bash
$ stat testLienSymbolique

Fichier : testLienSymbolique -> test.txt
Taille : 8         	Blocs : 0          Blocs d E/S : 4096   lien symbolique
Périphérique : 806h/2054d	Inœud : 7214453     Liens : 1
Accès : (0777/lrwxrwxrwx)  UID : ( 1000/  gaelle)   GID : ( 1000/  gaelle)
Accès : 2021-09-27 17:04:48.157094981 +0200
Modif. : 2021-09-27 17:04:48.157094981 +0200
Changt : 2021-09-27 17:04:48.157094981 +0200
Créé : -
```

```bash
$ stat testCopy

Fichier : testCopy
Taille : 1330      	Blocs : 8          Blocs d E/S : 4096   fichier
Périphérique : 806h/2054d	Inœud : 7214455     Liens : 1
Accès : (0664/-rw-rw-r--)  UID : ( 1000/  gaelle)   GID : ( 1000/  gaelle)
Accès : 2021-09-27 17:05:01.085088212 +0200
Modif. : 2021-09-27 17:05:01.085088212 +0200
Changt : 2021-09-27 17:05:01.085088212 +0200
Créé : -
```

Le champ "liens" : Le fichier initial et le lien physique ont tous les deux deux liens comparé au lien symbolique et à la copie.
Les numéros d'i-noeuds : le lien physique et le fichier original ont le même numéro d'I-noeud comparé au lien symboliqe et à la copie.

En supprimant le fichier source, on peut retrouver le texte avec le lien physique et la copie mais pas avec le lien symbolique (que nous ne pouvons plus ouvrir).


## Notions du TP :

Ce TP nous a permis de comprendre les différents champs qui caractérisent un fichier (champs de la commande stat).

Nous avons compris ce qu'était la commande stat et comment elle fonctionne en la réimplémentant.

Ce TP nous a aussi permis de manipuler le man et de comprendre comment il fonctionne.

Enfin nous avons pu faire la différence entre lien physique, symbolique et copie.
