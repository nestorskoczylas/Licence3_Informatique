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

#define SIZE 50
#define DESTPORT 8000

int main() {
  int sock, bindRet, recvRet;
  char buffer[SIZE];
  struct sockaddr_in addrTrgt;
  memset(&addrTrgt, 0, sizeof(addrTrgt));
  //gestion d'erreur du memset

  sock = socket(AF_INET, SOCK_DGRAM, 0);
  if (sock < 0) {
    perror("socket");
    return -1;
  }

  addrTrgt.sin_family = AF_INET;
  addrTrgt.sin_port = htons(DESTPORT);
  addrTrgt.sin_addr.s_addr = INADDR_ANY;

  bindRet = bind(sock, &addrTrgt, sizeof(addrTrgt));
  //gestion d'erreur du bind

  recvRet = recvfrom(sock, buffer, SIZE, MSG_WAITALL, 0, NULL);
  //gestion d'erreur du recv

  close(sock);
  printf("%s\n", buffer);

  return 0;
}
