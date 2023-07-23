'use client'

import { useCallback, useEffect, useState } from 'react';
import SelectMenuCustom from '../../../../components/selectMenuCustom'
import SelectMenu from "../../../../components/selectMenu";
import InputField from "../../../../components/inputField";
import GetOptions from '@/app/actions/getOptions'
import { XCircleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';

export const CreateListing = () => {

    const options = GetOptions()

    const carMakesData = options.carMakes
    const carModelsData = options.carModels
    const transmissionData = options.transmissionType
    const fuelData = options.fuelType
    const yearsData = options.yearsMap
    const categoryData = options.categoryType
    const numDoorsData = options.numDoors
    const conditionData = options.condition
    const colorsData = options.colors

    const carModelId = carModelsData[0].id

    const modelPlaceholder = [
      { label: 'Model..', id: '0'}
    ]

    const [make, setMake] = useState(carMakesData[0].id || '');
    const [model, setModel] = useState(carModelsData[0].id || '');
    const [transmission, setTransmission] = useState(transmissionData[0].id || '');
    const [fuel, setFuel] = useState(fuelData[0].id || '');
    const [year, setYear] = useState(yearsData[0].id || '');
    const [coupe_type, setCoupe_type] = useState(categoryData[0].id || '');
    const [number_doors, setNumber_doors] = useState(numDoorsData[0].id || '');
    const [condition, setCondition] = useState(conditionData[0].id || '');
    const [color, setColor] = useState(colorsData[0].id || '');
    const [mileage, setMileage] = useState('');
    const [power, setPower] = useState('');
    const [price, setPrice] = useState('');
    const [variant, setVariant] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);

    const [filteredCarModels, setFilteredCarModels] = useState();
  
    const handleMakeChange = (value: string) => {
      const makeId = value;
      setMake(makeId);
      const filteredModels = carModelsData.filter((model) => model.make === makeId);
      setFilteredCarModels(filteredModels as any);
      console.log('make', value)
    };
    
    const handleModelChange = (value: string) => {
      setModel(value)
      console.log('model', value)
    }

    const handleTransmissionChange = (value: string) => {
      if (value == "Transmission.."){
        return null
      }
      setTransmission(value)
      console.log('trans', value)
    }

    const handleFuelChange = (value: string) => {
      if (value == "Fuel.."){
        return null
      } 
      setFuel(value)
      console.log('fuel', value)
    }

    const handleYearChange = (value: string) => {
      if (value == "Year.."){
        return null
      } 
      setYear(value)
      console.log('year', value)
    }

    const handleCategoryChange = (value: string) => {
      if (value == "Category.."){
        return null
      }
      setCoupe_type(value)
      console.log('category', value)
    }

    const handleDoorsChange = (value: string) => {
      if (value == "Number of doors.."){
        return null
      }
      setNumber_doors(value)
      console.log('doors', value)
    }

    const handleConditionChange = (value: string) => {
      if (value == "Condition.."){
        return null
      }
      setCondition(value)
      console.log('condition', value)
    }

    const handleColorChange = (value: string) => {
      if (value == "Color.."){
        return null
      }
      setColor(value)
      console.log('color', value)
    }

    const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMileage(event.target.value)
      console.log('miles', mileage)
    }

    const handlePowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPower(event.target.value)
      console.log('power', power)
    }
    
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(event.target.value)
      console.log('price', price)
    }

    const handleVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setVariant(event.target.value)
      console.log('variant', variant)
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
      console.log('title', title)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value)
      console.log('desc', event.target.value)
    }

    const handleUpload = (result: string) => {
      const check = photos.includes(result)
      if (check) {
        const id = photos.indexOf(result)
          let newArr = photos
          newArr.splice(id, 1)
            setPhotos([...newArr])
      } else {
        photos.push(result)
        setPhotos([...photos])
      }
    }
  

    const handleSubmit = useCallback(async () => {
      console.log(photos)
      try {
       await axios.post('/api/listings', {
        title: `${title}`,
        body: `${description}`,
        make: `${make}`,
        model: `${model}`,
        year: `${year}`,
        coupe_type: `${coupe_type}`,
        number_doors: `${number_doors}`,
        condition: `${condition}`,
        price: `${price}`,
        fuel: `${fuel}`,
        transmission: `${transmission}`,
        mileage: `${mileage}`,
        power: `${power}`,
        slug: '',
        variant: `${variant}`,
        color: `${color}`,
        description: '',
        photos: photos,
       })
      } catch (error: any) {
        console.log(error)
      }
      }, [title, description, make, model,
        year, coupe_type, number_doors, condition,
        price, fuel, transmission, mileage, power,
        color, photos])

    return (
  <div className="flex justify-center mx-auto max-w-4xl mt-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <SelectMenuCustom
          options={carMakesData}
          value={make}
          onChange={handleMakeChange}
        />
        <SelectMenuCustom
          options={filteredCarModels || []}
          value={model || ''}
          onChange={handleModelChange}
        />
                <InputField label='Variant' value={variant} placeholder='Variant..(M3, GTI)' onChange={handleVariantChange}/>
        <SelectMenuCustom
          options={transmissionData}
          value={transmission}
          onChange={handleTransmissionChange}
        />
        <SelectMenuCustom
          options={fuelData}
          value={fuel}
          onChange={handleFuelChange}
        />
        <SelectMenuCustom
          options={yearsData}
          value={year}
          onChange={handleYearChange}
        />
        <SelectMenuCustom
          options={categoryData}
          value={coupe_type}
          onChange={handleCategoryChange}
        />
        <SelectMenuCustom
          options={numDoorsData}
          value={number_doors}
          onChange={handleDoorsChange}
        />
        <SelectMenuCustom
          options={conditionData}
          value={condition}
          onChange={handleConditionChange}
        />
        <SelectMenuCustom
          options={colorsData}
          value={color}
          onChange={handleColorChange}
        />
        <InputField label='Mileage' value={mileage} placeholder='Mileage..' onChange={handleMileageChange}/>
        <InputField label='Power' value={power} placeholder='Power..' onChange={handlePowerChange}/>
        <InputField label='Price' value={price} placeholder='Price..' onChange={handlePriceChange}/>
        <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-8">
  <InputField label='Title' value={title} placeholder='Listing title..' onChange={handleTitleChange} />
  <InputField label='Description' value={description} placeholder='Description..' onChange={handleDescriptionChange} makeBigger />
  <div className="w-full">
    <CldUploadButton
      options={{ maxFiles: 6 }}
      onUpload={handleUpload}
      uploadPreset="yghyzh2p"
    >
      <button
        type="button" 
        className=" text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <ArrowUpOnSquareIcon className="h-8 w-8 mr-2 mb-1" aria-hidden="true" />
        Upload
      </button>
    </CldUploadButton>
  </div>
  <button
    onClick={handleSubmit}
    type="button" 
    className="w-full text-white flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>
</div>
            {/* <button onClick={handleSubmit}>Submit</button> */}
        </div>
      </div>
    )};

export default CreateListing