interface Props {
  name: string;
  message: string;
}

export default function EmailTemplate({ name, message }: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1>New message from {name}</h1>
      <p className="text-justify">{message}</p>
    </div>
  );
}
