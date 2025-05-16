"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateList from './_components/TemplateList'
function Dashboard(){
     const [userSearchInput, setUserSearchInput]= useState<string>()
    return(
        <div>
           {/*Search Section*/} 
           <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>


           {/*TemplateList Section*/}
           <TemplateList userSearchInput={userSearchInput}/>
        </div>
    )
}

export default Dashboard