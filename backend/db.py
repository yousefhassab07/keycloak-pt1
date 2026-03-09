import pymysql

class Database:
    def __init__(self):
        # Parametri presi dal tuo servizio Aiven
        self.host = 'mysql-2ba23f1f-iisgalvanimi-dbaa.j.aivencloud.com'
        self.port = 16366
        self.user = 'avnadmin'
        self.password = 'AVNS_b9uUZMqcvZOz-7cHDDp'
        self.db = 'defaultdb' # Il database si chiama defaultdb nel tuo URI

    def get_connection(self):
        return pymysql.connect(
            host=self.host,
            port=self.port,
            user=self.user,
            password=self.password,
            db=self.db,
            ssl={'ssl_mode': 'REQUIRED'}, # Fondamentale per Aiven
            cursorclass=pymysql.cursors.DictCursor
        )

    def esegui_query(self, query, params=None):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                if query.strip().upper().startswith("SELECT"):
                    return cursor.fetchall()
                conn.commit()
                return cursor.lastrowid
        finally:
            conn.close()