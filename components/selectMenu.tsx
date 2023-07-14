import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Listing } from '@prisma/client';

function classNames(...className: any) {
  return className.filter(Boolean).join(' ');
}

interface ListingsFilterProps {
  data: Listing[];
  items: Listing[] | string[];
  field: keyof Listing;
  value: string;
  onChange: (value: string) => void;
  onClick: (value: string) => void;
}

export const SelectMenu: React.FC<ListingsFilterProps> = ({ data, items, field, value, onChange, onClick }) => {
  const [selected, setSelected] = useState(value as any);
  const [itemsState, setItemsState] = useState(items);

  const getFieldContent = (item: Listing, field: keyof Listing) => {
    const fieldValue = item?.[field];

    if (fieldValue instanceof Date) {
      return fieldValue.toLocaleDateString();
    }

    return fieldValue;
  };

  const handleItemClick = (item: Listing | string) => {
    const value = typeof item === 'string' ? item : getFieldContent(item, field);
    setSelected(value);
    onChange(value);
    onClick(value);
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{getFieldContent(selected, field)}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data?.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                    onClick={() => handleItemClick(item)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {getFieldContent(item, field as keyof Listing)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenu;
