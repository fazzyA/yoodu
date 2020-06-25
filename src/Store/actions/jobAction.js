import {firestore, firebase } from "firebaseConfig";
import * as firebaser from 'firebase';// get me the firebase jobbase
// const jobbaseRef = firebase.jobbase().ref();
// console.log(jobbaseRef)
//  

var user = firebase.auth().currentUser;

// Add new job
 export const createJob = (job) => async dispatch => {
   console.log(user)
    //job.userId = user.uid

    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            console.log(user);
            job.userid = user.uid
            job.status = "open"
            job.createdAt = Date.now()
            console.log(job)
            firestore.collection('jobs').add(job).then(() => {
                // register was succesful by sending true
                 dispatch({ type: "CreateJob", payload: {job} });
                 dispatch({ type: 'clearError'});
             }).catch(err => {
               console.log(err);
               dispatch({ type: 'setError' , 
               payload : {
                    msg : err.message, 
                    status : "error" , 
                    id: err.code
                }
             });
        
         });
        }
        
        else // user is undefined if no user signed in
        dispatch({ type: 'setError' , 
        payload : {
            msg : "", 
            status : "error" , 
            id: 77889}
        });
      
       });

  
};

// get all available jobs
export const listJobs = (type) => async (dispatch, getState) => {
  // console.log("****************************************************************************")
        const state = getState();
        console.log(state.authState)
        var user = firebase.auth().currentUser;
        console.log(user)
         if(user){
             console.log(user);
            var jobs=[];
            let jobRef = null;
            let rjRef = firestore.collection('rejectedJobs').doc(user.uid);
            if(state.authState.currentUser.role === "client" && type !== "open")
            jobRef = firestore.collection('jobs').where("status","==",type).where("acceptedBy","==",user.uid)
            else 
            jobRef = firestore.collection('jobs').where("status","==",type);

            try {
              const ajobs = await jobRef.get()
              const rjarray = await rjRef.get();
              const rejected= rjarray.data()?rjarray.data().rjobs : [];
              // const adminck = await user.getIdTokenResult()
              // // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
              // console.log(adminck)
              ajobs.forEach(job => {
                
                 if(!rejected.includes(job.id))
                    jobs.push({...job.data(), id : job.id})
                 else if(state.authState.currentUser.role === "admin")
                 {
                   jobs.push({...job.data(), id : job.id})
                 }   
              });
              console.log(jobs)
              dispatch({ type: "listJobs", payload: {jobs} });
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

// Update new job
export const updateJob = (job) => async dispatch => {
  // console.log(user)
   //job.userId = user.uid
   var user = firebase.auth().currentUser;
      if(user){
           console.log(user);
           job.userid = user.uid
          //  job.status = "open"
          //  job.createdAt = Date.now()
           console.log(job)
           firestore.collection('jobs').doc(job.id).set(job)
           .then((res) => {
               console.log(res)
                dispatch({ type: "UpdateJob", payload: {job} });
                dispatch({ type: 'clearError'});
            }).catch(err => {
              console.log(err);
              dispatch({ type: 'setError' , 
              payload : {
                   msg : err.message, 
                   status : "error" , 
                   id: err.code
               }
            });
       
        });
       }
       
       else // user is undefined if no user signed in
       dispatch({ type: 'setError' , 
       payload : {
           msg : "", 
           status : "error" , 
           id: 77889}
       });
     
      
};

//db.collection('cities').doc('DC').delete();

// delete job
export const deleteJob = (job) => async dispatch => {
  console.log("deleting------------------job")
   //job.userId = user.uid
   var user = firebase.auth().currentUser;
      if(user){
           
           console.log(job)
           let deleteDoc =firestore.collection('jobs').doc(job.id).delete()
          //  let deleteDoc = db.collection('cities').doc('DC').delete();
          
           .then((res) => {
            //  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
               console.log(res)
                dispatch({ type: "deleteJob", payload: {job} });
                dispatch({ type: 'clearError'});
            }).catch(err => {
              console.log(err);
              dispatch({ type: 'setError' , 
              payload : {
                   msg : err.message, 
                   status : "error" , 
                   id: err.code
               }
            });
       
        });
       }
       
       else // user is undefined if no user signed in
       dispatch({ type: 'setError' , 
       payload : {
           msg : "", 
           status : "error" , 
           id: 77889}
       });
     
      
};


// accept job
export const acceptJob = (job) => async (dispatch,getState) => {
  console.log("Accepting------------------job")
  const state = getState();

   var user = firebase.auth().currentUser;
      if(user){
           
            // job.userid = user.uid
            job.status = "accepted"
            job.acceptedOn = Date.now()
            console.log(job)
            job.acceptedBy = user.uid
          
            console.log(job)
            firestore.collection('jobs').doc(job.id).set(job)
            .then((res) => {
                console.log(res)
                 dispatch({ type: "AcceptJob", payload: {job} });
                 dispatch({ type: 'clearError'});
             }).catch(err => {
               console.log(err);
               dispatch({ type: 'setError' , 
               payload : {
                    msg : err.message, 
                    status : "error" , 
                    id: err.code
                }
             });
   
        });
       }
       
       else // user is undefined if no user signed in
       dispatch({ type: 'setError' , 
       payload : {
           msg : "", 
           status : "error" , 
           id: 77889}
       });
     
      
};

// quit job
export const quitJob = (job) => async (dispatch,getState) => {
  console.log("quitting------------------job")
  // const state = getState();

   var user = firebase.auth().currentUser;
      if(user){
           
            // job.userid = user.uid
            job.status = "open"
            job.acceptedOn = null
            // console.log(job)
            job.acceptedBy =null
          
            // console.log(job)
            firestore.collection('jobs').doc(job.id).set(job)
            .then((res) => {
                console.log(res)
                 dispatch({ type: "QuitJob", payload: {job} });
                 dispatch({ type: 'clearError'});
             }).catch(err => {
               console.log(err);
               dispatch({ type: 'setError' , 
               payload : {
                    msg : err.message, 
                    status : "error" , 
                    id: err.code
                }
             });
   
        });
       }
       
       else // user is undefined if no user signed in
       dispatch({ type: 'setError' , 
       payload : {
           msg : "", 
           status : "error" , 
           id: 77889}
       });
     
      
};



// done job
export const doneJob = (job) => async (dispatch,getState) => {
  console.log("done------------------job")
  // const state = getState();

   var user = firebase.auth().currentUser;
      if(user){
           
            // job.userid = user.uid
            job.status = "done"
            job.doneAt = Date.now()
            console.log(job)
            job.doneBy = user.uid
          
            console.log(job)
            firestore.collection('jobs').doc(job.id).set(job)
            .then((res) => {
                console.log(res)
                 dispatch({ type: "DoneJob", payload: {job} });
                 dispatch({ type: 'clearError'});
             }).catch(err => {
               console.log(err);
               dispatch({ type: 'setError' , 
               payload : {
                    msg : err.message, 
                    status : "error" , 
                    id: err.code
                }
             });
   
        });
       }
       
       else // user is undefined if no user signed in
       dispatch({ type: 'setError' , 
       payload : {
           msg : "", 
           status : "error" , 
           id: 77889}
       });
     
      
};

// reject job
export const rejectJob = (job) => async (dispatch) => {
  console.log("Rejected------------------job")
  // const state = getState();
  var user = firebase.auth().currentUser;
  if(user){
       
  
        // firestore.collection('Rejectedjobs').doc(user.uid).set(job.id)
        var userRef = firestore.collection("rejectedJobs").doc(user.uid);

// Atomically add a new region to the "regions" array field.
          userRef.update({
              rjobs: firebaser.firestore.FieldValue.arrayUnion(job.id)
          }).then((res) => {
            console.log(res)
             dispatch({ type: "RejectJob", payload: {job} });
             dispatch({ type: 'clearError'});
          }).catch(err => {
           console.log(err);
           dispatch({ type: 'setError' , 
           payload : {
                msg : err.message, 
                status : "error" , 
                id: err.code
            }
            });

          });
   }
   
   else // user is undefined if no user signed in
   dispatch({ type: 'setError' , 
   payload : {
       msg : "", 
       status : "error" , 
       id: 77889}
   });
  
};