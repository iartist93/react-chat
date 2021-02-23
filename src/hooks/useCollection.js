import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";

/**
 *  subscribe to a firebase collection
 * @param collectionName the collection to subscribe to
 * @return the `collection` array with all documents
 * */
const useCollection = (collectionName, orderbyField, where = []) => {
  const [collection, setCollection] = useState([]);
  const [fieldName, fieldOperator, fieldValue] = where;

  useEffect(() => {
    let collectioneRef = db.collection(collectionName);

    if (orderbyField) {
      collectioneRef = collectioneRef.orderBy(orderbyField);
    }

    if (fieldName) {
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
  }, [collectionName, orderbyField, fieldName, fieldOperator, fieldValue]);

  return collection;
};

export default useCollection;
