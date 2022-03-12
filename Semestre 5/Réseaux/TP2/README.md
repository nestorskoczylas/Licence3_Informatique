# TP Réseaux #2 : UDP & Multicast
### <u>Binôme</u> : FRET Gaëlle & SKOCZYLAS Nestor
</br>
#### Commandes :


<u>Pour les exercice 1 & exercice 2 :</u>

Utilisez `make` dans le terminal de commande pour compiler les fichiers.
Pour tester, entrez `make test` dans le terminal.

<u>Pour l'exercice 3 :</u>

Utilisez `make` dans le terminal de commande pour compiler les fichiers.
Ensuite dans deux terminaux différents :
* dans le premier, lancez `java tchat {nickname}`
* dans le second, lancez `java tchat {nickname}`
  
Vous pouvez maintenant vous envoyer des messages l'un à l'autre.

Si vous souhaitez quitter le tchat, entrer `quit` ou `/part`. L'autre utilisateur en sera informer. Sinon vous pouvez appuyer directement sur la touche "entrée" sans taper de messages.
#### Exercice 2 :

<u>Question 1 :</u>
Pour envoyer et recevoir un paquet UDP multicast sur le réseau local il suffit de créer un multicastSocket et un datagramPacket. Ensuite, il faut instancier le port du multicast ainsi qu'une adresse ip afin de pouvoir rejoindre le "groupe".

<u>Question 2 :</u>
Les exceptions a traîter sont :
- UnknownHostException : Si l'adresse ip n'est pas trouvée/incorrecte
- IOException : Si le multicast ne se crée pas correctement, si on ne peut pas rejoindre/quitter le groupe.
#### Exercice 3 :

<u>Question 1 :</u>
Afin de réaliser un client capable d'émettre et de recevoir des paquets UDP simultanément, nous avons créé un programme avec des thread.

<u>Question 2 :</u>
Afin de pouvoir associer un nom symbolique à chaque machine, nous avons inclu la possibilité de choisir un "nom d'utilisateur" à mettre en paramètre lorsqe l'on exécute notre commade (cf les commandes de l'exercice 3 ci-dessus).

Le nickname n'est cependant pas obligatoire, s'il n'est pas indiqué par l'utilisateur, il sera automatiquement choisi (le nom "Patrick" vous sera attribué).</br>


