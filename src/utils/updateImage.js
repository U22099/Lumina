import axios from 'axios';
import refresh from './refresh.js';
import {getToken} from './token.js';
import origin from '../../config/origin.json';
import indexedDB from "./indexedDB";

const updateImage = async (setLoad, image, navigate) => {
  setLoad(true);
    try {
      const url = `${origin.default.origin}/user?token=${getToken('__A')}&_id=${getToken('_ID')`;

    = await patcimage}, {withCredentials: true});
      stLoad(fals    cost data = await indexedDBta("UserData");
      indexedDB.saveData([...data, image], "UserData");
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          updateImage(setLoad, image, navigate);
        }
      } else {
        console.log(err);
      }
    }
  };

  export default updateImage