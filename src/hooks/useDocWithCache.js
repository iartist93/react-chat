import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";

//FIXME: Convert this into `context`
const cache = {};
const pendingCache = {};

/**
 * retrieve and cache the document,
 *
 * It will store the pending promise in a pending cache,
 * so that we don't keep fetching the same document,
 * and wait for one promise per document
 *
 *  @param docPath path to the document to get
 *  @return the `document` object with all document fields
 * */
const useDocWithCache = (docPath) => {
  const [doc, setDoc] = useState(cache[docPath]);

  useEffect(() => {
    let isMounted = true;

    if (cache[docPath]) {
      return;
    }

    let promise = pendingCache[docPath];
    if (!promise) {
      console.log("Doc Path : ");
      console.log(docPath);
      pendingCache[docPath] = db.doc(docPath).get();
      promise = pendingCache[docPath];
    }
    promise.then((document) => {
      cache[docPath] = document.data();
      if (isMounted) {
        setDoc(document.data());
      }
    });

    return () => {
      isMounted = false;
    };
  }, [docPath, doc]);

  return doc;
};

export default useDocWithCache;
