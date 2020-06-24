// export const GET_ERRORS = 'GET_ERRORS';
// export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: "setError",
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: "clearError",
    
  };
};
