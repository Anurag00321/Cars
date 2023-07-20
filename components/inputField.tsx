
interface InputField {
  label?: string;
  value: string;
  placeholder: string;
  makeBigger?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const InputField: React.FC<InputField> = ({ label, value, placeholder, makeBigger, onChange }) => {
return (
  <div>
    {/* <label htmlFor={label} className="block text-sm font-medium text-gray-700">
      {label}
    </label> */}
    <input
      type="text"
      name={label}
      id={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        makeBigger ? 'h-32' : 'h-10'
      }`}
    />
  </div>
);
};

export default InputField