'use client';

import React from 'react';
import SignInForm from '@/components/SignInForm/SignInForm';
import Link from 'next/link';
import '@/app/(styles)/authPages.scss';

export default function LoginPage() {
  return (
    <div className="authPageContainer">
      <h1>Welcome Back</h1>
      <SignInForm />
      <p className="authSwitchText">
        Not a user yet?{" "}
        <Link href="/signup" className="authSwitchLink">
          Register here
        </Link>
      </p>
    </div>
  );
}
