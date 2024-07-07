"use client"
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer]=useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

useEffect(()=>{
  results.map((results)=>(
    setUserAnswer(prevAns=>prevAns+results?.transcript)
  ))
},[results])

const SaveUserAnswer=()=>{
  if(isRecording){
    stopSpeechToText();
    if(userAnswer?.length<10){
    //  toast('error while saving answer please record again');
return ;
    }
  }
  else{
    startSpeechToText();
  }
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
    onClick={SaveUserAnswer}
    >
      
      {isRecording?
      <h2 className='text-red-600 flex gap-2'>
<Mic/>   'Stop Recording'
      </h2>: 'Record Answer'} </Button>
    <Button onClick={()=>console.log(userAnswer)}>show user anser</Button>


    </div>
 
  )
}

export default RecordAnswerSection