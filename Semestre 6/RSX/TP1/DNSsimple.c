/*
 * Original de Laurent NOE ~ 2009
 * Mise a jour du traitement des erreurs, des includes, et de l'affichage - Arthur ROLAND & Rudy SEYS - Mars 2017
 * Mise a jour des noms/adresses des serveurs DNS de la fac, affichage et commentaires - Laurent NOE - Janvier 2019
 * Ajout de quelques commentaires pour autres serveurs fac et exterieurs               - Laurent NOE - Janvier 2020
 * Du menage, de l'affichage (general,hex), gethostbyname --> getaddrinfo              - Laurent NOE - Janvier 2021
 * Un ptit Bind pour l'exemple et un affichage de quelques infos deja connues          - Laurent NOE - Fevrier 2021
 * Ajout d'une version sans getaddrinfo suite aux questions                            - Laurent NOE - Fevrier 2021
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <netdb.h>
#include <unistd.h>
#include <assert.h>


/*
 * cette macro sert a activer (ou desactiver si commentee) l'appel a la fonction "getaddrinfo" :
 * - cette derniere renseigne en grande partie la structure   (struct sockaddr*) af_result->ai_addr   (ainsi que le type de socket ... voir "af_result->")
 * - il est autrement possible  de realiser une version "en dur" via la structure   (struct sockaddr) remote_addr
 */
//#define GETADDRINFO


/* NOM ou ADRESSE IP du serveur DNS qui recevra notre requete */
/* utiliser "1.1.1.1" / "9.9.9.9", ou celui declare dans le fichier /etc/resolv.conf de chez vous, si les suivants ne sont pas joignables.
 * utiliser "reserv1.univ-lille1.fr" (sinon "reserv2.univ-lille1.fr") a l'universite pour avoir les autorites/additionels sur "www.lifl.fr".
 * utiliser "dns1.unv-lille.fr" (sinon "dns2.univ-lille.fr") sur l'universite (mais sans autorite/additionel)
 */

/* PORT et @IP ou Nom, du serveur DNS qui recevra notre requete */

#ifdef GETADDRINFO

#define DESTNAME "reserv1.univ-lille1.fr" /* "reserv2.univ-lille1.fr" */
#define DESTPORT "53"

#else

#define DESTIPV4 "193.49.225.15"          /* "193.49.225.90" */
#define DESTPORT 53

#endif

//127.0.0.53

#define NS_QUERY_LEN  29
unsigned char query[NS_QUERY_LEN] = {
  0x08,  0xbb,  0x01,  0x00, // a) 12 octets d'entete : identifiant de requete/parametres [RFC1035, 4.1.1]
  0x00,  0x01,  0x00,  0x00,
  0x00,  0x00,  0x00,  0x00,
  0x03,  0x77,  0x77,  0x77, // b) QUESTION                          [RFC1035, partie 4.1.2]
  0x04,  0x6c,  0x69,  0x66, // b.1) QNAME : 3"www" 4"lifl" 2"fr" 0  [RFC1035, partie 3.1]
  0x6c,  0x02,  0x66,  0x72,
  0x00,
  0x00,  0x01,               // b.2) QTYPE : A (a host address)      [RFC1035, partie 3.2.3]
  0x00,  0x01                // b.3) QCLASS : IN (the Internet)      [RFC1035, partie 3.2.4]
};

#define NS_ANSWER_MAXLEN 512
unsigned char answer[NS_ANSWER_MAXLEN];



int main(void) {


#ifdef GETADDRINFO

    /* 1) obtenir l'adresse IP de la machine distante visee,
     *    ici c'est le serveur DNS que l'on souhaite interroger
     *    (PS : ... et nous faisons cela en utilisant une requete DNS, sur le serveur DNS par default)
     */

    // adresse distante (et port) : resolution pour envoi avec getaddrinfo
    struct addrinfo af_hints, *af_result = NULL;
    memset(&af_hints, 0, sizeof(struct addrinfo));
    af_hints.ai_family   = AF_INET;    /* IPv4 */
    af_hints.ai_socktype = SOCK_DGRAM; /* UDP */

    fprintf(stderr, " recherche de l'@IPv4, pour le nom \"%s\" ... ", DESTNAME);
    int err = getaddrinfo(DESTNAME, DESTPORT, &af_hints, &af_result);
    if (err) {
      fprintf(stderr,"[erreur] - getaddinfo(\"%s\") -> \"%s\"\n", DESTNAME, gai_strerror(err));
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n");



    /* 2) creation du socket IPv4 UDP
     */

    // descripteur de socket
    int sock = 0;
    fprintf(stderr, " creation du socket en mode DGRAM (UDP) ... ");
    sock = socket(af_result->ai_family /* ou PF_INET */, af_result->ai_socktype /* ou SOCK_DGRAM */, af_result->ai_protocol /* ou 0 */);
    if (sock < 0) {
      perror("[erreur] - socket ");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n");


#else

    /* 1) renseigner en dur l'adresse IP de la machine distante visee,
     *    ici c'est le serveur DNS que l'on souhaite interroger
     */

    // adresse distante (et port) : pas de resolution ici
    struct sockaddr_in remote_addr;
    memset(&remote_addr, 0, sizeof(struct sockaddr_in));
    remote_addr.sin_family      = AF_INET; /* IPv4 */
    remote_addr.sin_port        = htons(DESTPORT); /* numero de port dest */
    remote_addr.sin_addr.s_addr = inet_addr(DESTIPV4); /* @IPv4 dest */
    fprintf(stderr, " conversion de l'@IPv4, pour la chaine \"%s\" ... ", DESTIPV4);
    if (remote_addr.sin_addr.s_addr == INADDR_NONE) {
      fprintf(stderr,"[erreur] - inet_addr(\"%s\") -> Mauvais formatage\n", DESTIPV4);
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n");



    /* 2) creation du socket IPv4 UDP
     */

    // descripteur de socket
    int sock = 0;
    fprintf(stderr, " creation du socket en mode DGRAM (UDP) ... ");
    sock = socket(PF_INET, SOCK_DGRAM, 0);
    if (sock < 0) {
      perror("[erreur] - socket ");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n");

#endif



    /* 3) "bind" sur un port/@ locales specifies
     *
     * ** cette partie (3) n'est pas necessaire ici, le "bind" etant
     * ** fait automatiquement lors de l'envoi en partie (4)
     * ** vous pouvez donc passer directement a la partie (4)
     */

 /*
    // informations du port local et @IP locale
    // ici on ecoute sur toutes les interfaces (INADDR_ANY)
    // et on laisse le systeme choisir un port dynamique sans l'imposer (htons(0))
    struct sockaddr_in addrLocal;
    socklen_t addrLocallen = sizeof(struct sockaddr_in);
    memset(&addrLocal, 0, sizeof(struct sockaddr_in));
    addrLocal.sin_family      = AF_INET;
    addrLocal.sin_port        = htons(0);
    addrLocal.sin_addr.s_addr = htonl(INADDR_ANY);

    fprintf(stderr, " liaison du socket avec l'@IPv4 locale/port local ... ");
    if (bind(sock, (struct sockaddr *)&addrLocal, addrLocallen) < 0 ) {
      perror("[erreur] - bind ");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n");

    // ... juste pour avoir quelques infos du port local utilise ...
    // afin que ce bind serve finalement a quelque chose avant l'envoi ;-D
    if (getsockname(sock,  (struct sockaddr *)&addrLocal, &addrLocallen) < 0) {
      perror("[erreur] - getsockname ");
      return EXIT_FAILURE;
    }
    fprintf(stderr," - port  local  : %hu\n", ntohs(addrLocal.sin_port));

*/

    /* 4) envoi du message
     */

    fprintf(stderr, " envoi du message ... ");
    ssize_t len;
    if ( (len = sendto(sock, query, NS_QUERY_LEN, 0,
#ifdef GETADDRINFO
                       af_result->ai_addr
#else
                       (struct sockaddr*) &remote_addr
#endif
                       , sizeof(struct sockaddr_in))) < 0) {
      perror("[erreur] - sendto ");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n longueur du message envoye : %lu\n", len);


    /* 5) reception du message
     */

    // informations du port distant et @IP distant
    // obtenus apres reception
    struct sockaddr_in addrRemoteFromRecv;
    socklen_t addrRemoteFromRecvlen = sizeof(struct sockaddr_in);

    fprintf(stderr, " reception du message ... ");
    if ( (len = recvfrom(sock, answer, NS_ANSWER_MAXLEN, 0, (struct sockaddr *) &addrRemoteFromRecv, &addrRemoteFromRecvlen)) < 0) {
      perror("[erreur] - recvfrom ");
      return EXIT_FAILURE;
    }
    fprintf(stderr, "[ok]\n longueur du message recu : %lu\n", len);

    // ... juste pour avoir quelques infos de l'@IPv4 distante / port distant utilises
    // (normalement le #DESTPORT UDP de la machine visee DESTNAME .... mais qui sait, un message
    // peut etre envoye sur ce port local par quelqu'un d'autre, entre notre envoi et la reception, car rien ne l'empeche ici)
    fprintf(stderr," - port  distant  : %hu\n", ntohs(addrRemoteFromRecv.sin_port));
    fprintf(stderr," - @IPv4 distante : %s\n", inet_ntoa(addrRemoteFromRecv.sin_addr));


    /* 6) fermeture socket
     */

    close(sock);

#ifdef GETADDRINFO
    freeaddrinfo(af_result);
#endif


    /* 7) affichage de la reponse
     *    hexa + "interpretation" ascii
     */

    for (int i = 0; i < len; i++) {

      fprintf(stdout," %.2X", answer[i] & 0xff);

      if (((i+1)%16 == 0) || (i+1 == len)) {

        /* ceci pour afficher les caracteres ascii apres l'hexa */
        /* >>> */
        for (int j = i+1 ; j < ((i+16) & ~15); j++) {
          fprintf(stdout,"   ");
        }
        fprintf(stdout,"\t");
        for (int j = i & ~15; j <= i; j++)
          fprintf(stdout,"%c",answer[j] > 31 && answer[j] < 128 ? (char)answer[j] : '.');
        /* <<< */
        fprintf(stdout,"\n");
      }
    }

    return EXIT_SUCCESS;
}
