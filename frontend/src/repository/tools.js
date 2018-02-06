import IsOk from "../components/IsOk";
import IsNotOk from "../components/IsNotOk";

import agent from 'superagent';

export const checkIdentity = (test) => {
  try {
      if(test){
          return IsOk;
      }
      else{
          return IsNotOk;
      }
  }
  catch(err) {
    console.error(err);
  }
};
