printf "Début des tests : un print commençant par \"Erreur:\" correspond à un défaut de retour (true ou false)"
printf "\n___________________________________\n"

printf "\nDébut des tests avec 'true' et 'false'"

printf "\n\nDébut des tests pour -o\n"
./do -o false false && echo "Erreur: or false false a renvoyé true" # -o avec que des erreurs
./do -o true  true  || echo "Erreur: or true true a renvoyé false"  # -o avec que des réussites
./do -o false true  || echo "Erreur: or false true a renvoyé false" # -o avec une erreur et une réussite

printf "\n\nDébut des tests pour -a ou sans option (donc -a implicite)\n"
./do -a false false && echo "Erreur: and false false a renvoyé true" # -a avec que des erreurs
./do -a true  true  || echo "Erreur: and true true a renvoyé false"  # -a avec que des réussites
./do -a false true  && echo "Erreur: and false true a renvoyé true" # -a avec une erreur et une réussite
./do false false    && echo "Erreur: (and) false false a renvoyé true" # -a avec que des erreurs
./do true  true     || echo "Erreur: (and) true true a renvoyé false"  # -a avec que des réussites
./do false true     && echo "Erreur: (and) false true a renvoyé true" # -a avec une erreur et une réussite

printf "\n___________________________________\n"

printf "\nDébut des tests avec commandes avec arguments"
printf "\nOn utilise \"man non\" pour renvoyer une erreur, ou \"echo ok\" pour ne pas en renvoyer"

printf "\n\nDébut des tests pour -o | man non | echo ok\n"
./do -o "man non" "man non"     && echo "Erreur: or false false a renvoyé true" # -o avec que des erreurs
./do -o "echo ok"  "echo ok"    || echo "Erreur: or true true a renvoyé false"  # -o avec que des réussites
./do -o "man non" "echo ok"     || echo "Erreur: or false false a renvoyé true" # -o avec une erreur et une réussite

printf "\n\nDébut des tests pour -a | man non | echo ok\n"
./do -a "man non" "man non"     && echo "Erreur: and false false a renvoyé true" # -a avec que des erreurs
./do -a "echo ok"  "echo ok"    || echo "Erreur: and true true a renvoyé false"  # -a avec que des réussites
./do -a "man non" "echo ok"     && echo "Erreur: and false true a renvoyé true" # -a avec une erreur et une réussite

printf "\n___________________________________\n"

printf "\nDébut des tests avec commandes avec options -c et -k"
printf "\nOn peut exécuter certains tests, mais pas tous : en enchaînant les ouvertures de manuel, le shell bug..."
printf "\nVous pourrez cependant exécuter individuellement les deux tests commentés pour vérifier leur validité\n"

./do -o -c -k "man non" "man non" && echo "Erreur: and false false a renvoyé true"
./do -o -c -k "man man" "man man" || echo "Erreur: or true true a renvoyé false"    # le man ne s'ouvre qu'une fois
#./do -o -c -k "man non" "man man" "man non" "man man"                              # idem mais si vous enchaînez tous les tests,
                                                                                    # plusieurs pages s'ouvriront en même temps et ça fera bugger le terminal
./do -a -c -k "man non" "man man" && echo "Erreur: and false true a renvoyé true" # le manuel ne s'ouvrira pas
#./do -a -c -k "echo ok" "man man" || echo "Erreur: and true true a renvoyé false"  # le manuel s'affichera et l'echo également
./do -a -c -k "man non" "man non" && echo "Erreur: and false false a renvoyé true"
