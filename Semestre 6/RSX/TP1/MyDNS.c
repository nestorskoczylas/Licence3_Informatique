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

#define DESTIPV4  "127.0.0.53"
#define DESTPORT  53
#define QUERY_LEN 29
#define ANSW_LEN  512

/* Déclaration des prototypes... */
void init_dest_struct_and_send(int socket_fd, char *buffer);
void init_reception_struct_and_receive(int socketfd, char *buffer);
void print_message(char *to_or_as, char *buffer, struct sockaddr_in sockstruct, int message_len);
char *DNS_analysis(char *buffer, struct sockaddr_in sockstruct, int answer_length);

int main(void) {
    // buffer contenant l'en-tête avant envoi, tel que construit dans le fichier fourni DNSSimple.c...
    char buffer_request[QUERY_LEN] = {
        0x08,  0xbb,  0x01,  0x00, // a) 12 octets d'entete : identifiant de requete/parametres [RFC1035, 4.1.1]
        0x00,  0x01,  0x00,  0x00, // à savoir : [ID en 4 octets] [0 si query, 1 si answer] [type de query en 1 octet] [Authoritative Answer] [Recursion Desired] [nombre de questions en 4 octets] [d'autres informations...]
        0x00,  0x00,  0x00,  0x00,
                                   // b) QUESTION                          [RFC1035, partie 4.1.2]
        0x03,  0x77,  0x77,  0x77, // b.1) QNAME : 3"www" 4"lifl" 2"fr" 0  [RFC1035, partie 3.1]
        0x04,  0x6c,  0x69,  0x66, // 0x77 = 'w' etc...
        0x6c,  0x02,  0x66,  0x72,
        0x00,                      // un octet null qui annonce fin du QNAME
        0x00,  0x01,               // b.2) QTYPE : A (a host address)      [RFC1035, partie 3.2.3]
        0x00,  0x01                // b.3) QCLASS : IN (the Internet)      [RFC1035, partie 3.2.4]
    };

    // buffer qui stockera la réponse après réception
    char buffer_answer[ANSW_LEN];

    /* Création d'un socket en UDP */
    int socket_fd = socket(PF_INET, SOCK_DGRAM, 0);  // PF_INET : "Protocol Family"  SOCK_DGRAM : indique connexion UDP (datagram)
    if (socket_fd < 0) {
        perror("socket");
        exit(EXIT_FAILURE);
    }

    /* Création d'une structure sockaddr_in qui contiendra les informations suivantes :
    *  - sin_family : type d'adresse du socket
    *  - sin_port : port à contacter
    *  - sin_addr.s_addr : adresse IPv4 à contacter
    * Puis envoi du message dans le buffer depuis le socket à l'adresse destination */
    init_dest_struct_and_send(socket_fd, buffer_request);

    printf("\n");

    /* Réception du message dans un second buffer */
    /* recvfrom(...src_addr...) va remplir la sockaddr_in src_addr avec les informations
     * fournies à la création de la sockaddr_in dest_addr
     */
    init_reception_struct_and_receive(socket_fd, buffer_answer);

    close(socket_fd);

    exit(EXIT_SUCCESS);
}

/* Initialise la structure sockaddr_in avant l'envoi d'un message à l'@ destination */
void init_dest_struct_and_send(int socket_fd, char *request) {
    struct sockaddr_in dest_addr;
    memset(&dest_addr, 0, sizeof(struct sockaddr_in));
    dest_addr.sin_family = AF_INET;       // AF_INET signal le type d'adresse compatible avec le socket donc IPV4
    dest_addr.sin_port = htons(DESTPORT); // htons convertit DESTPORT (53) en byte

    dest_addr.sin_addr.s_addr = inet_network(DESTIPV4);  // inet_addr convertit une adresse IPV4 en byte
    if (dest_addr.sin_addr.s_addr == -1) {
        perror("inet_addr");
        exit(EXIT_FAILURE);
    }

    int send_addr_len = sizeof(struct sockaddr_in);
    int message_len;
    if ((message_len = sendto(socket_fd, request, QUERY_LEN, 0, (struct sockaddr*) &dest_addr, send_addr_len)) <= 0) {
        perror("sendto");
        exit(EXIT_FAILURE);
    } else {
        /* Si réussite, affichage caractère par caractère du message tel que défini avant l'envoi */
        print_message("to", request, dest_addr, message_len);
    }
}

/* Initialise la structure sockaddr_in et y inscrit les informations après réception du message si réussite */
void init_reception_struct_and_receive(int socketfd, char *answer) {
    struct sockaddr_in src_addr;
    memset(&src_addr, 0, sizeof(struct sockaddr_in));
    socklen_t rec_addr_len = sizeof(struct sockaddr_in);
    int message_len;

    if ((message_len = recvfrom(socketfd, answer, ANSW_LEN, 0, (struct sockaddr *) &src_addr, &rec_addr_len)) <= 0) {
      perror("recvfrom");
      exit(EXIT_FAILURE);
    }
    printf("ici\n");
    if (answer != NULL) {
        /* Si réussite, affichage caractère par caractère du message tel qu'il a été reçu */
        print_message("as", answer, src_addr, message_len);
        char * ipv4 = DNS_analysis(answer, src_addr, message_len);
        printf("IPV4 : %s\n", ipv4);
    }
}

/* Affiche un message caractère par caractère en précisant l'IP destination */
void print_message(char * to_or_as, char *buffer, struct sockaddr_in sockstruct, int message_len) {
    int i, j;
    if (strcmp(to_or_as, "to")==0) {
        printf("\n*** Message sent ***\n");
    }
    else {
        printf("*** Message received ***\n");
    }
    printf("\n");

    // Affichage hexas et ascii côte à côte
    for (i = 0; i < message_len; i++) {
        printf("%.2X ", buffer[i]&0xff);
        if (((i + 1)%8 == 0)) {
            for (j = i + 1; j < ((i + 8) & ~7); j++) {
                printf("\t");
            }
            printf("\t");
            for (j = i & ~7; j <= i; j++) {
                printf("%c",buffer[j] > 31 && buffer[j] < 128 ? buffer[j] : '.');
            }
            printf("\n");
        }
    }
    printf("\n\n%s IPV4 address : %s\n", to_or_as, inet_ntoa(sockstruct.sin_addr)); // inet_ntoa converti une adresse IP donnée en byte en une chaîne de caractères
    printf("and length : %d\n\n",message_len); // Affichage de la taille du message
}

char *DNS_analysis(char *buffer, struct sockaddr_in sockstruct, int answer_length) {
    int i, j, k, l;

    char * header[6] = {": ID", ": FLAGS", ": QDCOUNT", ": ANCOUNT", ": NSCOUNT", ": ARCOUNT"};
    char * question[2] = {": QTYPE = ", ": QCLASS = "};
    char * answer[5] = {": DOMAIN NAME", ": TYPE", ": CLASS", ": TTL", ": RDLENGTH"};

    printf("\n###### ANALYSIS ######\n\n");

    j=0;
    // Affichage de chaque champs de l'entête
    for (i = 0; i < 12; i++) {
        printf("%.2X ", buffer[i]&0xff);    // affiche 2 caractères correspondant à un hexadécimal
        if ((i+1)%2==0) printf("%s\n", header[j++]);
    }

    // Stockage du nombre de questions, réponses etc à analyser dans des int
    int qdcount = buffer[5]&0xff;   // les héxa sont certes constitués de 2 caractères,
    int ancount = buffer[7]&0xff;   // mais on supposera que personne ne pose plus de 255 questions par requête...
    int nscount = buffer[9]&0xff;
    int arcount = buffer[11]&0xff;

    printf("\n");

    // AFFICHAGE DE CHAQUE QUESTION
    for(j = 0; j < qdcount; j++) {
        int initial_i = i;

        //affichage de la question sous forme hexa
        printf("QUESTION %d :\n\t", j+1);
        while(buffer[i-1] || buffer[i]) {       // tant qu'on n'a pas 00 en fin de Q
            printf("%.2X ", buffer[i++]&0xff);
        }

        // affichage de la question sous forme lisible
        printf("= ");
        while(buffer[initial_i+1] && initial_i < i) {
            initial_i += 1;
            printf("%c",buffer[initial_i] > 31 && buffer[initial_i] < 128 ? buffer[initial_i] : '.');
        }
        printf("\n\t");

        // affichage des deux champs précisant type et classe de la question
        for (k = 0; k < 4; k++, i++) {
            printf("%.2X ", buffer[i]&0xff);        // affichage hexa(.2X), et &0xFF applique un masque sur les caractères >256 (en gardant le byte de poids faible)
            if ((i-initial_i+1)%2==0) {             // si on a affiché les 2 hexa représentant un champs
                int field_value = buffer[i]&0xff;
                printf("%s", question[k/2]);       // affichera QTYPE puis QCLASS; part du principe que chaque champs fait 2 hexa
                printf("%d\n", field_value);
                if (k != 3) printf("\t");
            }
        }
    }

    printf("\n");

    // AFFICHAGE DE CHAQUE REPONSE, CHAQUE AUTORITE, ET CHAQUE ADDITIONNEL
    int total = ancount + nscount + arcount;
    for(j = 0; j < total; j++) {
        int rdlenght;
        l = 0;
        // Affichage de la réponse champs par champs, sous forme d'hexa, avec signification
        if (j<ancount) printf("ANSWER %d :\n\t", j+1);
        else if (j<nscount) printf("AUTHORITY %d :\n\t", j-ancount+1);
        else if (j<arcount) printf("ADDITIONNAL %d :\n\t", j-(ancount+nscount)+1);

        for (k = 0; k < 2; k++, i++) {              // pour DOMAIN NAME
            printf("%.2X ", buffer[i]&0xff);
            if (k==1) printf("%s\n\t", answer[l++]);
        }
        for (k = 0; k < 4; k++, i++) {              // pour TYPE et CLASS
            printf("%.2X ", buffer[i]&0xff);
            if (k%2!=0) printf("%s = %d\n\t", answer[l++], buffer[i]&0xff);
        }

        for (k = 0; k < 4; k++, i++) {              // pour le TTL
            printf("%.2X ", buffer[i]&0xff);
        }
        printf("%s\n\t", answer[l++]);

        for (k = 0; k < 2; k++, i++) {              // pour le rdlenght
            printf("%.2X ", buffer[i]&0xff);
        }
        rdlenght = buffer[i-1]&0xff;
        printf("%s = %d\n\t", answer[l++], rdlenght);

        int initial_i = i;
        for (k = 0; k < rdlenght; k++, i++) {       // pour le RDATA/NS DATA/additionnal
            printf("%.2X ", buffer[i]&0xff);
        }
        printf("= ");
        for (k = 0; k < rdlenght; k++, initial_i++) {
            if (buffer[initial_i] > 20 && buffer[initial_i] < 128) printf("%c",buffer[initial_i]);  // affichage des caractères lisibles
        }

        printf("\n\n");
    }

    return inet_ntoa(sockstruct.sin_addr);
}
