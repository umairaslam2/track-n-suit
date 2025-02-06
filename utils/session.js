// utils/session.js
export const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = generateUUID(); // Generate new session ID if not present
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  };
  
  // Helper function to generate a unique UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  