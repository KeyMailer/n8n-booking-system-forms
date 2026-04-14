// FOR NEWSLETTER AND SOCIAL FORM
export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-xs text-destructive">{message}</p>;
}
