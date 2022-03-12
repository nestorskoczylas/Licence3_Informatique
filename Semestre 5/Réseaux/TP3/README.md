# TP Réseaux #2 : UDP & Multicast
### <u>Binôme</u> : FRET Gaëlle & SKOCZYLAS Nestor
</br>

#### Commandes :


<u>Pour l'exercice 1 :</u>

Utilisez `make` dans le terminal de commande pour compiler les fichiers.
Pour tester, entrez `java serverTCP` dans un terminal et `telnet localhost 2021` dans un autre.

<u>Pour l'exercice 2 :</u>

Utilisez `make` dans le terminal de commande pour compiler les fichiers.<br>
Pour tester, ouvrez plusieurs terminaux de commandes :
- Dans le premier : entrez `java ServerTCP 2021`
- Dans le deuxième, le troisième et de même pour les suivants : entrez `java ClientTCP localhost 2021`

Vous pouvez désormais communiquer, sur le tchat, avec tous les utilisateurs s'y trouvant. Pour quitter le tchat, entrez `:q`, cette commande vous permettra de quitter le serveur de tchat. Toutefois, lorsque tous les utilisateurs ont quitté le serveur alors il se ferme.


#### Exercice 1 :

<u>Q1. Quelles sont les étapes du traitement d'une requête ?</u><br>

Les étapes de traitement d'une requête sont :
* accepter la requête de connexion au serveur
* ecrire le message voulu sur l'output de la socket
* fermer la connexion avec la socket

<u>Q2. Quelles sont les exceptions à traiter pour chaque étape de votre programme ? S'assurer que chacune est bien affiché à l'administrateur du serveur</u><br>

Par étape du programme, les exceptions à traiter sont :
- Pour la création du ServerSocket -> une IOException - si la socket est déjà prise.
- Pour le accept() -> une IOException - si une erreur d'E/S se produit lors de l'attente d'une connexion.
- Pour le getOutputStream() -> IOException - si une erreur d'E/S se produit lors de la création du flux de sortie ou si le socket n'est pas connecté.
- Pour le close() -> IOException - si une erreur d'E/S se produit lors de la fermeture de cette socket.

Toutes ces exceptions sont gérées grâce au try/catch.

<u>Q3. Une fois le programme réalisé, comment en tester son bon fonctionnement ?</u><br>

Pour tester le bon fonctionnement du programme grâce à telnet on execute la commande :
`telnet <IP Serveur> <2021>`

On pourrait aussi vérifier grâce à Socklab ainsi :
1. création une socket tcp
2. bind de la socket grâce à une adresse IP et un port (ex : adresse IP eth 0 et port 3000)
3. connection de la socket au serveur -> `connect <Id Socket> <Adresse IP serveur> <Port serveur>` (en utilisant le port 2021)
4. affichage du message grâce à la commande `read <ID socket> <taille du message envoyé par le serveur>`

<u>Q4. S'assurer que le programme fonctionne en boucle, c'est-a-dire, qu'il traite plusieurs requêtes les unes après les autres. Ce faisant, le serveur peut recevoir une succession de requêtes de  différents clients : comment garder la trace toutes les connections ayant eu lieu ?
</u><br>

Afin de garder une trâce de toutes les connextions ayant eu lieu, le serveur affiche sur la sortie standard, l'adresse IP et le port de chaque nouvelle connexion.

#### Exercice 2 :

<u>Q1. Comment et quand créer un nouveau Thread pour un client dans votre programme ?</u><br>

Pour créer un nouveau Thread pour un client dans un programme, il faut implémenter l'interface Runnable ainsi que sa méthode la méthode `run()` que l'on surcharge, qui retourne un void, ne prend aucun paramètre et ne déclare pas d'exceptions.
On doit créer un Thread quand il y a plusieurs personnes sur un serveur.

<u>Q2. Quelles sont les primitives permettant de recevoir des chaines de caractères sur une Socket ?</u><br>

Les primitives permettant de recevoir des chaines de caractères sur une Socket sont socket, bind et connect.

<u>Q3. Comment faire pour retransmettre ces chaînes vers tous les utilisateurs connectés ? Comment partager en Java, au niveau du constructeur de chaque Thread, une structure globale visible et mise à jour par tous les Threads ?</u><br>

Pour retransmettre les chaînes de caractères vers tous les utilisateurs connectés, il faut une liste contenant le ServerTCPThread. Au niveau du constructeur de chaque Thread est initialisé la socket du ServerTCPThread, l'id de la Thread, une liste contenant les données qui iront vers les clients et une liste contenant chaque serveur Thread.

<u>Q4. S'assurer que le programme fonctionne en boucle, c'est-a-dire, qu'il traite plusieurs requêtes les unes après les autres. Ce faisant, le serveur peut recevoir une succession de requêtes de différents clients : comment garder la trace toutes les connections ayant eu lieu ?</u><br>

Dans la fonction run() de ServerTCP on sysout getRemoteAddress() de la socket comme pour l'exercice 1. Toutes les adresses IP qui se connectent s'affichent sur le serveur.

<u>Q5. Lorsqu'un client telnet quitte normalement (CTRL-D), ou alors est intempestivement arrêté, comment s'assurer du bon fonctionnement de l'application.</u><br>

Lorsqu'un client quitte le serveur, un message s'affiche sur le serveur notifiant que le client est parti et lorsque tous les clients quittent, le serveur s'arrête bien.<br>
Cependant, côté client, null s'inscrit dans le terminal suite au déclenchement de l'exception `NullPointerException`. Après, plusieurs essai le problème n'est toujours pas résolu. Il provient du fichier ClientTCP, dans la méthode `run()` où la variable `msg` devient null, sachant que la méthode `.equals()` déclenche l'exception si une variable est null.
