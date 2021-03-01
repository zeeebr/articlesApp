git pull
npm install
rm -r public
cd client
npm install
npm run build
mv build ../public
sudo pm2 restart app --update-env
done