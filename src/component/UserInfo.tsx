"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-center gap-2">
          <Link href={"/profile"}>
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="User avatar"
                src={user?.image || "/default-avatar.png"}
              />
            </div>
          </div>
          </Link>

          <h2>{user?.name}</h2>

          <button onClick={handleSignout} className="btn btn-error btn-xs">
            Signout
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-end gap-2">
          <Link href={"/signin"}>
            <button className="btn btn-ghost text-neutral-700 hover:text-red-700">
              সাইন ইন
            </button>
          </Link>

          <Link href={"/signup"}>
            <button className="btn bg-red-700 text-white">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
