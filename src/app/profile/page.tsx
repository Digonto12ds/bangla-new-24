"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';

const ProfilePage = () => {
      const { data: session } = authClient.useSession();
      const user = session?.user;
      console.log(user);

    return (
        <div>
            ProfilePage
        </div>
    );
};

export default ProfilePage;