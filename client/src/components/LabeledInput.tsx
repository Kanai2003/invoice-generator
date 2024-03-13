interface LabeledInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-zinc-200">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={`Enter Your ${label}`}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1 text-black "
            />
        </div>
    );
};

export default LabeledInput;
