# TP ROUTAGE

## Binôme LEDUN & SKOCZYLAS

<br>

### Routage statique

1. Affichez la table de routage des routeurs. Que constatez-vous ?
    > En effectuant la commande `route` dans les terminaux des routeurs, on constate que :
    ```bash
    Kernel IP routing table
    Destination     Gateway     Genmask     Flags Metric Ref    Use Iface
    ```
    En effet la table de routage est vide, car aucun routeur n'a été configuré.

2. Configurez et activez les interfaces des routeurs en vous basant sur l’adressage IP vu en TD.
Affichez la table de routage des routeurs. Pourquoi les tables de routage ne sont-elles pas vides ?
    ```bash
    R1:~# ip a add 211.230.193.1/26 dev eth0
    R1:~# ip a add 211.230.193.129/26 dev eth1
    R2:~# ip a add 211.230.193.2/26 dev eth0
    R2:~# ip a add 211.230.193.65/26 dev eth1
    R3:~# ip a add 211.230.193.130/26 dev eth0
    R3:~# ip a add 211.230.193.193/26 dev eth1
    ```
    > En tapant `ip a` on peut vérifier dans chaque interface de routeur que eth0 et eth1 sont liées aux bonnes IP.
    ```bash
    R1:~# ip link set dev eth0 up
    R1:~# ip link set dev eth1 up
    R2:~# ip link set dev eth0 up
    R2:~# ip link set dev eth1 up
    R3:~# ip link set dev eth0 up
    R3:~# ip link set dev eth1 up
    ```
    > Cette commande permet d'activer les interfaces de routages.

3. Affichez la table de routage des routeurs. Pourquoi les tables de routage ne sont-elles pas
vides ?
    ```bash
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.0   *               255.255.255.192 U     0      0        0 eth0
    211.230.193.128 *               255.255.255.192 U     0      0        0 eth1

    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.0   *               255.255.255.192 U     0      0        0 eth0
    211.230.193.64  *               255.255.255.192 U     0      0        0 eth1

    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.128 *               255.255.255.192 U     0      0        0 eth0
    211.230.193.192 *               255.255.255.192 U     0      0        0 eth1
    ```
    > Parce qu'on vient de les activer.

* Quelle est la particularité des routes déjà présentes ?    
    > Elle n'utilise pas de *Gateway*.

* Que signifie « scope link » ?
    > Cela signifie que l'adresse IPv4 a une portée locale (contrairement à l'IPv6 qui a une *scope* globale)

4. Configurez les tables de routage de manière à ce que les 3 routeurs puissent envoyer des
données (ping) vers les 4 réseaux a, b, A et B.
    ```bash
    R1:~# ip route add 211.230.193.64/26 via 211.230.193.2 dev eth0
    R1:~# ip route add 211.230.193.192/26 via 211.230.193.130 dev eth1
    R2:~# ip route add 211.230.193.192/26 via 211.230.193.1
    R2:~# ip route add 211.230.193.128/26 via 211.230.193.1
    R3:~# ip route add 211.230.193.64/26 via 211.230.193.129
    R3:~# ip route add 211.230.193.0/26 via 211.230.193.129

    R1:~# route
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.0   *               255.255.255.192 U     0      0        0 eth0
    211.230.193.64  211.230.193.2   255.255.255.192 UG    0      0        0 eth0
    211.230.193.128 *               255.255.255.192 U     0      0        0 eth1
    211.230.193.192 211.230.193.130 255.255.255.192 UG    0      0        0 eth1
    
    R1:~# ping 211.230.193.65
    PING 211.230.193.65 (211.230.193.65) 56(84) bytes of data.
    64 bytes from 211.230.193.65: icmp_seq=1 ttl=64 time=0.559 ms
    64 bytes from 211.230.193.65: icmp_seq=2 ttl=64 time=0.627 ms
    --- 211.230.193.65 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1014ms
    rtt min/avg/max/mdev = 0.559/0.593/0.627/0.034 ms

    R1:~# ping 211.230.193.130
    PING 211.230.193.130 (211.230.193.130) 56(84) bytes of data.
    64 bytes from 211.230.193.130: icmp_seq=1 ttl=64 time=7.15 ms
    64 bytes from 211.230.193.130: icmp_seq=2 ttl=64 time=0.627 ms
    --- 211.230.193.130 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1022ms
    rtt min/avg/max/mdev = 0.627/3.893/7.159/3.266 ms

    R3:~# ping 211.230.193.2
    PING 211.230.193.2 (211.230.193.2) 56(84) bytes of data.
    64 bytes from 211.230.193.2: icmp_seq=1 ttl=63 time=0.728 ms
    --- 211.230.193.2 ping statistics ---
    1 packets transmitted, 1 received, 0% packet loss, time 0ms
    rtt min/avg/max/mdev = 0.728/0.728/0.728/0.000 ms
    ```

<br>

### Traceroute

- sur R1 :
    * R1:~# tcpdump -Uni eth0 -w /hosthome/R1_eth0.cap &
    * R1:~# tcpdump -Uni eth1 -w /hosthome/R1_eth1.cap &
    ```bash
    R1:~# jobs
    [1]-  Running                 tcpdump -Uni eth0 -w /hosthome/R1_eth0.cap &
    [2]+  Running                 tcpdump -Uni eth1 -w /hosthome/R1_eth1.cap &
    ```
- sur la machine physique (par exemple a13p16) :
    * a13p16> tail -n+0 -f ~/R1_eth0.cap | wireshark -SHkli - &
    * a13p16> tail -n+0 -f ~/R1_eth1.cap | wireshark -SHkli - &

1. Sur R2, utilisez la commande « traceroute -I icmp -q 1 » vers le réseau B, en mettant comme
paramètre l’adresse IP associée à l’interface eth1 de R3.

2. Que renvoie cette commande ?
    ```bash
    R2:~# traceroute -I icmp -q 1 211.230.193.193
    traceroute to 211.230.193.193 (211.230.193.193), 64 hops max, 28 byte packets
    1  211.230.193.1 (211.230.193.1)  1 ms
    2  211.230.193.193 (211.230.193.193)  1 ms
    ```

3. A quelles interfaces et quels routeurs correspondent ces adresses ?
- 211.230.193.1 (211.230.193.1) : eth0 et R1 
- 211.230.193.193 (211.230.193.193) : eth1 et R3

4. Quel est le TTL du premier paquet IP envoyé par R2 ?
    > Le premier paquet IP envoyé par R2 a pour TTL 1.

5. Que transporte ce paquet ?
    ```bash
    1	0.000000	211.230.193.2	211.230.193.193	ICMP	42	Echo (ping) request  id=0x0882, seq=256/1, ttl=1 (no response found!)
    ```
    > C'est une requête pour un ping.

6. Ce paquet parvient-il jusqu’à sa destination ? Pourquoi ?
    > Ce paquet n'atteint pas sa destination (R3) car il doit passer par R1 et donc il faudrait un TTL minimum de 2 pour atteindre R3.

7. Qui répond à ce paquet ? Par quel type de message (protocole, type, code) ? Quelle est la
signification de la réponse ?
    ```bash
    2	0.000309	211.230.193.1	211.230.193.2	ICMP	70	Time-to-live exceeded (Time to live exceeded in transit)
    ```
    > C'est R1 qui répond à R2 pour lui informer que le TTL de son paquet a atteint 0 avant d'atteindre sa destionation. Protocole ICMP, type de réponse 11 (TTL exceeded), code 0 (TTL exceeded in transit).

8. Quel est le TTL du 2ème paquet IP envoyé par R2 ?
    > Le TTL du deuxième paquet envoyé par R2 vaut 2.

9. Ce paquet parvient-il jusqu’à sa destination ? Pourquoi ?
    > Ce paquet atteint effectivement sa destination pour la raison expliquée en 6 (il fallait un TTL de minimum 2 pour atteindre R3 via R1, car le TTL est alors décrémenté de 2 pour atteindre 0 en R3).

10. Qui répond à ce paquet ? Par quel type de message (protocole, type, code) ? Quelle est la
signification de la réponse ?
    ```bash
    4	0.007747	211.230.193.193	211.230.193.2	ICMP	42	Echo (ping) reply    id=0x0882, seq=512/2, ttl=63 (request in 3)
    ```
    > C'est R3 qui répond à R2 pour lui informer que sa requête est bien arrivée, le TTL de ce message vaut 63. C'est encore un message dont le protocole est ICM, le type de réponse est 0 (echo ping reply) et le code est 0.

11. Dans ces échanges, quels sont les messages qui permettent à traceroute de connaître l’adresse
IP des routeurs qui sont sur le chemin de la destination ?
    ```bash
    5	4.990593	f6:84:e8:d1:3f:b5	a6:56:90:98:33:3a	ARP	42	Who has 211.230.193.1? Tell 211.230.193.2
    6	4.990622	a6:56:90:98:33:3a	f6:84:e8:d1:3f:b5	ARP	42	211.230.193.1 is at a6:56:90:98:33:3a
    ```
    > Ce sont les messages dont le protocole est ARP.

12. Pourquoi l’adresse IP associée à l’interface eth0 de R3 n’est-elle pas renvoyée par traceroute ?
    > Le traceroute n'affiche que les @IP des interfaces utilisées pour renvoyer le paquet de la réponse.

<br>

### Tracepath

1. Configurez un MTU de 1000 octets sur les interfaces connectées à la liaison ‘b’.
    ```bash
    R1:~# ip link set dev eth1 mtu 1000
    R3:~# ip link set dev eth0 mtu 1000
    ```

2. Transmettez, avec ping, une requête ICMP de 1200 octets depuis R2 vers le réseau B, avec
l’option ‘-M dont’ (voir annexe). Qu’affiche la commande ping ?
    ```bash
    R2:~# ping -c1 -s 1200 -M dont 211.230.193.193
    PING 211.230.193.193 (211.230.193.193) 1200(1228) bytes of data.

    1208 bytes from 211.230.193.193: icmp_seq=1 ttl=63 time=18.6 ms

    --- 211.230.193.193 ping statistics ---
    1 packets transmitted, 1 received, 0% packet loss, time 0ms
    rtt min/avg/max/mdev = 18.651/18.651/18.651/0.000 ms
    ```

3. La requête parvient-elle à destination ? Quelle est la différence entre la requête envoyée par R2 et cette même requête après avoir été transmise par R1 vers R3 ?
    > La requête parvient à destination. La route de R2 vers R1 n'a pas été configurée avec un MTU donc les paquets jusqu'à 1500 octets peuvent être transmis (valeur par défaut). La transmission de la requête de R1 vers R3 quant à elle ne permet que des paquets de maximum 1000 octets.

4. Quelle est la différence entre la réponse renvoyée par R3 et cette même réponse après avoir
transmise par R1 vers R2 ?
    > De la même façon, la route de R3 vers R1 ne peut permettre que la transmission de paquets de maximum 1000 octets, donc ce paquet est fragmenté; la route de R1 vers R2 permet la transmission en une seule fois de la réponse (donc pas de fragmentation du message).

5. Transmettez, avec ping, une requête ICMP de 1200 octets depuis R2 vers le réseau B, mais, cette fois-ci, sans l’option ‘-M dont’ (voir annexe). Qu’affiche la commande ping ?
    ```bash
    R2:~# ping -c1 -s 1200 211.230.193.193
    PING 211.230.193.193 (211.230.193.193) 1200(1228) bytes of data.
    From 211.230.193.1 icmp_seq=1 Frag needed and DF set (mtu = 1000)

    --- 211.230.193.193 ping statistics ---
    1 packets transmitted, 0 received, +1 errors, 100% packet loss, time 0ms
    ```

6. La requête parvient-elle à destination ? Pour quelle raison ? Quelle est la valeur du flag « don’t fragment » du paquet IP contenant la requête ?
    > La requête ne parvient pas à destination, car sans l'option `-M dont`, le paquet ne peut être fragmenté et donc la route ne permet la transmission de paquets d'une taille supérieure à 1000 (car sans fragmentation la taille du paquet est trop grande).

7. Quel avertissement R1 renvoie-t-il à R2 ?
    > Le message envoyé par R1 indique qu'il est nécessaire de fragmenter le paquet avec une erreur de type 3 (destination unreachable) et code 4 (fragmentation needed).

8. Exécutez sur R2 la commande tracepath vers le réseau B. Qu’affiche cette commande ?
    ```bash
    R2:~# tracepath 211.230.193.193
    1:  211.230.193.2 (211.230.193.2)                          0.196ms pmtu 1500
    1:  211.230.193.1 (211.230.193.1)                          0.613ms 
    1:  211.230.193.1 (211.230.193.1)                          0.443ms 
    2:  211.230.193.1 (211.230.193.1)                          0.445ms pmtu 1000
    2:  211.230.193.193 (211.230.193.193)                      0.744ms reached
    Resume: pmtu 1000 hops 2 back 63
    ```

9. Que transportent les paquets IP envoyés par R2 ?
    > Tracepath envoie des paquets UDP.

10. Quelle est la valeur du flag « don’t fragment » des paquets IP envoyés par R2 ?
    > Le flag DF est set à `1` (donc à `don't fragment`).

11. Quelles sont les différences dans l’entête IP des paquets envoyés successivement par R2 ?
    > A chaque envoi le paquet a un TTL incrémenté d'un. Le port destination est également incrémenté.

12. Qui répond aux 2 premiers paquets ? Par quel type de message (protocole, type, code) ? Quelle
est la signification de la réponse ?
    > R1 répond aux deux premiers paquets pour signaler que le TTL est "exceeded" (a atteint 0 avant d'atteindre sa destination). Le protocole est ICMP, le type est 11 (Time-to-live exceeded) et le code est 0 (Time-to-live exceeded in transit).

13. Les 2 premiers paquets arrivent-ils à destination ? Pourquoi ?
    > Non car le TTL atteint 0 avant d'arriver à destination.

14. Qui répond au 3ème paquet ? Par quel type de message (protocole, type, code) ? Quelle est la
signification de la réponse ?
    > R1 répond également au 3ème paquet par un message de protocole ICMP, type 3 (destination unreachable) et de code 4 (fragmentation needed). En effet le chemin est correct pour atteindre le port cible, mais son paramétrage ne permet que le passage de paquets de maximum 1000 octets (alors que traceroute voulait ping un message de 1200 octets), or le flag `don't fragment` est set à 1 et donc le message (entier) ne peut-être transmis sans fragmentation.

15. Le 3ème paquet arrive-t-il à destination ? Pourquoi ?
    > Le 3ème paquet n'arrive donc pas à destination car il est trop volumineux pour être transmis sans fragmentation.

16. Qui répond au 4ème et dernier paquet ? Par quel type de message (protocole, type, code) ?
Quelle est la signification de la réponse ?
    > C'est encore R1 qui répond au dernier paquet, par un message de protocole ICMP, de type 3 (destination unreachable) et de code 3 (port unreachable). Cela signifie que la destination cible ne peut être accédée depuis le port utilisé pour envoyer le message.

17. Le 4ème paquet arrive-t-il à destination ? Pourquoi ?
    > Le 4ème paquet n'arrive donc pas à destination car le port spécifié ne permet pas de transmettre le message de R1 vers R3.

18. Comment tracepath a-t-il su que la liaison b a un MTU de 1000 (analysez pour cela le contenu
des messages ICMP renvoyés par R1) ?
    > Grâce au flag DF mis à 1, tracepath assure qu'un paquet trop gros pour le chemin à emprunter ne sera pas fragmenté, et donc l'expéditeur sera informé que le message est trop gros pour ce chemin. Cela indique donc que le MTU est supérieur à la taille du message émis. En réduisant la taille du message émis à chaque étape il finit par trouver la taille maximale d'un paquet pouvant atteindre la destination (et donc le MTU).

19. Résumez maintenant les réponses aux questions précédentes pour expliquer le
fonctionnement de tracepath.
    > D'abord tracepath cherche le TTL correct permettant d'atteindre la destination. Une fois cela fait, il détermine si le paquet peut être transmis à cette adresse avec une taille de paquet par défaut de 1500 (correspondant au MTU par défaut). Si cela n'est pas le cas, alors il réessaie avec des tailles décrémentées.

20. Quelles sont les similitudes entre le fonctionnement de traceroute et de tracepath tel que vous les avez utilisés ?
    > Comme tracepath, traceroute incrémente le TTL à chaque nouvelle émission pour déterminer le TTL minimum requis pour atteindre la destination, et cette information est transmise à l'expéditeur par le routeur auquel le TTL atteint 0.

21. Quelles sont les différences entre le fonctionnement de traceroute et de tracepath tel que vous les avez utilisés ?
    > Contrairement à tracepath, traceroute ne s'intéresse qu'au TTL minimum requis et ne cherche pas à déterminer la taille maximale transmissible sur la route (donc au MTU) ainsi que le port de destination.

<br>

### RIP

1. Sur R1, activez RIP sur le réseau a. Que constatez-vous sur la capture de trames ?
    ```bash
    R1:~# zebra -d

    R1:~# ripd -d

    R1:~# vtysh
    Hello, this is Quagga (version 0.99.10).
    Copyright 1996-2005 Kunihiro Ishiguro, et al.

    R1# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route

    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    C>* 211.230.193.128/26 is directly connected, eth1

    R1# configure terminal

    R1(config)# router rip

    R1(config-router)# network 211.230.193.1/26

    R1# show ip route rip

    7	28.016179	211.230.193.1	224.0.0.9	RIPv2	66	Request
    ```
    


2. A quelle couche du modèle OSI le protocole RIP appartient-il ? Quel protocole de couche transport est utilisé par RIP ? Quels sont les ports source et destination utilisés par RIP ? Quelle est l’adresse IP de destination de ces messages ? Que représente cette adresse ?
    > Le protocole RIP appartient à la couche réseau. Ce protocole utilise le protocole UDP, et le port 520 en source et en destination. Depuis RIPv2, ce protocole utilise l'adresse IP multicast 224.0.0.9, c'est un sous-réseau local.

3. Quelle est la « command » RIP envoyée ? Quelle est la version de RIP ? Ce message est envoyés
aux autres routeurs situés sur ce réseau pour obtenir des routes de leur part. RIP n’étant pas
encore activé sur R2, ce dernier ne répond pas.
    > La command RIP envoyée est Request (1), la version RIPv2 (2).

4. Toujours sur R1, activez maintenant RIP sur le réseau b. Que constatez-vous sur la capture de
trames ? A quelle fréquence sont envoyés les nouveaux messages RIP ? Ces messages se nomment
« mises à jour non sollicitées (unsollicited updates) ».
    > Sur les captures de trames on constate un affichage sur l'interface  eth0 (côté envoi de requête) et maintenant, un affichage côté interface eth1 donc réception de la requête et envoi de la réponse. eth0 et eth1 communiquent. Les messages RIP sont envoyés environ toutes les 25 secondes.
    ``` bash
    R1(config-router)# network 211.230.193.129/26

    // eth1
    4	25.210427	211.230.193.129	224.0.0.9	RIPv2	66	Response
    // eth0
    19	433.956795	211.230.193.1	224.0.0.9	RIPv2	66	Response
    ```

5. Que contiennent les réponses RIP envoyées sur a ? Sur b ?
    > Les réponses envoyées sur a et sur b sont a priori les mêmes : commande "Response", paquets de 32 octets, même port 520...

6. Sur R2 et R3, activez RIP sur les réseaux directement connectés à ces routeurs. Quel est l’intérêt du message de requête ?
    ```bash
    R2(config-router)# network 211.230.193.2/26
    R2(config-router)# network 211.230.193.65/26
    R3(config-router)# network 211.230.193.130/26
    R3(config-router)# network 211.230.193.193/26

    // eth0
    33	851.757871	211.230.193.2	224.0.0.9	RIPv2	66	Request
    36	851.768031	211.230.193.1	211.230.193.2	RIPv2	66	Response
    // eth1
    20	487.175212	211.230.193.130	224.0.0.9	RIPv2	66	Request
    23	487.183799	211.230.193.129	211.230.193.130	RIPv2	66	Response

    R1# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route
    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    R>* 211.230.193.64/26 [120/2] via 211.230.193.2, eth0, 00:03:05
    C>* 211.230.193.128/26 is directly connected, eth1
    R>* 211.230.193.192/26 [120/2] via 211.230.193.130, eth1, 00:00:46

    R2# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route
    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    C>* 211.230.193.64/26 is directly connected, eth1
    R>* 211.230.193.128/26 [120/2] via 211.230.193.1, eth0, 00:13:23

    R3# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route
    C>* 127.0.0.0/8 is directly connected, lo
    R>* 211.230.193.0/26 [120/2] via 211.230.193.129, eth0, 00:14:43
    R>* 211.230.193.64/26 [120/3] via 211.230.193.129, eth0, 00:02:25
    C>* 211.230.193.128/26 is directly connected, eth0
    C>* 211.230.193.192/26 is directly connected, eth1
    ```
    > Le message de requête signale au device qui le reçoit une demande d'établissement de route de R1 vers R3 et de R1 vers R2.

7. Quelles sont les différences entre le contenu des réponses envoyées par R1 et sa table de routage ? Pourquoi y a-t-il des différences ?
    > Sur la table de routage on lit les adresses des routes alors que dans les réponses on a l'adresse des interfaces (eth0 ou eth1). Il y a une différence parce que nous avons lancé les captures de trames sur les interfaces, alors que la table de routage s'intéresse aux routes.

8. Quelle est la métrique associée au réseau A dans les annonces de R2 ? Quelle est la métrique associée au réseau A dans les annonces de R1 ? Selon vous, quelle est la métrique associée au réseau A dans les annonces de R3 ? A quoi correspond la métrique ?
    > Quand la commande est une requête, la métrique vaut 16 (que ça soit sur R1 eth0 ou eth1, 16 faisant référence à l'infini donc une destination non accessible), alors que quand la commande est une réponse, la métrique vaut 1. La métrique correspond au nombre de sauts ("hops") qui séparent un routeur d'un réseau IP. La métrique associée au réseau A dans les annonces de R3 serait probablement 3 (+1 par appareil parcouru).

9. Affichez la table de routage de chaque routeur et vérifiez que les métriques associées aux différentes routes correspondent à votre réponse à la question précédente. Selon vous, si on ajoutait un lien direct entre R2 et R3, quelle serait la métrique associée au réseau A sur R3 ?
    ```bash
    R1# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route
    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    C>* 211.230.193.128/26 is directly connected, eth1

    R2# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
       I - ISIS, B - BGP, > - selected route, * - FIB route
    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    C>* 211.230.193.64/26 is directly connected, eth1
    R>* 211.230.193.128/26 [120/2] via 211.230.193.1, eth0, 00:27:05

    R3# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route

    C>* 127.0.0.0/8 is directly connected, lo
    R>* 211.230.193.0/26 [120/2] via 211.230.193.129, eth0, 00:26:53
    C>* 211.230.193.128/26 is directly connected, eth0
    C>* 211.230.193.192/26 is directly connected, eth1
    ```
    > On lit des métriques valant 2, ce qui vaut effectivement à 1+1 (1 pour aller de R2 à R1, et 1 pour aller de R1 à R3).
    En ajoutant un lien direct entre R2 et R3, la métrique serait probablement de 1.

10. Simulez une panne de l’interface eth1 de R2 en la désactivant. Que remarquez-vous au sujet des messages RIP reçus et envoyés par R1 ? Quelle est la métrique associée au réseau A désormais inaccessible ? Pourquoi cette valeur est-elle utilisée ? Que signifie-t-elle ? Quel est le délai entre la panne et la suppression de la route vers A dans R3 ?
    ```bash
    R2:~# ip link set dev eth1 down
    ```
    > On constate que les messages RIP reçus et envoyés par R1 (côté eth0 et eth1) utilisent une métrique de valeur 16, qui comme dit précédemment correspond à une destination inaccessible. Entre la panne et la suppression de la route on a un temps d'environ 25 secondes (donc un envoi de response).


11. Activez de nouveau eth1 sur R2. Désactivez cette fois-ci eth0. R2 n’envoie plus de messages RIP vers R1. Attendez quelques minutes en scrutant les annonces de R1. Au bout de combien de temps (timeout) R1 considère que R2 (et donc A) est inaccessible ?
    > Au bout de 6 Response, soit 2min30 environ R1 considère que R2 est inaccessible, son métrique passant à 16.

12. Activez de nouveau eth0 sur R2. Créez un 4ème routeur nommé PIRATE avec une interface eth0 connectée au réseau A. Configurez l’interface eth0 avec une adresse appartenant à A et vérifiez que vous pouvez envoyer un ping à R2.
Créez maintenant une interface réseau fictive nommée dummy0 avec la commande ifconfig.
Associez à cette interface une adresse appartenant au réseau B.
Activez RIP. Affichez la table de routage de R2. Que constatez-vous concernant le réseau B ?
Comment remédier à ce problème ?
    ```bash
    vstart -D TIPIAK --eth0=A

    TIPIAK:~# ip a add 211.230.193.69/26 dev eth0
    TIPIAK:~# ip link set dev eth0 up
    TIPIAK:~# route
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.64  *               255.255.255.192 U     0      0        0 eth0

    TIPIAK:~# ping 211.230.193.65
    PING 211.230.193.65 (211.230.193.65) 56(84) bytes of data.
    64 bytes from 211.230.193.65: icmp_seq=1 ttl=64 time=9.78 ms
    64 bytes from 211.230.193.65: icmp_seq=2 ttl=64 time=0.620 ms
    --- 211.230.193.65 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1017ms
    rtt min/avg/max/mdev = 0.620/5.201/9.782/4.581 ms

    TIPIAK:~# ifconfig dummy0
    dummy0    Link encap:Ethernet  HWaddr 82:00:0f:14:2c:37  
              BROADCAST NOARP  MTU:1500  Metric:1

    TIPIAK:~# ip a add 211.230.193.199/26 dev dummy0
    TIPIAK:~# ip link set dev dummy0 up

    TIPIAK:~# route
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    211.230.193.64  *               255.255.255.192 U     0      0        0 eth0
    211.230.193.192 *               255.255.255.192 U     0      0        0 dummy0

    TIPIAK:~# zebra -d
    TIPIAK:~# ripd -d
    TIPIAK:~# vtysh

    Hello, this is Quagga (version 0.99.10).
    Copyright 1996-2005 Kunihiro Ishiguro, et al.

    TIPIAK# configure terminal
    TIPIAK(config)# router rip
    TIPIAK(config-router)# network 211.230.193.193/26
    TIPIAK(config-router)# exit
    TIPIAK(config)# exit
    TIPIAK# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route

    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.64/26 is directly connected, eth0
    C>* 211.230.193.192/26 is directly connected, dummy0

    R2# show ip route
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
        I - ISIS, B - BGP, > - selected route, * - FIB route

    C>* 127.0.0.0/8 is directly connected, lo
    C>* 211.230.193.0/26 is directly connected, eth0
    C>* 211.230.193.64/26 is directly connected, eth1
    R>* 211.230.193.128/26 [120/2] via 211.230.193.1, eth0, 00:15:16
    R>* 211.230.193.192/26 [120/3] via 211.230.193.1, eth0, 00:15:16
    ```
    > On constate qu'il n'existe pas de route allant de R2 vers l'interface dummy0 du routeur TIPIAK.
    Pour remédier à cela il faudrait configurer avec `ip add a` le chemin inverse à celui que nous venons de configurer.
