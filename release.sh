#!/bin/sh

echo "release version is $1"
echo "api client version is $2"
echo "tag message is $3"

git checkout -b release/$1
sed -i -e 's/"version": "[[:digit:]].[[:digit:]].[[:digit:]]"/"version": "'$1'"/' package.json
sed -i -e 's/optimistiks\/ezdict_api_client#.*"/optimistiks\/ezdict_api_client#'$2'"/' package.json
git commit -a -m "bump version"

git tag -a $1 -m "$3"

git push --set-upstream origin release/$1
git push --tags
