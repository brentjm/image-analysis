import psycopg2
import numpy as np


class Database(object):
    """Helper class to add data to PostgreSQL database.
    """
    def __init__(self):
        self._connection = None
        self._cursor = None
        self._index = 10012
        self.connect_to_database()


    def connect_to_database(self):
        """Connect to the PostgreSQL database and create cursor.
        """
        try:
            self._connection = psycopg2.connect(user="postgres",
                                          password="postgrespassword",
                                          host="postgres",
                                          port="5432",
                                          database="SPECTech")
            print("connected to database")
        except psycopg2.OperationalError:
            print("Database connection failed:", error)

        self._cursor = self._connection.cursor()


    def insert_image(self, image_name, image):
        """Insert image into database

        Arguments
        image_name (str): Name of image.
        image (list): Multi-dimensional list representing pixel image intensity.
        """
        postgres_insert_query = """ INSERT INTO images (timestamp, name, intensity) VALUES (%s,%s,%s)"""
        record_to_insert = (self._index, image_name, image)
        try:
            self._cursor.execute(postgres_insert_query, record_to_insert)
            self._connection.commit()
            count = self._cursor.rowcount
            print (count, "Test image successfully inserted into image table")
            self._index += 1
        except (psycopg2.Error) as error:
            print("Failed to insert test image into image table", error)


    def close(self):
        """Close the database connection"""
        self._cursor.close()
        self._connection.close()
        print("PostgreSQL connection is closed")


    def populate(self):
        """Insert several test images into the database.
        """
        for i in range(10):
            image_name = "test_{}".format(i)
            image_data = np.random.rand(10,10,10).tolist()
            self.insert_image(image_name, image_data)

if __name__ == "__main__":
    database = Database()
    database.populate()
    database.close()
