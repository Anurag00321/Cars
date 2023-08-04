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

  useEffect(() => {
    const filtered = items?.filter(item => item.make === make);
    setFilteredItems(filtered);
  }, [make, items]);

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
    setFilteredItems(filteredItems.filter(item => item.price === price));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams('=');
    queryParams.append('make', make);
    queryParams.append('model', model);
    queryParams.append('year', year);
    queryParams.append('fuel', fuel);
    queryParams.append('transmission', transmission);
    queryParams.append('price', price);
  
    router.push(`/listings?${queryParams.toString()}`);
  };

  return (
    <FilterContext.Provider value={filteredItems}>
      <div className="lg:top-2/4 md:3/4 absolute inset-0 bottom-10">
        <div className="flex absolute inset-0 mx-auto max-w-2xl h-full justify-center bg-british-green-3 bg-opacity-100 rounded-lg shadow-2xl">
          <div className="grid grid-cols-2 gap-x-12 max-w-4xl max-h-md px-4 py-16 pt-24">
            <SelectMenu items={items} data={items} field="make" value={make} onChange={handleMakeChange} onClick={handleMakeChange} />
            <SelectMenu items={filteredItems} data={filteredItems} field="model" value={model} onChange={handleModelChange} onClick={handleModelChange} />
            <SelectMenuCustom options={fuelType} field="fuel" value={fuel} onChange={handleFuelChange} />
            <SelectMenuCustom options={transmissionType} field="transmission" value={transmission} onChange={handleTransmissionChange} />
            <SelectMenuCustom options={yearsMap} field="year" value={year} onChange={handleYearChange} />
            <InputField type="text" label='Price' value={price} placeholder='Price..' onChange={handlePriceChange} />
            <div className="col-span-2 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white focus:ring-4 focus:outline-none max-h-10 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center bg-orange-3 hover:bg-orange-4 dark:focus:ring-orange-4"
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