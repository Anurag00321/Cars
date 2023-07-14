'use client'

import { Listing } from "@prisma/client";
import { useState, useEffect } from 'react';
import SelectMenu from "../../../../components/selectMenu";

interface ListingsFilterProps {
  initialItems: Listing[];
}

export const ListingsFilter: React.FC<ListingsFilterProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

  useEffect(() => {
    const filteredModels = items
      .filter(item => item.make === make)
      .map(item => item.model);
    const uniqueModels = Array.from(new Set(filteredModels));
    setFilteredModels(uniqueModels);
  }, [make, items]);

  const handleMakeChange = (value: string) => {
    console.log(value)
    console.log(make)
    setMake(value);
    setModel('');
  };

  const handleModelChange = (value: string) => {
    console.log(value)
    console.log(model)
    setModel(value);
  };

  return (
    <div>
      <div className="bg-slate-950">
        <div className="absolute inset-0 flex mx-auto max-w-5xl bg-slate-950 bg-opacity-50">
          <div className="flex flex-col flex-wrap gap-y-12 gap-x-10 justify-center max-w-3xl max-h-md px-16">
            <SelectMenu
              items={items.map(item => item.make)}
              data={items.map(item => item.make) as any}
              field="make"
              onChange={handleMakeChange}
              onClick={handleMakeChange}
              value={make}
            />
            <SelectMenu
              items={filteredModels}
              data={filteredModels as any}
              field="model"
              onChange={handleModelChange}
              onClick={handleModelChange}
              value={model}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsFilter;
