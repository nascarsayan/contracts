export type Props = {
  head?: string;
  texts: string[];
  active?: boolean;
  onClick?: () => void;
};

export default function TextCard({
  texts,
  head,
  active = false,
  onClick = () => {},
}: Props) {
  return (
    <div
      class="px-4 py-2 rounded-lg"
      style={{
        backgroundColor: active ? "#333" : "#1a1a1a",
      }}
      onClick={onClick}
    >
      {head ? <p class="font-bold text-lg m-0">{head}</p> : null}
      {texts.map((text, index) => (
        <p class="text-base m-0" key={index}>
          {text}
        </p>
      ))}
    </div>
  );
}
