import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_Mixpanel_ID);

let env_check = false;
if (process.env.REACT_APP_Mixpanel_ID) {
  env_check = true;
}

function generateTabId() {
  return "tab_" + Date.now(); // You may want to make this more robust
}

// Retrieve or generate tab ID
let tabId = sessionStorage.getItem("tabId");
if (!tabId) {
  tabId = generateTabId();
  sessionStorage.setItem("tabId", tabId);
}

let actions = {
  track: (name, props, level = "info") => {
    const user_id = window.localStorage.getItem("USER-ID");
    const user_email = window.localStorage.getItem("USER-MAIL-ID");
    let tabId = sessionStorage.getItem("tabId");

    const properties = {
      misc: { ...props },
      level,
      user_id,
      user_email,
      tabId,
      logFrom: "Client",
    };

    if (env_check) {
      mixpanel.track(name, properties);
    }
  },
};

export const Mixpanel = actions;
