#!/bin/bash
set -e

green='\033[1;32m'
reset='\033[0m'
PRIVATE_KEY_NAME='ssh-private-key'

eval $(ssh-agent)
echo "$STRIDER_SSH_PRIV" > $PRIVATE_KEY_NAME
chmod 600 $PRIVATE_KEY_NAME
ssh-add $PRIVATE_KEY_NAME

echo $STRIDER_BRANCH
echo $STRIDER_FETCH
exit 0

printf "Copying build to remote server…\n"
scp -r dist/ deploy@control-host.shoutca.st:control-${STRIDER_JOB_ID}

printf "Removing the backup of the previous production build…\n"
ssh deploy@control-host.shoutca.st "rm -rf ~/control.backup || true"

printf "Making a backup of the current production build backup…\n"
ssh deploy@control-host.shoutca.st "mv /var/www/html/control ~/control.backup"

printf "Moving the new build…\n"
ssh deploy@control-host.shoutca.st <<EOF
mkdir /var/www/html/control
mv ~/control-${STRIDER_JOB_ID} /var/www/html/control/dist
date > /var/www/html/control/build-time
echo ${STRIDER_JOB_ID} > /var/www/html/control/ci-job-id
EOF

printf "${green}Deployed.${reset}\n"

eval $(ssh-agent -k)
rm $PRIVATE_KEY_NAME
