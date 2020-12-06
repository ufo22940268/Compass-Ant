#!/bin/bash
rm Ant.zip
zip -r Ant.zip . -x "*.git*" -x ".idea*" -x "asset/*" -x "*.zip" -x "package.sh"
