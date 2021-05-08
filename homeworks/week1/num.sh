#!/bin/bash
# Program:
#    Generate js file with sequal number as title
# Hisotry:
# 2021/04/16 Jen First release

for((i=1;i<=$1;i=i+1))
do
    touch "${i}.js"
done
echo "complete file generating process."
