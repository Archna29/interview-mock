"use client" 
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";

function Interview({params}) {
  const[interviewData,setInterviewData]=useState();
  const[webCam,showWebCam]=useState(false);
  useEffect(()=>{
    console.log(params.interviewId)
    GetInterviewDetails();
  },[])

  const GetInterviewDetails=async()=>{
     const result=await db.select().from(MockInterview)
     .where(eq(MockInterview.mockId ,params.interviewId));
   console.log(result);
   setInterviewData(result[0]);
   }
  return (
    <div className='my-10 '>
    <h2 className='font-bold text-2xl justify-center flex flex-col items-center'>Let's Start Your Interview Here!!</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
    <div className='flex flex-col my-10 gap-5'>
    <div className='flex flex-col my-5 p-5 rounded-lg border gap-5'>

    {interviewData ? (
              <>
                <h2 className="text-lg text-gray-800"><strong>Job Position: </strong> {interviewData.jobPosition}</h2>
                <h2 className="text-lg text-gray-800"><strong>Job Description:</strong> {interviewData.jobDesc}</h2>
                <h2 className="text-lg text-gray-800"><strong>Year of Experience: </strong> {interviewData.jobExperience}</h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
</div> 

    </div>
    <div className='mt-5'>
    {webCam? <Webcam 
    onUserMedia={()=>showWebCam(true)}
    onUserMediaError={()=>showWebCam(false)}
    style={
      {
        height: 300,
        width:300
      }
    }
    />:
    <>
          <WebcamIcon className='w-full h-72 p-24 my-7 bg-secondary rounded-lg border'  />
          <Button variant="ghost" className=" ms-20 w-72 mb-5 text-lg "   onClick={()=>showWebCam(true)}>Enable webcam and mic</Button>
    </>
}
    </div>

    </div>
    <div className=' flex  justify-end items-end'>
      <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
      <Button className="bg-indigo-800 text-white my-3" >Start Interview</Button>

      </Link>

    </div>

   </div>
  )
}

export default Interview;