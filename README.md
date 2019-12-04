

run the following command:

npm install $( cat requirements_server.txt )
npm install -D nodemon
npm run client-install 
cd client && npm install $( cat requirements_client.txt ) 


to run just server:
   npm run server

to run just client:
   npm run client

to run both together:
   npm dev

