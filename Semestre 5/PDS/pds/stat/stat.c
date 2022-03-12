/*Ex11 & 12 & 13*/

#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/sysmacros.h>
#include <errno.h>
#include <pwd.h>
#include <grp.h>

void errorStat(){
    switch(errno) {
        case EACCES:
            printf("Search permission is denied for one of the directories in the path prefix of pathname.\n");
            break;
        case EBADF:
            printf("fd is not a valid open file descriptor.\n");
            break;
        case EFAULT:
            printf("Bad address.\n");
            break;
        case ELOOP:
            printf("Too many symbolic links encountered while traversing the path.\n");
            break;
        case ENAMETOOLONG:
            printf("Pathname is too long.\n");
            break;
        case ENOENT:
            printf("A component of pathname does not exist or is a dangling symbolic link or pathname is an empty string and AT_EMPTY_PATH was not specified in flags.\n");
            break;
        case ENOMEM:
            printf("Out of memory (i.e., kernel memory).\n");
            break;
        case ENOTDIR:
            printf("A component of the path prefix of pathname is not a directory.\n");
            break;
        case EOVERFLOW:
            printf("pathname or fd refers to a file whose size, inode number, or number of blocks cannot be represented in, respectively, the types off_t, ino_t, or blkcnt_t. This error can occur when, for example, an application compiled on a 32-bit platform without -D_FILE_OFFSET_BITS=64 calls stat() on a file whose size exceeds (1<<31)-1 bytes.\n");
            break;
        default: 
            printf("Unknown error\n");
    }
}

void errorUserAndGroup(){
    switch(errno) {
        case 0 || ENOENT || ESRCH || EBADF || EPERM:
            printf("The given name or uid was not found.\n");
            break;
        case EINTR:
            printf("A signal was caught.\n");
            break;
        case EIO:
            printf("I/O error.\n");
            break;
        case EMFILE:
            printf("The per-process limit on the number of open file  descriptors has been reached.\n");
            break;
        case ENFILE:
            printf("The system-wide limit on the total number of open files has been reached.\n");
            break;
        case ENOMEM:
            printf("Insufficient memory to allocate passwd structure.\n");
            break;
        case ERANGE:
            printf("Insufficient buffer space supplied.\n");
            break;
        default: 
            printf("Unknown error\n");
    }
}

void inodeType(struct stat* st) {
    switch(st->st_mode & S_IFMT) {
        case S_IFSOCK:
            printf("It's a socket\n");
            break;
        case S_IFLNK:
            printf("It's a symbolic link\n");
            break;
        case S_IFREG:
            printf("It's a regular file\n");
            break;
        case S_IFBLK:
            printf("It's a block device\n");
            break;
        case S_IFDIR:
            printf("It's a directory\n");
            break;
        case S_IFCHR:
            printf("It's a character device\n");
            break;
        case S_IFIFO:
            printf("It's a FIFO\n");
            break;
        default:
            printf("Unknown\n");
    }
}

void userLoginAndGroup (struct stat *st){
    struct passwd *userLogin;
    userLogin = getpwuid(st->st_uid);
    struct group *userGroupName;
    userGroupName = getgrgid(st->st_gid);
    printf("username : %s\n", userLogin->pw_name);
    printf("user's group name : %s\n", userGroupName->gr_name);
}


void myStat(const char *path){
    struct stat st;
    if (stat(path,&st) == -1) {
        errorStat();
    } else {
        int chmod = st.st_mode & (S_IRWXU | S_IRWXG | S_IRWXO);
        inodeType(&st);
        printf("%s %lxh/%ldd\n","Device:", st.st_dev, st.st_dev);
        printf("%s %ld\n","Inode number :", st.st_ino);
        printf("%s 0%o\n","Access :", chmod);
        printf("%s %ld\n","Links :", st.st_nlink);
        printf("%s %d\n","Uid :", st.st_uid);
        printf("%s %d\n","Gid :", st.st_gid);
        /* printf("%s %ld\n","Did if special file :", st.st_rdev); */
        printf("%s %ld %s\n","Size :", st.st_size, "bytes");
        printf("%s %ld %s\n","IO Block :", st.st_blksize, "regular file");
        printf("%s %ld\n","Blocks :", st.st_blocks);
        userLoginAndGroup(&st);
    }
}


int main(int argc, char const *argv[]) {
    if (argc==2) myStat(argv[1]);
    else {
        printf("You need to write the name of a file as the second argument to execute the command.\n");
        printf("For example : ./stat <nameOfTheFile>\n");
    }
    return 0;
}

