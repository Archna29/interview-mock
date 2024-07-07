"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircleIcon } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';

import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [open, setOpen] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `job position: ${jobPosition} job description: ${jobDesc} job experience: ${jobExperience} give me 5 interview questions and answers in json format, give question and answer as field in json`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const rawResponse = await result.response.text();
            const MockJsonResp = rawResponse.replace('```json', '').replace('```', '');
            console.log("Raw JSON Response:", MockJsonResp);

            let parsedJson;
            try {
                parsedJson = JSON.parse(MockJsonResp);
                console.log(parsedJson);
                setJsonResponse(parsedJson);
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                setLoading(false);
                return;
            }

            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResp,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy'),
            }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID: ", resp);

            if (resp) {
                setOpen(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId);
            } else {
                console.log("Error inserting data");
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }

        setLoading(false);
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-neutral-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpen(true)}>
                <h3 className='text-lg text-center'>+ Add New</h3>
            </div>
            <Dialog open={open}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl text-neutral-900'>
                            Tell us more about the job you are interviewing for
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h5 className='font-bold text-gray-500'>
                                        Add Details about job position, Your skills and years of experience
                                    </h5>
                                    <div className='my-5'>
                                        <label className='font-bold text-gray-500'>Job Position/Role name</label>
                                        <Input
                                            className="my-3"
                                            placeholder="Ex: Software Engineer"
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-5'>
                                        <label className='font-bold text-gray-500'>Job Description</label>
                                        <Textarea
                                            className="my-3"
                                            placeholder="Ex: Java, C++, OOPS"
                                            onChange={(event) => setJobDesc(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='my-5'>
                                        <label className='font-bold text-gray-500'>Years of Experience</label>
                                        <Input
                                            className="my-3"
                                            type="number"
                                            max="20"
                                            onChange={(event) => setJobExperience(event.target.value)}
                                            placeholder="Ex: 1"
                                        />
                                    </div>
                                </div>
                                <div className='m-5 flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-indigo-700" disabled={loading}>
                                        {loading ? <>
                                            <LoaderCircleIcon className='animate-spin' />
                                            "Generating Question"
                                        </> : "Start Interview"}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
