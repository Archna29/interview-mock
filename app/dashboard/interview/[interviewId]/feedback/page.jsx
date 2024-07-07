"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
const[feedbackList,setFeedbackList]=useState([]);
const router=useRouter();
  useEffect(()=>{
    GetFeedback();
  },[])
  const GetFeedback=async()=>{
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className='p-10 font-bold'>
      <h2 className='text-3xl  text-green-700 '>
   Congratulations on Completing the test
      </h2>
      <h2 className=' text-2xl '>Here is your Interview Feedback </h2>
      <h2 className='text-indigo-800 text-lg my-3'>Your Overall Rating </h2>
      <h2 className='text-sm text-gray-700 mb-3'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
   
    {feedbackList&& feedbackList.map((item,index)=>(

<Collapsible key={index} className='pt-2 mt-7'>
  <CollapsibleTrigger className='p-3 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
  {item.question}
  <ChevronsUpDown className='mx-2'/>
  </CollapsibleTrigger>
  <CollapsibleContent>
  <div className='flex flex-col gap-5'>
  <h2 className='text-yellow-500 p-2 border rounded -lg '><strong>Rating : {item.rating}</strong></h2>
  <h2 className='p-3 border rounded-lg bg-red-100 text-sm text-red-700'><strong>Your Answer: {item.userAns}</strong></h2>
  <h2 className='p-3 border rounded-lg bg-green-100 text-sm text-green-700'><strong>Correct Answer: {item.correctAns}</strong></h2>
  <h2 className='p-3 border rounded-lg bg-blue-100 text-sm text-blue-700'><strong>Feedback: {item.feedback}</strong></h2>

  </div>


  </CollapsibleContent>
</Collapsible>


    ))}

    <Button className='my-5 bg-indigo-600 text-lg border rounded-lg ' onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback