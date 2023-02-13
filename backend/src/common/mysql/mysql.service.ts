import { createPool } from 'mysql2';

export const poolConnection = createPool({
  host: 'localhost',
  user: 'snowFoxUser',
  password: '456#789@',
  database: 'db_snowfox',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

export const poolPromise = poolConnection.promise();

/* 
mysqlProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'snowFoxUser',
        password: '456#789@',
        database: 'db_snowfox',
        entities: [],
        synchronize: false
      });

      return dataSource.initialize();

    },
  },
];
*/