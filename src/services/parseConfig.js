// parseConfig.js
import Parse from 'parse';

const initializeParse = () => {
  const AppId = process.env.REACT_APP_MY_APP_ID;
  const JavaScriptKey = process.env.REACT_APP_JAVASCRIPT_KEY;
  const serverURL = process.env.REACT_APP_SERVER_URL;
  
  Parse.initialize(AppId, JavaScriptKey);
  Parse.serverURL = serverURL;
};

export   { initializeParse };
