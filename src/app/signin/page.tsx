"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const SignInPage = () => {


    const onSubmit = async(e : React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const fromData = new FormData(e.target)
        const user =  Object.fromEntries(fromData.entries()) as {email:string, password:string}

        const {data, error} = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        })
        if(data){
            toast.success("Sign in sucessfully")
            console.log(data)
        }
        if(error){
            toast.error(String(error.message)) 
            console.log(error)
        }
    }

    const handleGoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github",
    })
}

    return (
         <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold text-red-700">সাইন ইন</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">ইমেইল</label>
          <input name="email" type="email" className="input"/>

          <label className="label">পাসওয়ার্ড</label>
          <input name="password" type="password" className="input" />

          <button type='submit' className="btn bg-red-700 text-white mt-4">
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>

    <button onClick={handleGoogleSignIn} className='btn'>Sign in with Google</button>
    <button onClick={handleGithubSignIn} className='btn'>Sign in with Github</button>
    </div>
    );
};

export default SignInPage;