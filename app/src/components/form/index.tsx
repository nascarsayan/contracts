import "./index.css";

export type FormElementProps = {
  label: string;
  value: any;
  type: string;
  onChange: (event: Event) => void;
  isTextArea?: boolean;
}

export function FormElement({
   label, value, type, onChange, isTextArea = false
}: FormElementProps) {
  return (
    <div>
      <label
      class="block pt-2 pb-1 pl-2">{label}</label>
      {
        isTextArea
        ? <textarea class="block w-full" value={value} onChange={onChange} />
        : <input class="block w-full" type={type} value={value} onChange={onChange} />
      }
    </div>
  );
}

export type SubmitButtonProps = {
  text: string;
  onClick: (event: Event) => void;
};

export function SubmitButton({
  text, onClick
}: SubmitButtonProps) {
  return (
    <button
    class="block w-full"
     type="submit" onClick={onClick}>
      {text}
    </button>
  );
}