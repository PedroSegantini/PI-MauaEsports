// console.log("auth.js starting, typeof msal:", typeof msal); //testing
// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "958b1c39-d74a-427e-85fc-0366f6056f44",
    authority:
      "https://login.microsoftonline.com/d0338e67-ea94-4836-8d38-d2936d7d00fe",
    redirectUri: "http://localhost:3000/Frontend/admin.html",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const userInfoDiv = document.getElementById("userInfo");
const userNameP = document.getElementById("userName");
const userEmailP = document.getElementById("userEmail");
const errorMessageDiv = document.getElementById("errorMessage");

const loginRequest = {
  scopes: ["User.Read"],
};

function showWelcomeMessage(account) {
  if (account) {
    userNameP.innerText = `Name: ${account.name}`;
    userEmailP.innerText = `Email: ${account.username}`;
  }
}

function showError(error) {
  console.error(error);
  errorMessageDiv.innerText = `Error: ${
    error.errorMessage || error.message || error
  }`;
}

async function login() {
  try {
    const silentRequest = {
      scopes: loginRequest.scopes,
      account: msalInstance.getAllAccounts()[0],
    };

    if (silentRequest.account) {
      const silentResponse = await msalInstance.acquireTokenSilent(
        silentRequest
      );
      console.log("Silent token acquisition successful:", silentResponse);
      showWelcomeMessage(silentResponse.account);
      return;
    }
  } catch (error) {
    console.warn(
      "Silent token acquisition failed, proceeding to interactive login:",
      error
    );
  }

  try {
    // const loginResponse = await msalInstance.loginPopup(loginRequest);
    const loginResponse = await msalInstance.loginRedirect(loginRequest); //redirect login
    console.log("Login successful:", loginResponse);
    msalInstance.setActiveAccount(loginResponse.account);
    showWelcomeMessage(loginResponse.account);
  } catch (error) {
    showError(error);
  }
}

async function logout() {
  const currentAccount = msalInstance.getActiveAccount();
  const logoutRequest = {
    account: currentAccount,
    postLogoutRedirectUri: "http://localhost:3000/Frontend/index.html",
  };
  try {
    // msalInstance.logoutPopup(logoutRequest);
    await msalInstance.logoutRedirect(logoutRequest); //redirect logout
    errorMessageDiv.innerText = "Você saiu da conta.";
    msalInstance.setActiveAccount(null);
  } catch (error) {
    showError(error);
  }
}

msalInstance
  .handleRedirectPromise()
  .then((response) => {
    if (response) {
      console.log("Redirect response processed:", response);
      msalInstance.setActiveAccount(response.account);
      showWelcomeMessage(response.account);
    } else {
      const currentAccounts = msalInstance.getAllAccounts();
      if (currentAccounts.length > 0) {
        msalInstance.setActiveAccount(currentAccounts[0]);
        showWelcomeMessage(currentAccounts[0]);
      }
    }
  })
  .catch((error) => {
    showError(error);
  });

if (loginButton) {
  loginButton.addEventListener("click", login);
}
logoutButton.addEventListener("click", logout);

if (
  !window.location.hash.includes("code=") &&
  !window.location.hash.includes("error=")
) {
  const currentAccounts = msalInstance.getAllAccounts();
  if (currentAccounts.length > 0) {
    msalInstance.setActiveAccount(currentAccounts[0]);
    showWelcomeMessage(currentAccounts[0]);
  }
}
