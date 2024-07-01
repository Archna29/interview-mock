"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
  
function AddNewInterview() {
    const [open,setOpen]=useState(false);
    const[jobPosition,setJobPosition]=useState("");
    const[jobDesc,setJobDesc]=useState("");
    const[experience,setExperience]=useState("");
    const onSubmit=(e)=>{
e.preventDefault();
console.log(jobPosition,jobDesc,experience);
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-neutral-100 hover: scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=> setOpen(true)}>
            <h3 className=' text-lg text-center ' >
               + Add New
            </h3>
        </div>
        <Dialog  open={open}>
          
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className='font-bold text-2xl text-neutral-900'>Tell us more about the job you are interviewing for</DialogTitle>
      <DialogDescription>
      <form onSubmit={onSubmit}>
       <div>
        <h5 className=' font-bold text-gray-500'>Add Details about job position, Your skills and years of experience</h5>
<div className='my-5'>
    <label className='font-bold text-gray-500' >Job Position/Role name</label>
    <Input className="my-3" placeholder="Ex: Software Engineer"  required
     onChange={(event)=>setJobPosition(event.target.value)}/>
</div>
<div className='my-5'>
    <label className='font-bold text-gray-500'>Job Description</label>
    <Textarea className="my-3" placeholder="Ex: Java, C++, OOPS" 
    onChange={(event)=>setJobDesc(event.target.value)} 
    required/>
</div>
<div className='my-5'>
    <label className='font-bold text-gray-500'>Years of Experience</label>
    <Input className="my-3"  type="number"  max="20"
     onChange={(event)=>setExperience(event.target.value)} placeholder= " Ex: 1"/>
</div>
       </div>
        <div className='m-5 flex gap-5 justify-end '>
        <Button type="button" variant="ghost" onClick={()=>setOpen(false)}>Cancel</Button>
        <Button  type="submit"className="bg-indigo-700"> Start Interview</Button>
        </div>
  
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>

</Dialog>

    </div>
  )
}

export default AddNewInterview