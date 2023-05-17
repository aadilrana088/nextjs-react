import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    return client;
}

export async function insertDocument(client, dbName, table, document) {
    const db = client.db(dbName);
    const result = await db.collection(table).insertOne(document);
    return result;
}

export async function getAllDocuments(client, dbName, collection, sort) {
    const db = client.db(dbName);

    const documents = await db
        .collection(collection)
        .find()
        .sort(sort)
        .toArray();

    return documents;
}
