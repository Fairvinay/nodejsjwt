


--------GIT 
eval "$(ssh-agent -s)"
ssh-add ./id_rsa

ssh -T git@github.com
then

check the remote url 
git config --get remote.origin.url 
 
then set new one   https://github.com/Fairvinay/nodejsjwt.git
 git remote set-url origin https://github.com/Fairvinay/nodejsjwt.git

in case above does not work try this 
git push -u https://github.com/Fairvinay/nodejsjwt.git master