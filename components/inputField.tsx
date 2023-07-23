
interface InputField {
  label?: string;
  value: string;
  placeholder: string;
  makeBigger?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}


export const InputField: React.FC<InputField> = ({ label, value, placeholder, makeBigger, onChange }) => {
return (
  <div>
    {/* <label htmlFor={label} className="block text-sm font-medium text-gray-700">
      {label}
    </label> */}
    {makeBigger ? (
      <textarea
        name={label}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm p-3 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-1 focus:border-british-green-1 sm:text-sm"
      />
      ) : (
    <input
      type="text"
      name={label}
      id={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-text focus:outline-none focus:ring-1 focus:ring-british-green-0 focus:border-british-green-0 sm:text-sm
        "
    />)}
  </div>
);
};

export default InputField