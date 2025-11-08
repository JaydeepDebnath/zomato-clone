'use client';

import React from 'react';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import Link from 'next/link';
import '@/app/(styles)/authPages.scss';

export default function SignupPage() {
  return (
    <div className="authPageContainer">
      <h1>Create Your Account</h1>
      <SignUpForm />
      <p className="authSwitchText">
        Already have an account?{" "}
        <Link href="/signin" className="authSwitchLink">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
