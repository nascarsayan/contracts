export type Props = {
  head?: string;
  texts: string[];
  active?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  onDeleteClick?: () => void;
};

export default function TextCard({
  texts,
  head,
  active = false,
  hidden = false,
  onClick = () => {},
  onDeleteClick = () => {},
}: Props) {
  return (
    <div class="flex items-start cursor-pointer rounded-lg" hidden={hidden}>
      <div
        class={`px-4 py-2 rounded-lg border-2 ${active ? "shadow-lg bg-rose-100 dark:bg-zinc-600 border-blue-600" : "border-rose-400"}`} // ${active ? "border-2 border-blue-500" : ""}
        onClick={onClick}
      >
        {head ? <p class="font-bold text-lg m-0">{head}</p> : null}
        {texts.map((text, index) => (
          <p class="text-base m-0" key={index}>
            {text}
          </p>
        ))}
      </div>
      <button
        class="-ml-16 mt-2"
        onClick={onDeleteClick}
      >
        ❌
      </button>
    </div>
  );
}
