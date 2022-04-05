# Rendu TP1 : DNS

* Exécutez `make` pour lancer le programme `myDNS` compilé à partir de `MyDNS.c`

* Le programme ne prend aucun argument pour être exécuté

* Un message est pré-rempli dans le `main` du programme; ce message correspond à une requête DNS. Il est ensuite envoyé par un socket sur le port 53 à une IP également pré-déterminée.

* Un affichage a lieu à l'envoi (affichage du message envoyé), puis un autre à la réception (affichage du message reçu). Enfin une analyse DNS est affichée (indication de la correspondance de chaque groupe d'octets à un champ d'une entête, d'une question, d'une réponse...).
