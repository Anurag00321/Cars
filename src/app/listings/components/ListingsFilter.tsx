'use client'

import { Listing } from "@prisma/client";
import { useState, useEffect, createContext } from 'react';
import SelectMenu from "../../../../components/selectMenu";
import { useRouter, usePathname, useSearchParams} from 'next/navigation';
import SelectMenuPrice from "../../../../components/selectMenuPrice";
import SelectMenuCustom from "../../../../components/selectMenuCustom";
import { InputField } from "../../../../components/inputField";
import Landing from "../../../../components/landing";
import GetOptions from "@/app/actions/getOptions";
import { unique } from "next/dist/build/utils";


interface ListingsFilterProps {
  initialItems: Listing[];
  sideBar?: boolean;
}

interface Option {
  // placeholder: string;
  id: string;
  label: string;
}

export const FilterContext = createContext<Listing[]>([]);

export const ListingsFilter: React.FC<ListingsFilterProps> = ({ initialItems, sideBar }) => {
  const [items, setItems] = useState(initialItems);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [price, setPrice] = useState('');

  const [filteredItems, setFilteredItems] = useState(initialItems || []);

    // const [filteredItems, setFilteredItems] = useState<Listing[]>([]);

  const options = GetOptions()

  const transmissionType = options.transmissionType
  const fuelType = options.fuelType
  const yearsMap = options.yearsMap

  const router = useRouter();

  const [makeNoDupe, setMakeNoDupe] = useState<string[]>([])

  useEffect(() => {
    const filtered = items?.filter(item => item.make === make);
    setFilteredItems(filtered);
  
    console.log('uniqueModelsArray:', uniqueModelsArray);
  }, [make, items]);
  
      // Create a map to store unique models and their corresponding listing objects
      const uniqueModelsMap = new Map<string, Listing>();
      filteredItems.forEach(item => {
        if (!uniqueModelsMap.has(item.model)) {
          uniqueModelsMap.set(item.model, item);
        }
      });
    
      // Extract the values (listing objects) from the map to get uniqueModelsArray
      const uniqueModelsArray = Array.from(uniqueModelsMap.values());  

  const unique = [...new Set(items.filter(item => item.make))]

  const uniqueItemsArray = unique?.filter(
    (item, index, self) => index === self.findIndex(t => t.make === item.make)
  );

  // const uniqueModelsArray = filteredItems?.filter(
  //   (item, index, self) => index === self.findIndex(t => t.make === item.model)
  // );  

// useEffect(() => {
//   // Filter items based on selected make
//   const filtered = items?.filter(item => item.make === make);

//   // Get unique car makes from the filtered items
//   const uniqueMakes = [...new Set(filtered?.map(item => item.make))];

//   // Create an array of items with unique makes
//   const uniqueItems = items?.filter(item => uniqueMakes.includes(item.make));

//   setFilteredItems(uniqueItems);
// }, [make, items]);
  
  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel('')
    console.log(make)
    setFilteredItems(filteredItems.filter(item => item.make === value));
  };
  
  const handleModelChange = (value: string) => {
    setModel('')
    setFilteredItems(items.filter(item => item.model === value));
    setModel(value);
  };

  const handleFuelChange = (value: string) => {
    if (value == "Fuel.."){
      setFuel("")
    } else {
    setFilteredItems(filteredItems.filter(item => item.fuel === value));
    setFuel(value);
    console.log(value)
    }
  };

  const handleTransmissionChange = (value: string) => {
    if (value == "Transmission.."){
      setTransmission("")
    } else {
    setFilteredItems(filteredItems.filter(item => item.transmission === value));
    setTransmission(value);
    console.log(value)
    }
  };

  const handleYearChange = (value: string) => {
    if (value == "Year.."){
      setYear("")
    } else {
    setFilteredItems(filteredItems.filter(item => item.year === value));
    setYear(value);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrice(event.target.value)
    setFilteredItems(filteredItems.filter(item => item.price === +price));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams('=');
    queryParams.append('make', make);
    queryParams.append('model', model);
    queryParams.append('year', year);
    queryParams.append('fuel', fuel);
    queryParams.append('transmission', transmission);
    queryParams.append('price', price);
  
    router.push(`/listings?&page=1${queryParams.toString()}`);
    // router.push(`/listings?page=1`);
  };


  return (
    <FilterContext.Provider value={filteredItems}>
    <div className="absolute xs:top-[20rem] sm:top-[24rem] md:top-[26rem] lg:top-[45%] lg:bottom-10 2xl:bottom-20 mt-6 inset-0 bottom-10 ">
        <div className="flex absolute inset-0 mx-auto max-w-2xl h-full justify-center bg-british-green-3 bg-opacity-100 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 max-w-4xl max-h-md px-4 py-8 sm:py-16 sm:pt-24">
            <SelectMenu items={uniqueItemsArray} data={uniqueItemsArray} field="make" value={make} onChange={handleMakeChange} onClick={handleMakeChange} />
            <SelectMenu items={uniqueModelsArray} data={uniqueModelsArray} field="model" value={model} onChange={handleModelChange} onClick={handleModelChange} />
            <SelectMenuCustom options={fuelType} field="fuel" value={fuel} onChange={handleFuelChange} />
            <SelectMenuCustom options={transmissionType} field="transmission" value={transmission} onChange={handleTransmissionChange} />
            <SelectMenuCustom options={yearsMap} field="year" value={year} onChange={handleYearChange} />
            <InputField type="text" value={price} placeholder='Price..' onChange={handlePriceChange} />
            <div className="sm:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white focus:ring-4 focus:outline-none max-h-10 focus:ring-bg-orange-4 font-medium rounded-lg text-sm px-8 text-center bg-orange-3 hover:bg-orange-4 dark:focus:ring-orange-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </FilterContext.Provider>
  );
    
};

export default ListingsFilter;