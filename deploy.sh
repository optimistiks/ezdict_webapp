#!/bin/sh

echo "deploying version $1"

git pull
git checkout $1
rm -rf node_modules
npm install
npm run build
