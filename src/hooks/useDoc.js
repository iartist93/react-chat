import { useState, useEffect } from "react";
import { db } from "../firebase.js";

/**
 *  subscribe to a firebase docuemnt
 * @param documentName the docuement to subscribe to
 * @returns the `document` object with all document fields
 * */
const useDoc = (docName) => {
  const [document, setDocument] = useState({});

  useEffect(() => {
    return db.doc(docName).onSnapshot((snapshot) => {
      let doc = { ...snapshot.data };

      setDocument(doc);
    });
  }, [docName]);

  return document;
};

export default useDoc;
