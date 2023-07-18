'use client'

import { useEffect, useState } from 'react';
import SelectMenuCustom from '../../../../components/selectMenuCustom'
import SelectMenu from "../../../../components/selectMenu";
import InputField from "../../../../components/inputField";
import GetOptions from '@/app/actions/getOptions'
import { XCircleIcon } from '@heroicons/react/20/solid'

export const CreateListing = () => {

    const options = GetOptions()

    const carMakesData = options.carMakes
    const carModelsData = options.carModels
    const transmissionData = options.transmissionType
    const fuelData = options.fuelType
    const yearsData = options.yearsMap

    const carModelId = carModelsData[0].id

    const [selectedMakeId, setSelectedMakeId] = useState(carMakesData[0].id || '');
    const [selectedTransmission, setSelectedTransmission] = useState(transmissionData[0].id || '');
    const [selectedFuel, setSelectedFuel] = useState(fuelData[0].id || '');
    const [selectedYear, setSelectedYear] = useState(yearsData[0].id || '');
    const [selectedModel, setSelectedModel] = useState();

    const [filteredCarModels, setFilteredCarModels] = useState();
  
    const handleMakeChange = (value: string) => {
      const makeId = value;
      setSelectedMakeId(makeId);
      const filteredModels = carModelsData.filter((model) => model.make === makeId);
      setFilteredCarModels(filteredModels as any);
      console.log('make', value)
    };
    
    const handleModelChange = (value: any) => {
      setSelectedModel(value)
      console.log('model', value)
    }
    const handleTransmissionChange = (value: any) => {
      setSelectedTransmission(value)
      console.log('trans', value)
    }
    const handleFuelChange = (value: any) => {
      setSelectedFuel(value)
      console.log('fuel', value)
    }
    const handleYearChange = (value: any) => {
      setSelectedYear(value)
      console.log('year', value)
    }

    return (
<div className="flex justify-center mx-auto max-w-4xl mt-20">
  <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
        <SelectMenuCustom
          options={carMakesData}
          value={selectedMakeId}
          onChange={handleMakeChange}
        />
        <SelectMenuCustom
          options={filteredCarModels || []}
          value={selectedModel || ''}
          onChange={handleModelChange}
        />
        <SelectMenuCustom
          options={transmissionData}
          value={selectedTransmission}
          onChange={handleTransmissionChange}
        />
        <SelectMenuCustom
          options={fuelData}
          value={selectedFuel}
          onChange={handleFuelChange}
        />
        <SelectMenuCustom
          options={yearsData}
          value={selectedYear}
          onChange={handleYearChange}
        />
        <InputField label='Price' value='Price' placeholder='Price..'/>
      </div>
      </div>
    )};
      
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


export default CreateListing