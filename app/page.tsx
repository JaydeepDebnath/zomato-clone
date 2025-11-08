'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.scss';
import Card from '../components/Card/Card';
import Collection from '../components/Collections/Collection';
import Cities from '../components/Cities/Cities';
import CTA from '../components/CTA/CTA';
import AccContainer from '../components/AccContainer/AccContainer';
import SignInForm from '../components/SignInForm/SignInForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import SignOutButton from '../components/SignOutButton/SignOutButton';

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '4rem' }}>Loading...</p>;
  }

  return (
    <main className="main-content">
      <section
        className="auth-section"
        style={{
          textAlign: 'center',
          margin: '2rem 0',
          padding: '2rem 1rem',
          background: '#f9fafb',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Account Access</h2>

        {isAuthenticated ? (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '1rem', color: '#059669' }}>You’re signed in!</p>
            <SignOutButton />
          </div>
        ) : (
          <>
            <div style={{ marginTop: '2rem' }}>
              {showSignUp ? <SignUpForm /> : <SignInForm />}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              {showSignUp ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setShowSignUp(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Not a user yet?{' '}
                  <button
                    onClick={() => setShowSignUp(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Register
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <section className="content-section">
        <Card />
        <Collection />
        <Cities />
        <CTA />
        <AccContainer />
      </section>
    </main>
  );
}
