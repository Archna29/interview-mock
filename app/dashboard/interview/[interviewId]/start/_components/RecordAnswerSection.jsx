"use client"
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection( {mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer, setUserAnswer]=useState('');
  const{user}=useUser();
  const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

useEffect(()=>{
  results.map((results)=>(
    setUserAnswer(prevAns=>prevAns+results?.transcript)
  ))
},[results])

useEffect(()=>{
if(!isRecording&&userAnswer.length>10){
UpdateUserAnswer();
}
},[userAnswer])

const StartStopRecording=async()=>{
  if(isRecording){
    stopSpeechToText();
}
  else{
    startSpeechToText();
  }
}

const UpdateUserAnswer=async()=>{
  console.log(userAnswer);
  setLoading(true);
  const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Depend on question and user answer for given interview question. Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines.`;
    const result=await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp =(result.response.text()).replace('```json', '').replace('```', '');
    
console.log(mockJsonResp);
const JsonFeedbackResp=JSON.parse(mockJsonResp);
 const resp=await db.insert(UserAnswer)
.values({
  mockIdRef:interviewData?.mockId,
  question:mockInterviewQuestion[activeQuestionIndex]?.question,
  correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
  userAns:userAnswer,
  feedback:JsonFeedbackResp?.feedback,
  rating:JsonFeedbackResp?.rating,
  userEmail:user?.primaryEmailAddress?.emailAddress,
  createdAt:moment().format('DD-MM-yyyy')
})
if(resp){
  toast('user answer recorded successfully');
  setUserAnswer('')
  setResults([])
}
setUserAnswer('')
setLoading(false);
setResults([])
}
  return (
    <div className='flex justify-center items-center flex-col'>
   <div className='flex flex-col mt-20 justify-center items-center  bg-black rounded-lg  p-5'>
    <Image src={'/webcam.png'} width={200} height={200} className='absolute '/>    
         <Webcam
           mirrored={true}
         style={{
            height:300,
            width:'100%',
            zIndex:10,     
         }}
         /> 
    </div>
    <Button variant="outline" className="my-10"
    disable={loading}
    onClick={StartStopRecording}
    > 
      {isRecording?
      <h2 className='text-red-600 flex gap-2'>
<Mic/>   'Stop Recording'
      </h2>: 'Record Answer'} </Button>
    </div>
 
  )
}

export default RecordAnswerSection;