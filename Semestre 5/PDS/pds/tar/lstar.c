#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <tar.h>
#include <fcntl.h>
#include <assert.h>
#include <time.h>

struct posix_header
{                    /* Byte offset    Field type                 */
  char name[100];            /*   0    NUL-terminated if NUL fits */
  char mode[8];              /* 100                               */
  char uid[8];               /* 108                               */
  char gid[8];               /* 116                               */
  char size[12];             /* 124                               */
  char mtime[12];            /* 136                               */
  char chksum[8];            /* 148                               */
  char typeflag;             /* 156    see below                  */
  char linkname[100];        /* 157    NUL-terminated if NUL fits */
  char magic[6];             /* 257    must be TMAGIC (NUL term.) */
  char version[2];           /* 263    must be TVERSION           */
  char uname[32];            /* 265    NUL-terminated             */
  char gname[32];            /* 297    NUL-terminated             */
  char devmajor[8];          /* 329                               */
  char devminor[8];          /* 337                               */
  char prefix[155];          /* 345    NUL-terminated if NUL fits */
                             /* 500                               */
/* If the first character of prefix is '\0', the file name is name;
   otherwise, it is prefix/name.  Files whose pathnames don't fit in
   that length can not be stored in a tar archive.  */
};

#define TMAGIC   "ustar"        /* ustar and a null */
#define TMAGLEN  6
#define TVERSION "00"           /* 00 and no null */
#define TVERSLEN 2

#define TAMPON 4096


long amount512 (long n){
    return (n + 0x1FF) & ~0x1FF;
    //return (n + 511) / 512 * 512;
}

long minimum(long x, long y) {
    if (x > y) {
        return y;
    }   
    else {
        return x;
    }  
}

int magic(struct posix_header posix) {
    return (strncmp(posix.magic, TMAGIC, TMAGLEN) == 0);
}

int version(struct posix_header posix) {
    return (strncmp(posix.version, TVERSION, TVERSLEN) == 0);
}
void mode(char * mode) {
    long m;
    mode_t t;
    m = strtol(mode, NULL, 8);
    t = (m & ~S_IFMT);
    printf("Droits d accès : %04o | ", t);
    (t & S_IRUSR) ? printf("r") : printf("-");
    (t & S_IWUSR) ? printf("w") : printf("-");
    (t & S_IXUSR) ? printf("x") : printf("-");
    (t & S_IRGRP) ? printf("r") : printf("-");
    (t & S_IWGRP) ? printf("w") : printf("-");
    (t & S_IXGRP) ? printf("x") : printf("-");
    (t & S_IROTH) ? printf("r") : printf("-");
    (t & S_IWOTH) ? printf("w") : printf("-");
    (t & S_IXOTH) ? printf("x)\n") : printf("-\n");
}

void type(char c) {
    printf("Type du fichier : ");
    switch (c) {
    case '0':
        printf("Regular file\n");
        break;
    case '1':
        printf("Link\n");
        break;
    case '2':
        printf("Symbolic link\n");
        break;
    case '3':
        printf("Character special\n");
        break;
    case '4':
        printf("block special\n");
        break;
    case '5':
        printf("directory\n");
        break;
    case '6':
        printf("FIFO special\n");
        break;
    case '7':
        printf("reserved\n");
        break;
    default:
        printf("unknown\n");
    }
}

void date_modification(char * t) {
    long tmp;
    tmp = strtol(t, NULL, 8);
    struct tm *info;
    info = localtime(&tmp);
    char buffer[80];
    strftime(buffer, 80, "%d/%m/%Y %H:%M:%S", info);
    printf("Date de modification : %s\n", buffer);
}

void checksum(struct posix_header posix) {
    unsigned int sum = 0;
    unsigned chksum = strtoul(posix.chksum, NULL, 8);

    sum += size(posix.name, 100);
    sum += size(posix.mode, 8);
    sum += size(posix.uid, 8);
    sum += size(posix.gid, 8);
    sum += size(posix.size, 12);
    sum += size(posix.mtime, 12);
    sum += posix.typeflag;
    sum += size(posix.linkname, 100);
    sum += size(posix.magic, 6);
    sum += size(posix.version, 2);
    sum += size(posix.uname, 32);
    sum += size(posix.gname, 32);
    sum += size(posix.devmajor, 8);
    sum += size(posix.devminor, 8);
    sum += size(posix.prefix, 155);
    sum += (' ' * 8);

    printf("Checksum : %d\n", sum);
    assert(chksum == sum);
}

int size(char *p, int len) {
    int size = 0;
    for (int i = 0; i < len; i++) {
        size += p[i];
    }
    return size;
}

long lstar(const char *file){
    char buf [TAMPON];
    struct posix_header posix;
    int r, cpt, tab;
    long s, arrondi;

    /*Méthode : Chemin Complet du fichier*/
    char cwd[FILENAME_MAX];
    getcwd(cwd, sizeof(cwd));

    r = read(STDIN_FILENO, &posix, sizeof(posix));
    assert(r == sizeof(posix));

    while (magic(posix) && version(posix)) {
        s = strtol(posix.size, NULL, 8);

        printf("Nom : %s\n", posix.name);
        //printf("Préfixe : %s\n", posix.prefix);
        printf("Taille : %ld\n", s);
        printf("Chemin complet : %s\n", cwd);
        // Type
        type(posix.typeflag);
        // Mode
        mode(posix.mode);
        // Date de modification
        date_modification(posix.mtime);
        // Checksum
        checksum(posix);

        arrondi = amount512(s) + 12;
        cpt = 0;
        while (cpt < arrondi) {
            r = read(STDIN_FILENO, buf, minimum(arrondi-cpt, TAMPON));
            assert(r != -1);
            cpt += r;
        }
        r = read(STDIN_FILENO, &posix, sizeof(posix));
        assert(r != -1);
        printf("\n");
    }
    return strtol(posix.size, NULL, 8);
}

int main(int argc, char const *argv[]) {
    lstar(argv[1]);
    return 0;
}

