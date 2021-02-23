import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";

/**
 *  subscribe to a firebase collection
 * @param collectionName the collection to subscribe to
 * @returns the `collection` array with all documents
 * */
const useCollection = (collectionName, orderbyField, where) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    let collectioneRef = db.collection(collectionName);

    if (orderbyField) {
      collectioneRef = collectioneRef.orderBy(orderbyField);
    }

    if (where && where.length) {
      console.log(where);
      const [fieldName, fieldOperator, fieldValue] = where;
      collectioneRef = collectioneRef.where(
        fieldName,
        fieldOperator,
        fieldValue
      );
    }

    const unsubscribe = collectioneRef.onSnapshot((snapshot) => {
      let docs = [];
      snapshot.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
      setCollection(docs);
    });

    return unsubscribe;
  }, [collectionName, orderbyField, where]);

  return collection;
};

export default useCollection;
