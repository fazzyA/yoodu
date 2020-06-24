import  {firestore, firebase } from "firebaseConfig";

// get all available jobs
export const listUsers = (type) => async (dispatch, getState) => {
    // console.log("****************************************************************************")
          const state = getState();
          console.log(state.authState)
          var user = firebase.auth().currentUser;
          console.log(user)
           if(user && state.authState.currentUser.role === "admin"){
              console.log(user);
              var users=[];
              let userRef = firestore.collection('users_detail')
              
              try {
                const ausers = await userRef.get()
                
                ausers.forEach(user => {
                  
                   
                     users.push({...user.data()})
                      
                });
                // console.log(jobs)
                dispatch({ type: "listUsers", payload: {users} });
                dispatch({ type: 'clearError'});
                     // console.log("end")
                }
                catch (err) {
                  console.log(err);
                  dispatch({ type: 'setError' , 
                  payload : {
                              msg : err.message, 
                              status : "error" , 
                              id: err.code
                            }
                          })
                } 
            }
           else{
               console.log('error')
           }
          // });
      }; 
        
    // console.log(currentuser)

// get all available jobs
export const getUser = (uid) => async (dispatch, getState) => {
    console.log("****************************************************************************")
          const state = getState();
          console.log(uid)
          var user = firebase.auth().currentUser;
          console.log(user)
           const adminck = await user.getIdTokenResult()
           console.log(adminck.claims.admin)
           if(user && adminck.claims.admin === true && uid !== undefined){
              console.log(user);
              var users=[];
              let userRef = firestore.collection('user-details').where("userId","==",uid)
              
              try {
                const ausers = await userRef.get()
                console.log("()()()()()()()()()()()()()()()")
                console.log(ausers)
                ausers.forEach(usr => {
                  
                   console.log(usr.data())
                   users.push({...usr.data()})
                      
                });
                console.log(users)
                dispatch({ type: "getUser", payload: {...users[0]} })
                //{...users, userDetail : users.filter((user)=>user.userId===uid ) } });
                dispatch({ type: 'clearError'});
                     // console.log("end")
                }
                catch (err) {
                  console.log(err);
                  dispatch({ type: 'setError' , 
                  payload : {
                              msg : err.message, 
                              status : "error" , 
                              id: err.code
                            }
                          })
                } 
            }
           else{
               console.log('error')
           }
          // });
      }; 


