import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestion,activeQuestionIndex}) {
  return mockInterviewQuestion&&(
    <div className='p-7 border rounded-lg my-10'>
<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
{mockInterviewQuestion&&mockInterviewQuestion.map((question, index) => (
     <h2 className={`p-1 bg-gray-600 text-white rounded-full text-xs  md:text-sm text-center 
     cursor-pointer font-bold
    ${activeQuestionIndex==index&& 'bg-indigo-600'} `}
 >#Question{index + 1}</h2>
))}
</div>
<h2 className='mt-5 text-sm md:text-lg text-neutral-700'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
<div className='border rounded-lg p-3  bg-blue-100 my-20 '>
  <h2 className='flex gap-2 items-center text-blue-700'>
<Lightbulb/>
    <strong>Note:</strong>
  </h2>
  <h2 className='mt-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
  </div>    
   </div>


  )
}

export default QuestionSection