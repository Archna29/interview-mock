// import { Button } from "@/components/ui/button"
// export default function Home() {
//   return (
    
//         <div>

// </div>

//   );
// }
// Home.js
"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home(){
  const router=useRouter();
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-5">INTERVIEW MOCK</h1> 
          <h2 className="text-3xl font-bold mb-5">     Prepare for Your Interview</h2>
     
          <p className="text-xl text-gray-700 mb-8">Practice mock interviews and improve your skills.</p>
          <Button className='bg-blue-600 w-3/12 text-xl p-3 m-3 border rounded-full hover:bg-indigo-800  '
         onClick={()=>router.push('/dashboard')}
          >Get Started</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-5 mb-10">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Mock Interviews</div>
                <p className="text-gray-700 text-base">
                  Practice with industry professionals to simulate real interview experiences.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-5 mb-10">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Feedback</div>
                <p className="text-gray-700 text-base">
                  Receive detailed feedback to improve your interview skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-500 py-20 text-center text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-5">Ready to Improve Your Interview Skills?</h2>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-5">
        <p>&copy; 2024 Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  );
};


