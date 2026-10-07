"use client"
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = () => {

    const onSubmit =async(e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as {name:string, email:string, image: string, password:string}

        const {data,error} = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if(data){
            redirect("/")
            console.log(data)
        }
        if(error){
            console.log(error)
        }

    }

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold text-red-700">সাইন আপ</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input name="name" type="text" className="input" />

          <label className="label">Image</label>
          <input name="image" type="url" className="input"/>

          <label className="label">ইমেইল</label>
          <input name="email" type="email" className="input"  />

          <label className="label">পাসওয়ার্ড</label>
          <input name="password" type="password" className="input" />

          <button type="submit" className="btn bg-red-700 text-white mt-4">
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
