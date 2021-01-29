import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";

/**
 *  subscribe to a firebase collection
 * @param collectionName the collection to subscribe to
 * @returns the `collection` array with all documents
 * */
const useCollection = (collectionName, orderbyField) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    let collectioneRef = db.collection(collectionName);

    if (orderbyField) {
      console.log(`In orderbyField ${orderbyField}`);
      collectioneRef = collectioneRef.orderBy(orderbyField);
    }

    const unsubscribe = collectioneRef.onSnapshot((snapshot) => {
      let docs = [];
      snapshot.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
      setCollection(docs);
    });

    return unsubscribe;
  }, [collectionName, orderbyField]);

  return collection;
};

export default useCollection;
