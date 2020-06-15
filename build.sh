#!/bin/bash
set -x

# Build script
cd ~/app.thomas-claireau.fr/fcc/portfolio-webpage
source ~/.bashrc
npm install
npm run build