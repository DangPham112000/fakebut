#!/bin/bash

echo "Starting Backend..."
cd ./backend/nodejs  
yarn install   
yarn dev &   

sleep 5       

echo "Starting Frontend..."
cd ../../frontend
yarn install   
yarn dev     
 