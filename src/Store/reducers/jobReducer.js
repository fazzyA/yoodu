
export default (state={
    status : "loading",
    availableJobs : [],
    sheduledJobs: [],
    allJobs : [],
}, action) => {
    switch (action.type) {
            case "CreateJob":
            
                console.log("getting ", action.payload);
                console.log(action.payload);
                return {
                // keep the old state
                ...state,
                // add all the cards from the database
                // they will come in a json format,
                // so we need to convert them to array
                availableJobs: Object.values(action.payload).concat(state.availablejobs),
                status : "created"
                };

             case "UpdateJob":
            
                    console.log("getting ", action.payload);
                    
                    console.log(action.payload);
                    let allJobs = state.allJobs.map((job)=>{
                       if(job.id === action.payload.job.id )
                        job=Object.values(action.payload)
                    })
                    return {
                    // keep the old state
                    ...state,
                     allJobs,
                     status : "created"
                    };
    
            case "deleteJob":
            
                        console.log("deleting' ", action.payload);
                        console.log(action.payload);
                        console.log(action.payload);
                         allJobs = state.allJobs.filter((job)=>job.id !== action.payload.job.id )
                            

                        return {
                        // keep the old state
                        ...state,
                         allJobs,
                         status : "deleted"
                        };

            case "listJobs":
                    // console.log("getting################################# ", action.payload);
                    console.log(action.payload);
                    return {
                    ...state,
                    // availableJobs: action.payload.jobs,
                    status : "loaded",
                    allJobs : action.payload.jobs
                    };
                    
            case "AcceptJob":
            
                        return {
                        // keep the old state
                        ...state,
                        allJobs: Object.values(action.payload).concat(state.allJobs),
                        status : "accepted"
                        };        
                    
            case "RejectJob":
            
                            return {
                            ...state,
                            allJobs: state.allJobs.filter((job)=>job.id !== action.payload.job.id ),
                            status : "rejected"
                            };
                            
            case "DoneJob":
                                return {
                                // keep the old state
                                ...state,
                                allJobs: Object.values(action.payload).concat(state.allJobs),
                                status : "done"
                                };
            case "QuitJob":
                                        return {
                                        // keep the old state
                                        ...state,
                                        allJobs: Object.values(action.payload).concat(state.allJobs),
                                        status : "quit"
                                        };        
            default:
                return state;
    }
  };