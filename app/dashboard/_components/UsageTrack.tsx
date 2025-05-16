"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect , useState} from 'react';
import { eq } from "drizzle-orm"; // ✅ Add this


 function UsageTrack() {

    const{user}= useUser();
    const[totalUsage,setTotalUsage]=useState<number>(0);
     
     useEffect(()=>{
        user&&GetData();
     },[user])

     const GetData=async()=>{
        {/*@ts-ignore*/}
        const result:History[]= await db.select().from(AIOutput)
    .where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress));
          
    GetTotalUsage(result)
}

    const GetTotalUsage=(result:History[])=>{
        let total:number=0;
        result.forEach(element => {
            total=total+Number(element.aiResponse?.length)
        });

        setTotalUsage(total)
        console.log(total);
    }


    return (
        <div className='m-5'>
            <div className='bg-purple-500 text-white 
         p-3 rounded-lg'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                    <div className='h-2 bg-white rounded-full'
                        style={
                            {
                                width: (totalUsage/10000)*100+"%"
                            }
                        }>
                    </div>
                </div>
                <h2 className='text-sm my-1'>{totalUsage}350/10000 Credits Used</h2>
            </div>
            <Button variant={'secondary'} className=' text-purple-500 w-full my-3'>Upgrade</Button>
        </div>
    )
}

export default UsageTrack
