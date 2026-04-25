interface ButtonProps {
	label: string;
	variant: 'primary' | 'secondary';
	disabled: boolean;
	onClick?: () => void;
}

export default function Button({ label, variant, disabled, onClick }: ButtonProps) {
	const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-300";

	const variantStyles = variant === 'primary' 
	  ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400 cursor-pointer" 
	  : "text-slate-300 hover:text-white";
	const disabledStyles = "disabled:cursor-not-allowed bg-emerald-200";
		return (
			<button
				disabled={disabled}
	  			className={`${baseStyles}  ${disabled ? disabledStyles : variantStyles}`}
	  			onClick={onClick}
				>
	  			{label}
	  		</button>
	);
}