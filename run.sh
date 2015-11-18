#!/bin/sh -e

if [ "$1" = "" ]; then
  echo "No url found"
  exit 0
fi

url=$1
output=${url##*/}

echo "Processing $url"

echo "Creating dirs"
mkdir -p tmp/
mkdir -p images/

echo "Clean up"
rm -f tmp/$output.dot
rm -f images/$output.png

echo "Downloading raw data for dot file"
node index.js $url > tmp/$output.dot

echo "Converting dot file"
twopi -Tpng tmp/$output.dot -o images/$output.png

echo "Done! images/$output.png has been created"