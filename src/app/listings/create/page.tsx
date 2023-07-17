'use client'

import { XCircleIcon } from '@heroicons/react/20/solid'
import SelectMenuCustom from '../../../../components/selectMenuCustom'
import GetOptions from '@/app/actions/getOptions'
import { useState } from 'react';

export const CreateListing = () => {

    const options = GetOptions()

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [fuel, setFuel] = useState('');
    const [transmission, setTransmission] = useState('');
    const [price, setPrice] = useState('');

    const handleMakeChange = (value: string) => {
        setMake(value);
      };    
    const handleModelChange = (value: string) => {
        setModel(value);
        console.log(model)
      };    

    return (
        <div>
            <SelectMenuCustom options={options.makeOptions} field="make" value={make} onChange={handleMakeChange}/>
            <SelectMenuCustom options={options.modelOptions} field="model" value={model} onChange={handleModelChange}/>
        </div>
    )

    // return (
    //       <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    //       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
    //       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //         <div className="space-y-6">
    //         <div>
    //             <div className="flex items-center justify-between">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
    //             </div>
    //               <div className="mt-2">
    //               <div>
    //               <input
    //                 required
    //                 className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
    //                 />
    //                 </div>
    //               </div>
    //           </div>
    //           <div>
    //             <div className="flex items-center justify-between">
    //               <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
    //             </div>
    //             <div className="mt-2">
    //               <div>
    //                 <input
    //                 //   onChange={(e) => (e.target.value)}
    //                   required
    //                   className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
    //                   />
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    //               Log in
    //             </button>
    //           </div>
    //         </div>
    //         </div>
    //       </div>
    //         )
}

export default CreateListing