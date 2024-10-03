export default function CustomInput({ label, invalid, ...props }) {
  const labelClasses = `block mb-2 text-xs font-bold tracking-wide uppercase ${
    invalid ? "text-red-400" : "text-stone-900"
  }`;
  const inputClasses =
    `w-full px-3 py-2 leading-tight border rounded shadow ${
      invalid ? "text-red-500 bg-red-100 border-red-300" : "text-gray-900 bg-stone-300"
    }`;


  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...props} />
    </p>
  );
}
