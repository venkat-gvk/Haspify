import { db } from "../firebase/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import moment from "moment";

export const getData = async (hash) => {
  const docRef = doc(db, "links", hash);
  const store_obj = await getDoc(docRef);

  if (store_obj.exists()) {
    const { url, m_currentTime, password } = store_obj.data();

    let difference_time = null;

    if (m_currentTime) {
      const current_time = moment();

      const stored_time_from_db = moment(m_currentTime);

      // check if the current time > stored time for deletion
      const is_url_valid = current_time.isBefore(stored_time_from_db);

      if (!is_url_valid) {
        deleteData(hash);
        return null;
      }

      difference_time = moment.duration(stored_time_from_db.diff(current_time));
    }

    return { url, password, time: difference_time };
  }

  // if the document doesn't exists at all or deleted after expiration
  return null;
};

export const deleteData = async (hash) => {
  await deleteDoc(doc(db, "links", hash));
};
