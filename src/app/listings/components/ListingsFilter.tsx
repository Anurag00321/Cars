'use client'

import { Listing } from "@prisma/client";
import { useState, useEffect, createContext } from 'react';
import SelectMenu from "../../../../components/selectMenu";
import { useRouter } from 'next/navigation';
import SelectMenuPrice from "../../../../components/selectMenuPrice";
import SelectMenuCustom from "../../../../components/selectMenuCustom";

interface ListingsFilterProps {
  initialItems: Listing[];
}

interface Option {
  // placeholder: string;
  id: string;
  label: string;
}

export const FilterContext = createContext<Listing[]>([]);

export const ListingsFilter: React.FC<ListingsFilterProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [price, setPrice] = useState('');

  const [filteredItems, setFilteredItems] = useState(initialItems || []);

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
      return null
    }
    setFilteredItems(filteredItems.filter(item => item.fuel === value));
    setFuel(value);
    console.log(value)
  };

  const handleTransmissionChange = (value: any) => {
    if (value == "Transmission.."){
      return null
    }
    setFilteredItems(filteredItems.filter(item => item.transmission === value));
    setTransmission(value);
    console.log(value)
  };

  const handleYearChange = (value: string) => {
    if (value == "Year.."){
      return null
    }
    setFilteredItems(filteredItems.filter(item => item.year === value));
    setYear(value);
  };

  const handlePriceChange = (event: any) => {
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

  const transmissionType = [
      // placeholder
    { label: 'Transmission..', id: '0' },
    { label: 'Manual', id: '1' },
    { label: 'Automatic', id: '2' },
  ]

  const fuelType = [
     // placeholder
    { label: 'Fuel..', id: '0' },
    { label: 'Petrol', id: '1' },
    { label: 'Diesel', id: '2' },
    { label: 'Electric', id: '3' },
    { label: 'Hybrid', id: '4' },
  ]

  const currentYear = new Date().getFullYear();
  const yearsArr = Array.from({ length: 90 }, (_, index) => currentYear - index);

  const yearsMap: Option[] = [
    { id: '', label: 'Year..' }, // Placeholder
    ...yearsArr.map((year, index) => ({
      id: (year).toString(),
      label: year.toString(),
    })),
  ];
  
  return (
    <FilterContext.Provider value={filteredItems}>
    <div>
      <div className="bg-slate-950">
        <div className="absolute inset-0 flex mx-auto max-w-5xl bg-slate-950 bg-opacity-50 rounded-2xl">
          <div className="flex flex-col flex-wrap gap-y-12 gap-x-10 justify-center max-w-3xl max-h-md px-16">
            <SelectMenu items={items} data={items} field="make" value={make} onChange={handleMakeChange} onClick={handleMakeChange}/>
            <SelectMenu items={filteredItems} data={filteredItems} field="model" value={model} onChange={handleModelChange} onClick={handleModelChange}/>
            <SelectMenuCustom options={fuelType} field="fuel" value={fuel} onChange={handleFuelChange}/>
            <SelectMenuCustom options={transmissionType} field="transmission" value={transmission} onChange={handleTransmissionChange}/>
            <SelectMenuCustom options={yearsMap} field="year" value={year} onChange={handleYearChange}/>
            <input
            value={price}
            onChange={handlePriceChange}
            className={`block  w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-6`}
            />
            </div>
            <button className="bg-white my-60 px-4" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </FilterContext.Provider>
  );
};

export default ListingsFilter;