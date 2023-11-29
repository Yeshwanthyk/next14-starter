forever stopall
cd /root/app/api
git pull
yarn build
forever start ~/app/api/dist/index.js
