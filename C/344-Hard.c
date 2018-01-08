#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>

#define BUFFER_SIZE 256

void *get_in_addr(struct sockaddr *sa) {
    if (sa->sa_family == AF_INET) {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

int connect_socket(char *domain, char *port) {
    struct addrinfo hints, *servinfo, *p;
    int sockfd;
    char s[INET6_ADDRSTRLEN];

    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    printf("\n");
    if (getaddrinfo(domain, port, &hints, &servinfo) != 0) {
        printf("Failed to query host: %s\n", domain);
        exit(1);
    }

    for (p = servinfo; p != NULL; p = p->ai_next) {
        if ((sockfd = socket(p->ai_family, p->ai_socktype, p->ai_protocol)) < 0) {
            continue;
        }

        if (connect(sockfd, p->ai_addr, p->ai_addrlen) < 0) {
            close(sockfd);
            continue;
        }

        break;
    }

    if (p == NULL) {
        printf("Failed to create socket.\n");
        exit(1);
    }

    inet_ntop(p->ai_family, get_in_addr((struct sockaddr *)p->ai_addr), s, sizeof s);
    freeaddrinfo(servinfo);

    return sockfd;
}

int main(int argc, char* argv[]) {
    int numbytes;
    char buf[BUFFER_SIZE];
    char header[1024];
    int sockfd = connect_socket(argv[1], argv[2]);

    sprintf(header, "GET / HTTP/1.1\r\nHost: %s\r\nConnection: close\r\n\r\n", argv[1]);
    send(sockfd, header, strlen(header), 0);

    while ((numbytes = read(sockfd, buf, BUFFER_SIZE-1)) > 0) {
        fprintf(stderr, "%s", buf);
        bzero(buf, BUFFER_SIZE);
    }

    close(sockfd);
    printf("\n");

    return 0;
}