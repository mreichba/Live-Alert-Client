/**
 * AuthContext.js
 * - Provides default structure for authentication context
 * - Used to share auth state and handlers (token, login/logout) across components
 */

import React from 'react';

const defaultAuthContext = Object.freeze({
  authToken: null,            // Holds the JWT or session token
  setAuth: () => {},          // Used to set a new token
  emptyAuth: () => {},        // Used to clear token on logout
});

const Context = React.createContext(defaultAuthContext);

export default Context;