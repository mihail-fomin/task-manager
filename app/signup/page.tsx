'use client'
import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function page() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp />
    </div>
  );
}
