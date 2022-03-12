FRET Gaëlle
SKOCZYLAS Nestor

#TP1 : Étude des sockets

##UDP

6- Pour envoyer un message a mon voisin, j'ai besoin de son  adresse IPv4 et du port de sa socket.


8- Selon nous, il préférable de laisser le système choisir le port sur la machine qui envoie. Toutefois, il faut choisir sur quel port le message est reçu.


15-b 
    Client                                  Serveur
Adresse IP : 127.0.0.1                  Adresse IP : 127.0.0.1
Port UDP : 35585                        Port UDP : 57883

        |----message="Comment allez vous ?"---->|
        |                                       |
        |<------message="Très bien. Merci !"----|


15-c Deux segments UDP ont été transmis.


15-d Efficacité du protocole :          taille du message en octects
                                      ____________________________________
                                      taille totale des données transmises
    Premier message : 20/62 = 0.32
    Deuxième message : 18/60 = 0.3

##TCP

4- Nous constatons que la connexion a été refusé.


6- La socket serveur est s2 et la socket s1 est la client.


7- On observe une poingné de main.


9- Une nouvelle socket a été créée, lors de l'exécution de la commande *status*


11-a Si le flag PSH (push) n'avait pas été activé par l'émetteur, le message n'aurait pas pu passer les différentes couches sans être "bufferisé"


11-b Le numéro de séquence représente le propre numéro de séquence de l'émetteur TCP.


11-c Le numéro d'acquittement représente le numéro de séquence du destinataire.


11-d Numéro d'acquittement - Numéro de séquence du paquet envoyé = Nombre de bytes envoyé.
            21 - 1 = 20 bytes


12- Le champ Recv-Q associé à la connexion précédemment établie correspond au nombre de bytes envoyés en attente de lecture, soit 20.


13- L'id_socket est la socket renvoyée par la commande socket.


14- La valeur du champ Recv-Q est désormais de 0.


15- out : ferme la socket S1 qui est la socket client. L'autre socket peut toujours envoyer des messages.


18-a 127.0.0.1:5000                                                  127.0.0.1:6000
        |-----[PSH,ACK] ACK=1 SEQ=1 message="Comment allez-vous ?"------->|
        |<---------ACK=21 SEQ=1-------------------------------------------|
        |---------ACK=2 SEQ=21 "Très bien. Merci!"----------------------->|
        |<---------[PSH,ACK]ACK=39 SEQ=2----------------------------------|

    Avant ça il y a eu la poignée de main avec le SYN (envoyé de client vers serveur) puis le SYN-ACK (du serveur vers le client) puis l'ACK (du client vers le serveur) afin d'établir la connexion. A partir de ce moment, les messages ont pu être envoyés.


18-b Il y a eu 4 segments transmis (pour l'envoi des deux messages donc sans compter les 3 segments de la poignée de main) comparé à 2 segments (en tout) pour UDP.


18-c Efficacité du protocole des deux messages : 20/86 = 0.23 et 18/84 = 0.21.
     En comparaison UDP a une efficacité d'environ 0.3 donc une efficacité qui est meilleure.



En conclusion : 
UDP : + meilleure vitesse et efficacité
      - peu fiable car il n'y a pas de vérification à la réception que les données ne sont pas corrompues il y a donc des pertes possibles

TCP : + fiable grâce à la vérification des données à la réception donc aucune perte
      - moins bonne vitesse et efficacité
