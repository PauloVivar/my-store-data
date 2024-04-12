
//conexiobn a la bd no tan recomendable ay que toca hace a cada rato un aconexion con getConnection();
//mejor utlizar pool

const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'paulov',
    password: 'paulovroot',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
