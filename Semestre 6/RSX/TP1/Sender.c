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

#define DESTPORT 8000

int main(void) {
  int sock, len;
  char * buffer = "coucou";
  struct sockaddr_in addrDest;
  memset(&addrDest, 0, sizeof(addrDest));
  //gestion d'erreur du memset

  sock = socket(AF_INET, SOCK_DGRAM, 0);
  if (sock < 0) {
    perror("socket");
    return -1;
  }

  addrDest.sin_family = AF_INET;
  addrDest.sin_port = htons(DESTPORT);
  addrDest.sin_addr.s_addr = INADDR_ANY;

  len = sendto(sock, buffer, strlen(buffer), 0, (struct sockaddr*) &addrDest, (socklen_t) sizeof(addrDest));
  assert(len != -1);
  close(sock);
}
