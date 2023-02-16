const indexState = {
  unseennotification:[],
  notifications: [],
  successMessage:""
};
export const notificationReducer = (state = indexState, action) => {
  const { type, payload } = action;
  
  if (type === "NOTIFICATION_GET_SUCCESS") {
    return {
      ...state,
      notification: payload,
    };
  }
   if (type === "UNSEEN_NOTIFICATION_GET_SUCCESS") {
     return {
       ...state,
       unseennotification: payload,
     };
   }
   if (type === "NOTIFICATION_SEEN_SUCCESS" || type === "NOTIFICATION_UNSEEN_SUCCESS") {
     return {
       ...state
     };
   }
   if (type === "NOTIFICATION_DELETE_SUCCESS") {
    
     return {
       ...state,
       successMessage: payload,
     };
  }
  if (type === "NOTIFICATION_CLEAR") {
    return {
      ...state,
      successMessage:"",
    };
  }
  return state;
};
