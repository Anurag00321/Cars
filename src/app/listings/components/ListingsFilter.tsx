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
    console.log(filteredItems)
  }, [make, items]);

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel('')
    console.log(make)
    setFilteredItems(filteredItems.filter(item => item.make === value));
    console.log(filteredItems)
  };
  
  const handleModelChange = (value: string) => {
    setModel('')
    setFilteredItems(items.filter(item => item.model === value));
    setModel(value);
    // console.log(filteredItems)
  };

  const handleYearChange = (value: string) => {
    setFilteredItems(filteredItems.filter(item => item.year === value));
    setYear(value);
  };

  const handleFuelChange = (value: string) => {
    setFilteredItems(filteredItems.filter(item => item.fuel === value));
    setFuel(value);
  };

  const handleTransmissionChange = (value: string) => {
    setFilteredItems(filteredItems.filter(item => item.transmission === value));
    setTransmission(value);
  };

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value)
    setFilteredItems(filteredItems.filter(item => item.price === price));
    // setPrice(value);
    // console.log(event.target.value)
    console.log(price)
  };

  const handleSubmit = () => {
    // const filteredItemsStorage = localStorage.setItem('filteredItems', (filteredItems))
    // console.log(filteredItems)
    const queryParams = new URLSearchParams('=');
    queryParams.append('make', make);
    queryParams.append('model', model);
    queryParams.append('year', year);
    queryParams.append('fuel', fuel);
    queryParams.append('transmission', transmission);
    queryParams.append('price', price);
  
    router.push(`/listings?${queryParams.toString()}`);
  };  

  const priceRange = [
    { price: `0-5000`, id: '1'},
    { price: `5001-10000`, id: '2'},
    { price: `10001-20000`, id: '3'},
    { price: `20001-50000`, id: '4'},
    { price: `50001+`, id: '5'},
  ]

  const years = [
    { label: '1992', id: '1'},
    { label: '1993', id: '2'},
    { label: '1994', id: '3'},
  ]

  return (
    <FilterContext.Provider value={filteredItems}>
    <div>
      <div className="bg-slate-950">
        <div className="absolute inset-0 flex mx-auto max-w-5xl bg-slate-950 bg-opacity-50">
          <div className="flex flex-col flex-wrap gap-y-12 gap-x-10 justify-center max-w-3xl max-h-md px-16">
            <SelectMenu items={items} data={items} field="make" value={make} onChange={handleMakeChange} onClick={handleMakeChange}/>
            <SelectMenu items={filteredItems} data={filteredItems} field="model" value={model} onChange={handleModelChange} onClick={handleModelChange}/>
            <SelectMenu items={items || filteredItems} data={items || filteredItems} field="year" value={year} onChange={handleYearChange} onClick={handleYearChange}/>
            <SelectMenu items={items || filteredItems} data={items || filteredItems} field="fuel" value={fuel} onChange={handleFuelChange} onClick={handleFuelChange}/>
            <SelectMenu items={items || filteredItems} data={items || filteredItems} field="transmission" value={transmission} onChange={handleTransmissionChange} onClick={handleTransmissionChange}/>
            <SelectMenuCustom options={years} field="transmission" value={year} onChange={handleYearChange}/>
            {/* <SelectMenuPrice data={priceRange} field="price" value={price} onChange={handlePriceChange} onClick={handlePriceChange}/>
            <SelectMenu data={items || filteredItems} field="price" value={price} onChange={handlePriceChange} onClick={handlePriceChange}/> */}
            <input placeholder="Max price.." value={price} onChange={handlePriceChange}></input>
            </div>
            <button className="bg-white my-60 px-4" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
    </FilterContext.Provider>
  );
};

export default ListingsFilter;