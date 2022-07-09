# For windows only (Use with git-bash)
rm -rf node_modules && yarn cache clean && rm -rf $APPDATA\Temp\haste-map-* && rm -rf $APPDATA\Temp\metro-cache && yarn install && expo start -c
