#!/usr/bin/env bash

if [ -z "$1" ]
  then
    echo "No argument supplied
    Usage : ./make_release.sh <version>"
else
  RELEASE_FILE_NAME="APP_ANDROID_CULTIVE_MOI_V$1.apk"
  sudo ionic cordova prepare android --prod --minifyjs --minifycss --optimizejs --aot &&
  sudo javascript-obfuscator www/build/main.js --output www/build/main.js &&
  sudo cp www/build/* platforms/android/app/src/main/assets/www/build/ &&
  sudo ionic cordova compile android --release &&
  sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cultive-moi-key.keystore -storepass miage2018 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk cultive-moi &&
  sudo zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $RELEASE_FILE_NAME &&
  sudo apksigner verify $RELEASE_FILE_NAME
fi