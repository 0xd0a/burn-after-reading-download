db.createUser({
  user: 'root',
  pwd: 'rootpassword',
  roles: [
    {
      role: 'readWrite',
      db: 'downloads'
    }
  ]
});
db = new Mongo().getDB('downloads');

db.createCollection('downloads', { capped: false });

db.downloads.insert([
  {
    id: 'o9y5ON7ODx1sXti3qqbm8a8fhieK9tPPWq0nTIRKJ93WoKphNEgysFICdf4ZVqcb',
    text: '1234',
    status: 0,
    type: 'burnafterread'
  },
  {
    id: 'umgXObV6qYK5X5PZiDSSftQWiehq4a56sL5TTUj7tPvTMQYo3ADCg9R77mFCVEz7',
    text: '5678',
    status: 0,
    type: 'burnafterread'
  }
]);
