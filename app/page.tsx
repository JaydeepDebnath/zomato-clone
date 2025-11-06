'use client';

import React from 'react';
import './globals.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Card from '../components/Card/Card';
import Collection from '../components/Collections/Collection';
import Cities from '../components/Cities/Cities';
import CTA from '../components/CTA/CTA';
import AccContainer from '../components/AccContainer/AccContainer';
import SignInForm from '../components/SignInForm/SignInForm';
import SignOutButton from '../components/SignOutButton/SignOutButton';

export default function Page() {
  return (
    <>
      {/* Header */}
      <Header />

      <main className="main-content">
        {/*  Authentication Section */}
        <section className="auth-section" style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h2>Account Access</h2>
          <div className="auth-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <SignInForm />
            <SignOutButton />
          </div>
        </section>

        {/*  Main App Sections */}
        <section className="content-section">
          <Card />
          <Collection />
          <Cities />
          <CTA />
          <AccContainer />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
