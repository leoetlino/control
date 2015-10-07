#!/bin/bash

set -e

green='\033[1;32m'
blue='\033[1;34m'
reset='\033[0m'

printf "${blue}Copying build to remote server…${reset}\n"
scp -r dist/ deploy@control-host.shoutca.st:control-${CI_BUILD_REF}

printf "${blue}Removing the backup of the previous production build…${reset}\n"
ssh deploy@control-host.shoutca.st "rm -rf ~/control.backup || true"

printf "${blue}Making a backup of the current production build backup…${reset}\n"
ssh deploy@control-host.shoutca.st "mv /var/www/html/control ~/control.backup"

printf "${blue}Moving the new build…${reset}\n"
ssh deploy@control-host.shoutca.st "mkdir /var/www/html/control"
ssh deploy@control-host.shoutca.st "mv ~/control-${CI_BUILD_REF} /var/www/html/control/dist"
ssh deploy@control-host.shoutca.st "date > /var/www/html/control/build-date"
ssh deploy@control-host.shoutca.st "echo ${CI_BUILD_REF} > /var/www/html/control/build-ref"

printf "${green}${CI_BUILD_REF} deployed${reset}\n"
