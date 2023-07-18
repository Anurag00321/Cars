
interface InputField {
    label?: string;
    value: string;
    placeholder: string;
}


export const InputField: React.FC<InputField> = ({ label, value, placeholder }) => {
    return (
    <div>
      <label htmlFor={value} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={value}
          name={value}
          id={value}
          className="border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default InputField