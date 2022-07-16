FROM mongo

COPY . .

CMD mongoimport --mode=upsert --uri mongodb://mongo:27017/restaurantSearchEngine --collection users \
    && mongoimport --mode=upsert --uri mongodb://mongo:27017/restaurantSearchEngine --collection tokens \