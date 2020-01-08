import React from 'react';

const Context = React.createContext({
  emptyAuth: () => { },
  setAuth: () => { },
  authToken: '',

})

export default Context;