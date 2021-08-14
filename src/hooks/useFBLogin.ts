import { auth } from "../utils/fbInit";
import { useState } from "react";

type useFBLoginError = {
  email?: string;
  password?: string;
  other?: string;
};

type useFBLoginReturn = {
  loading: boolean;
  error: useFBLoginError;
};

// const useFBLogin=async(email:string,password:string):useFBLoginReturn=>{
// const [loading,setLoading]=useState(false)
// const [error,setError]=useState({} as useFBLoginError)
// try
// {const result = await auth.signInWithEmailAndPassword(email,password)
//     return {loading,error}
// }catch(err){

// }

// }
