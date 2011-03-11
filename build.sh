#!/bin/sh

# ./build.sh creates media/glow.min.js for minified production javascript.

java -jar bin/compiler.jar $(grep 'script src.*\.js"' index.html | perl -pi -e 's/.*src="(.*)".*/--js="\1"/') --js_output_file=media/glow.min.js
