#!/usr/bin/env bash

cd ~/Library/Android/sdk/tools

OUTPUT="$(./emulator -list-avds)"

string=$OUTPUT
set -f                      # avoid globbing (expansion of *).
array=(${string// / })
for i in "${!array[@]}"
do
    val=`expr $i + 1`
    echo "$val. ${array[i]}"
done

#./emulator -avd $OUTPUT

echo "Enter the android Device index that to start"
read -p "Enter the android Device index that to start" num

if [ "$num" = "" ]; then
    ./emulator -avd ${array[0]}
    else
    num=${num#0}
    val2=`expr $num - 1`
    ./emulator -avd ${array[$val2]}
fi