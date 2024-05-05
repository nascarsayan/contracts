import "./index.css";

export type FormElementProps = {
  label: string;
  value: any;
  type: string;
  onChange: (event: Event) => void;
  isTextArea?: boolean;
  disabled?: boolean;
};

export function FormElement({
  label,
  value,
  type,
  onChange,
  isTextArea = false,
  disabled = false,
}: FormElementProps) {
  return (
    <div>
      <label class="block pt-2 pb-1 pl-2">{label}</label>
      {isTextArea ? (
        <textarea
          class="block w-full"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <input
          class="block w-full"
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export type SubmitButtonProps = {
  text: string;
  onClick: (event: Event) => void;
};

export function SubmitButton({ text, onClick }: SubmitButtonProps) {
  return (
    <button class="block w-full bg-rose-300 dark:bg-rose-600 border-2 border-rose-600" type="submit" onClick={onClick}>
      <span class="font-bold" >{text}</span>
    </button>
  );
}
