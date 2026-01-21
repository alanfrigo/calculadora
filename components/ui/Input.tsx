interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  type?: "text" | "number";
  placeholder?: string;
}

export function Input({
  label,
  value,
  onChange,
  prefix,
  suffix,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {prefix && (
          <span className="pl-3 text-zinc-500 dark:text-zinc-400">{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
        />
        {suffix && (
          <span className="pr-3 text-zinc-500 dark:text-zinc-400">{suffix}</span>
        )}
      </div>
    </div>
  );
}
