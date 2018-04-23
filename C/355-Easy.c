// https://www.reddit.com/r/dailyprogrammer/comments/879u8b/20180326_challenge_355_easy_alphabet_cipher/
#include <stdio.h>
#include <string.h>

char shift(int a, int b) {
  a = a - 97;
  b = b - 97;
  return (((a + b) + 26) % 26) + 97;
}

int main(int argc, char *argv[]) {
  char* secret = argv[1];
  char* message = argv[2];
  int messageLen = strlen(message);
  char result[messageLen];
  for(int i = 0; i < messageLen; i++) {
    char s = secret[i % strlen(secret)];
    result[i] = shift(s, message[i]);
  }
  printf("%s\n", result);
}
