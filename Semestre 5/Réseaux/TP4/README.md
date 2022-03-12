# TP4 : Liaisons de données

## Binôme SKOCZYLAS Nestor & FRET Gaëlle

<br/>

### Adressage

1.  Sur votre machine, quel est le nom de l’interface connectée au réseau de la salle de TP ? Quelle est son
adresse IPv4 ? Quelle est son adresse IPv6 ? Quelle est son adresse MAC ?

`ifconfig -a` : affiche toutes les interfaces et leurs informations

`ifconfig eth1` : affiche les informations de l'interfaces eth1

Le nom de l'interface connecté au réseau de la salle de TP est eth1.
L'adresse IPv4 est 192.168.5.70.
L'adresse IPv6 est fe80::e654:e8ff:fe59:8585.
L'adresse MAC est e4:54:e8:59:85:85.

2. Donnez les principales caractéristiques de cette interface : quelle est sa vitesse actuelle ? Est-ce la vitesse maximale supportée par l’interface ? Quel le mode de duplex ? Vérifiez que l’interface est bien
connectée.

`ethtool eth1` : affiche les paramètres de la carte réseau

Sa vitesse actuelle est de : `Speed: 1000Mb/s`.
La vitesse actuelle n'est pas la maximale supportée par l'interface. //TODO
Le mode de duplex est FULL.
L'interface est bien connectée : `Link detected: yes`

3. Quelle est la classe de l’adresse IPv4 ? Quel est son masque ? Quelle est l’adresse du réseau au format CIDR ? Quelle est l’adresse de broadcast ? Combien d’hôtes peut-on adresser sur ce réseau ? Cette adresse est-elle routable au sein d’un réseau local ? Est-elle routable sur internet ?

La classe de l'adresse IPv4 est de classe C : le premier octect est compris entre 192 et 223.
Son masque est 255.255.255.0
L'adresse du réseau au format CIDR est `/24 `
La classe C gère 254 hôtes pour un total de 2032 identificateurs d'hôte.
Oui elle est routable au sein d'un réseau local, chaque personne peut avoir une adresse différente localement.
Cette adresse n'est pas routable au sein d'un réseau internet car il s'agit d'une adresse privée, beaucoup de personnes ont la même.

4. Écrivez les 16 octets de l’adresse IPv6 sans abréviation. Écrivez en dessous les 16 octets du masque.
Combien d’hôtes peut-on adresser sur ce réseau ? Cette adresse est-elle routable au sein d’un réseau local ? Est-elle routable sur internet ? Quelle est l’étendue (scope) de cette adresse ?

L'adresse IPv6 sans abréviation est fe80:0000:0000:0000:e654:e8ff:fe59:8585
Les 16 octects du masque : ffff:ffff:ffff:ffff:0000:0000:0000:0000

`2^nombreoctectstotal - tailledemasque - 1` : calcul du nombre d'hôte

On peut adresser sur ce réseau : `2^128 - 64 -1 = 3.4028237e+38` hôtes.
Cette adresse est routable au sein d'un réseau local.
Elle n'est pas routable sur l'extérieur : scopeid
L'étendu scope de cette adresse est sur Ethernet par extension sur un réseau local uniquement.

5. Sans spécifier d'interface physique, l'interface ne sera pas la même à chaque lancement de la commande.

6. Le filtrage d'adresse ip sur wireshark : mettre sur la barre du filtre "ip.addr == 192.168.5.69"

7. Le protocole utilisait pour tester la connectivité IP est le **Internet Control Message Protocol**. Le type et le code des messages de requête et de réponse est type 3 et code 2 ou 3 ou 4.

8. Le code du contenu de la trame est 800 et celui du paquet IP est 806.

9. L'adresse matérielle de destination de la requête est l'adresse de broadcast ARP. S'il s'agit de sa propre adresse, alors une réponse ARP, avec l'adresse MAC, est transmise, ce qui permet de créer la base pour un échange de données.

10. L'adresse matérielle de destination de la requête est l'adresse de 128 bits. C'est celle par laquelle le Neighbor Advertissement a été demandé ou bien pour laquelle une nouvelle adresse MAC a été créée. L'adresse de requête est spécifier par le routeur et est obligatoire pour une requête multicast.
    
11. Ci-joint image : Correspondance entre IP et MAC

12. Les couches du modèle OSI appartenant au protocole Ethernet est la couche 2 **Liaison** et pour les protocoles IP et ICMP la couche 3 **Réseaux**.

13. L'adresse IP sert à identifier la localisation d'un appareil réseau, que ce soit sur un réseau local ou sur internet. Et l'adresse MAC permet d'identifier l'appareil, c'est sa carte d'identité.

<br/>

### Point-à-point

1. Câble croisé

2. `sudo ethtool eth1` / la vitesse : 1000Mb/s / mode duplex : FULL

3. 
```
ip route
default via 192.168.5.1 dev eth1 
default via 192.168.5.1 dev eth1 proto dhcp src 192.168.5.69 metric 100 
169.254.0.0/16 dev eth1 scope link metric 1000 
192.168.5.0/24 dev eth1 proto kernel scope link src 192.168.5.69 
192.168.5.1 dev eth1 proto dhcp scope link src 192.168.5.69 metric 100 
```

4. 
```
ping -4 192.168.5.65
PING 192.168.5.65 (192.168.5.65) 56(84) bytes of data.
64 bytes from 192.168.5.65: icmp_seq=1 ttl=64 time=0.599 ms
64 bytes from 192.168.5.65: icmp_seq=2 ttl=64 time=0.562 ms
64 bytes from 192.168.5.65: icmp_seq=3 ttl=64 time=0.753 ms
64 bytes from 192.168.5.65: icmp_seq=4 ttl=64 time=0.499 ms
64 bytes from 192.168.5.65: icmp_seq=5 ttl=64 time=0.474 ms
64 bytes from 192.168.5.65: icmp_seq=6 ttl=64 time=0.584 ms
64 bytes from 192.168.5.65: icmp_seq=7 ttl=64 time=0.653 ms
64 bytes from 192.168.5.65: icmp_seq=8 ttl=64 time=0.517 ms
64 bytes from 192.168.5.65: icmp_seq=9 ttl=64 time=0.324 ms
64 bytes from 192.168.5.65: icmp_seq=10 ttl=64 time=0.479 ms
64 bytes from 192.168.5.65: icmp_seq=11 ttl=64 time=0.661 ms
64 bytes from 192.168.5.65: icmp_seq=12 ttl=64 time=0.766 ms 
64 bytes from 192.168.5.65: icmp_seq=13 ttl=64 time=0.652 ms
64 bytes from 192.168.5.65: icmp_seq=14 ttl=64 time=0.658 ms
64 bytes from ping -4 192.168.5.65
```

5. Le test de la connectivité a bien été effectué avec notre voisin.

<br/>

### Concentrateur (hub)

1. 
```
ping -4 192.168.5.68
PING 192.168.5.68 (192.168.5.68) 56(84) bytes of data.
64 bytes from 192.168.5.68: icmp_seq=1 ttl=64 time=0.048 ms
64 bytes from 192.168.5.68: icmp_seq=2 ttl=64 time=0.054 ms
64 bytes from 192.168.5.68: icmp_seq=3 ttl=64 time=0.060 ms
64 bytes from 192.168.5.68: icmp_seq=4 ttl=64 time=0.086 ms
64 bytes from 192.168.5.68: icmp_seq=5 ttl=64 time=0.056 ms
64 bytes from 192.168.5.68: icmp_seq=6 ttl=64 time=0.075 ms
64 bytes from 192.168.5.68: icmp_seq=7 ttl=64 time=0.059 ms
64 bytes from 192.168.5.68: icmp_seq=8 ttl=64 time=0.061 ms
64 bytes from 192.168.5.68: icmp_seq=9 ttl=64 time=0.063 ms
64 bytes from 192.168.5.68: icmp_seq=10 ttl=64 time=0.061 ms
64 bytes from 192.168.5.68: icmp_seq=11 ttl=64 time=0.056 ms
64 bytes from 192.168.5.68: icmp_seq=12 ttl=64 time=0.041 ms
64 bytes from 192.168.5.68: icmp_seq=13 ttl=64 time=0.060 ms
64 bytes from 192.168.5.68: icmp_seq=14 ttl=64 time=0.059 ms
64 bytes from 192.168.5.68: icmp_seq=15 ttl=64 time=0.057 ms
64 bytes from 192.168.5.68: icmp_seq=16 ttl=64 time=0.061 ms
64 bytes from 192.168.5.68: icmp_seq=17 ttl=64 time=0.057 ms
64 bytes from 192.168.5.68: icmp_seq=18 ttl=64 time=0.052 ms
64 bytes from 192.168.5.68: icmp_seq=19 ttl=64 time=0.029 ms
64 bytes from 192.168.5.68: icmp_seq=20 ttl=64 time=0.061 ms
64 bytes from 192.168.5.68: icmp_seq=21 ttl=64 time=0.080 ms
64 bytes from 192.168.5.68: icmp_seq=22 ttl=64 time=0.053 ms
64 bytes from 192.168.5.68: icmp_seq=23 ttl=64 time=0.050 ms
```

Oui, on reçcoit les données emiss par notre propre equipement.

Le pb qu'on va rencontrer : collisions et donc perte de données.

<br/>

2. Le mode promiscuous permet de recevoir tous les paquets ip, même ceux qui ne nous sont pas adressés ("mode espion").

3. Le mode de duplex des interfaces connecté au hub est Half duplex, ce qui permet la transmission des données dans les deux sens mais pas simultanément.

4. Visuellement ça ressemble à une topologie en étoile mais physiquement c'est un bus.

5. 
```
iperf -c 10.20.30.40
------------------------------------------------------------
Client connecting to 10.20.30.40, TCP port 5001
TCP window size: 85.0 KByte (default)
------------------------------------------------------------
[  3] local 10.20.10.20 port 50334 connected with 10.20.30.40 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.1 sec  11.6 MBytes  9.70 Mbits/sec
```
La commande permettant d'afficher le nombre de collisions ne fonctionne pas : `ip -0 link afstats dev eth0`

<br/>

### Commutateur (switch)

1. Le dialogue entre 2 portes ne peut pas être capturé par un 3è. Car point à point

2. Communication Full duplex : envoie et reception sans collision

3. Topologie Virtuelle et logique : Etoile

4. Pas de collisions, Bande passante pas partagé

5. Le Commutateur (switch) lit l'adresse MAC Source d'une trame Ethernet et fait correspondre avec le port d'entré du Commutateur (switch)

6. Le switch lit l'entête Ethernet des trames Ethernet pour transmettre sur le bon port.

7. Meilleur performance / Meilleur sécurité

8. Plusieurs connexions peuvent être établies au même moment sur une interface physique, par exemple Ethernet.

9. Après le ping sur l'adresse broadcast toutes les postes connectés sur le switch reçoivent le ping. C'est un transfert broadcast. L'adresse ethernet de destination des trames est ff:ff:ff:ff:ff:ff.

10. Après le ping sur l'adresse ff02:1 toutes les postes connectés reçoivent le ping. C'est un transfert multicast. L'adresse ethernet de destination des trames est 33:33:00:00:00:01.

# Routeur

1. La configuration des adresses IP sur les interfaces a été réalisé.

2. Un route a bien été créée entre les postes.

3. TTL décrémenté de 1 par le routeur.

4. Un routeur de transit arrive à la valeur 0 après qu'il est décrémenté le paquet détruit.

5. 

6. Grâce au champ Gateway de la table de routage

7. Schéma des couches OSI utilisées dans chaque équipement mis en jeu dans le transfert unicast

8. Message Erreur ICMP : TTL excelded

TTL : sécurité boucle infinie
Switch : boucle infinie pas de sécurité

9. Sur le troisième poste, on peut remarquer des réponses de l'adresse du routeur de droite. Mais rien sur les deux premiers postes.

10. Le mode de transfert est désactivé par défaut pour des raisons de sécurité et de confidentialité.

11. La diffusion unicast s'effectue de machine à machine, la diffusion limitée s'effectue d'une machine à plusieurs machines, dans son sous-réseaux et la diffusion dirigée s'effectue de machine à plusieurs machines, dans tous les sous réseaux.

12. La différence entre un routeur et un switch est : 
    * le switch lit l'entête Ethernet des trames Ethernet et ne lit pas l'entete IP;
    * le switch se trouve sur la couche liason de niveau 2;
    * le routeur lit l'entête ip;
    * le routeur se trouve sur la couche réseau de niveau 3.

