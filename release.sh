#!/bin/sh

echo $1
echo $2

git checkout -b release/$1

git tag -a $1 -m "$2"
