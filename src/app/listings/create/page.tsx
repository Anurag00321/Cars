'use client'

import { useCallback, useEffect, useState } from 'react';
import SelectMenuCustom from '../../../../components/selectMenuCustom'
import SelectMenu from "../../../../components/selectMenu";
import InputField from "../../../../components/inputField";
import GetOptions from '@/app/actions/getOptions'
import { XCircleIcon, ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';
import { Listing } from '@prisma/client';

interface ListingCreateProps {
    options: Listing[]
}

interface OptionsProps {
  label: string;
  id: string
}

interface Option {
  id?: string;
  label: string
  models?: string[];
  make?: string;
}

export const ListingCreate = () => {

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

    // test bez id-tata w state 

    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuel, setFuel] = useState('');
    const [year, setYear] = useState('');
    const [coupe_type, setCoupe_type] = useState('');
    const [number_doors, setNumber_doors] = useState('');
    const [condition, setCondition] = useState('');
    const [color, setColor] = useState('');

    // const [make, setMake] = useState(carMakesData[0].id || '');
    // const [model, setModel] = useState(carModelsData[0].id || '');
    // const [transmission, setTransmission] = useState(transmissionData[0].id || '');
    // const [fuel, setFuel] = useState(fuelData[0].id || '');
    // const [year, setYear] = useState(yearsData[0].id || '');
    // const [coupe_type, setCoupe_type] = useState(categoryData[0].id || '');
    // const [number_doors, setNumber_doors] = useState(numDoorsData[0].id || '');
    // const [condition, setCondition] = useState(conditionData[0].id || '');
    // const [color, setColor] = useState(colorsData[0].id || '');

    const [mileage, setMileage] = useState('');
    const [power, setPower] = useState('');
    const [price, setPrice] = useState('');
    const [variant, setVariant] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);

    const [filteredCarModels, setFilteredCarModels] = useState<Option[]>([carModelsData[0]]);

    const [inputFieldsError, setInputFieldsError] = useState("")
    const [selectMenusError, setSelectMenusError] = useState("")
    const [titleDescriptionError, setTitleDescriptionError] = useState("")

    const [isLoading, setIsLoading] = useState(false)
  
    const handleMakeChange = (value: string) => {
      if(value == "Make..") {
        setMake(carMakesData[0].id)
        setFilteredCarModels([carModelsData[0]])
      } else {
      setMake(value);
      const filteredModels = carModelsData.filter((model) => model.make === make);
      setFilteredCarModels(filteredModels as any);
      }
    };
    
    const handleModelChange = (value: string) => {
      setModel(value)
      console.log('model', value)
    }

    const handleTransmissionChange = (value: string) => {
      if (value == "Transmission.."){
        setTransmission(transmissionData[0].id)
      } else {
      setTransmission(value)
      console.log('trans', value)
      }
    }

    const handleFuelChange = (value: string) => {
      if (value == "Fuel.."){
        setFuel(fuelData[0].id)
      } else {
      setFuel(value)
      console.log('fuel', value)
      }
    }

    const handleYearChange = (value: string) => {
      if (value == "Year.."){
        setYear(yearsData[0].id)
      } else {
      setYear(value)
      console.log('year', value)
      }
    }

    const handleCategoryChange = (value: string) => {
      if (value == "Category.."){
        setCoupe_type(categoryData[0].id)
      } else {
      setCoupe_type(value)
      console.log('category', value)
      }
    }

    const handleDoorsChange = (value: string) => {
      if (value == "Number of doors.."){
        setNumber_doors(numDoorsData[0].id)
      } else {
      setNumber_doors(value)
      console.log('doors', value)
      }
    }

    const handleConditionChange = (value: string) => {
      if (value == "Condition.."){
        setCondition(conditionData[0].id)
      } else {
      setCondition(value)
      console.log('condition', value)
      }
    }

    const handleColorChange = (value: string) => {
      if (value == "Color.."){
        setColor(colorsData[0].id)
      } else {
      setColor(value)
      console.log('color', value)
      }
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
    
    const resetState = () => {
      setInputFieldsError("");
      setSelectMenusError("");
      setTitleDescriptionError("");
    };

    // const handleSubmit = useCallback (async() => {
    //   setIsLoading(true)
    //   resetState();
    //   await axios.post('/api/listings', {
    //         title: `${title}`,
    //         body: `${description}`,
    //         make: `${make}`,
    //         model: `${model}`,
    //         year: `${year}`,
    //         coupe_type: `${coupe_type}`,
    //         number_doors: `${number_doors}`,
    //         condition: `${condition}`,
    //         price: `${price}`,
    //         fuel: `${fuel}`,
    //         transmission: `${transmission}`,
    //         mileage: `${mileage}`,
    //         power: `${power}`,
    //         slug: '',
    //         variant: `${variant}`,
    //         color: `${color}`,
    //         description: '',
    //         photos: photos,          
    //       }).then((response) => {
    //         console.log('response',response.data)
    //         // if (callback.data.error) {
    //         //   if(callback.data.error.includes('title')) {
    //         //     setTitleError(callback.data.error)
    //         //   }
    //         // }
    //         if (response?.data.ok) {
    //           console.log('created:', response?.data.ok)
    //         }
    //       // }).catch((error) => {
    //       //   console.log('error console.log', error)
    //       })
    //       .finally(() => setIsLoading(false))    
    //     }, [title, description, make, model,
    //   year, coupe_type, number_doors, condition,
    //   price, fuel, transmission, mileage, power,
    //   color, photos])

    const handleSubmit = useCallback (async() => {
        console.log('make',make)
        setIsLoading(true)
        resetState();
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
            }).then((callback) => {
              console.log(callback)
                if(callback.data.ok) {
                    console.log('created', callback?.data.ok)
                }
                else if (callback.data.message) {
                  console.log('callback.data.message:', callback.data.message)
                }
            }).catch((callback) => {
                const { data } = callback.response.data
                // resetState();
                console.log(callback)
                setInputFieldsError(data.inputField)
                setSelectMenusError(data.selectMenu)
                setTitleDescriptionError(data.titleDescription)
            })
            .finally(() => setIsLoading(false))    
          }, [title, description, make, model,
        year, coupe_type, number_doors, condition,
        price, fuel, transmission, mileage, power,
        color, photos])

    // const handleSubmit = useCallback(async () => {
    //   console.log(photos)
    //   try {
    //    await axios.post('/api/listings', {
    //     title: `${title}`,
    //     body: `${description}`,
    //     make: `${make}`,
    //     model: `${model}`,
    //     year: `${year}`,
    //     coupe_type: `${coupe_type}`,
    //     number_doors: `${number_doors}`,
    //     condition: `${condition}`,
    //     price: `${price}`,
    //     fuel: `${fuel}`,
    //     transmission: `${transmission}`,
    //     mileage: `${mileage}`,
    //     power: `${power}`,
    //     slug: '',
    //     variant: `${variant}`,
    //     color: `${color}`,
    //     description: '',
    //     photos: photos,
    //    })
    //   } catch (error: any) {
    //     console.log(error.response.data)
    //     if(error.message.includes('sign in')) {
    //       setUserError(error.message)
    //     }
    //     if(error.message.includes('title')) {
    //       setTitleError(error.message)
    //     }
    //     if(error.message.includes('description')) {
    //       setDescriptionError(error.message)
    //     }
    //     if(error.message.includes('fields')) {
    //       setSelectMenuError(error.message)
    //     }
    //     if(error.message.includes('mileage')) {
    //       setMileageError(error.message)
    //     }
    //     if(error.message.includes('power')) {
    //       setPowerError(error.message)
    //     }
    //     if(error.message.includes('price')) {
    //       setPriceError(error.message)
    //     }
    //   }
    //   }, [title, description, make, model,
    //     year, coupe_type, number_doors, condition,
    //     price, fuel, transmission, mileage, power,
    //     color, photos])

    const isValidOption = (selectedValue: string, options: OptionsProps[], targetId: string) => {
      return options.find(option => option.id === selectedValue)?.id === targetId || '';
    };
    
    return (
      <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-16">
      {(selectMenusError || inputFieldsError || titleDescriptionError
        ) && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc pl-5 space-y-1">
                  {selectMenusError && <li>{selectMenusError}</li>}
                  {titleDescriptionError && <li>{titleDescriptionError}</li>}
                  {inputFieldsError && <li>{inputFieldsError}</li>}
                </ul> 
              </div>
            </div>
          </div>
          </div>
        )}
    </div>
  <div className="flex justify-center mx-auto max-w-4xl mt-20 mb-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <SelectMenuCustom
          options={carMakesData}
          value={make}
          onChange={handleMakeChange}
          error={(make === '0' || make === '') ? !!selectMenusError : false}
          />
        <SelectMenuCustom
          options={filteredCarModels}
          value={model}
          onChange={handleModelChange}
          error={(model === '0' || model === '') ? !!selectMenusError : false}
        />
        <InputField label='Variant' value={variant} placeholder='Variant..(M3, GTI)' onChange={handleVariantChange}/>
        <SelectMenuCustom
          options={transmissionData}
          value={transmission}
          onChange={handleTransmissionChange}
          error={(transmission === '0' || transmission === '') ? !!selectMenusError : false}
          // error={isValidOption(transmission, transmissionData, '0') ? !!selectMenusError : false}
          />
        <SelectMenuCustom
          options={fuelData}
          value={fuel}
          onChange={handleFuelChange}
          error={(fuel === '0' || fuel === '') ? !!selectMenusError : false}
          />
        <SelectMenuCustom
          options={yearsData}
          value={year}
          onChange={handleYearChange}
          error={(year === '0' || year === '') ? !!selectMenusError : false}
        />
        <SelectMenuCustom
          options={categoryData}
          value={coupe_type}
          onChange={handleCategoryChange}
          error={(coupe_type === '0' || coupe_type === '') ? !!selectMenusError : false}
        />
        <SelectMenuCustom
          options={numDoorsData}
          value={number_doors}
          onChange={handleDoorsChange}
          error={(number_doors === '0' || number_doors === '') ? !!selectMenusError : false}
        />
        <SelectMenuCustom
          options={conditionData}
          value={condition}
          onChange={handleConditionChange}
          error={(condition === '0' || condition === '') ? !!selectMenusError : false}
        />
        <SelectMenuCustom
          options={colorsData}
          value={color}
          onChange={handleColorChange}
          error={(color === '0' || color === '') ? !!selectMenusError : false}
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
            className="w-full text-white flex items-center justify-center bg-british-green-0 hover:bg-british-green-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 md:mr-2 dark:focus:ring-blue-800"
        >
            Submit
        </button>
        </div>
        </div>
      </div>
      </div>
    )};

export default ListingCreate