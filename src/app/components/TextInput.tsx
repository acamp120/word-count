import React from "react";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function TextInput({ value, onChange, rows = 6 }: TextInputProps) {
  return (
    <>
      <textarea
        className="w-full border rounded border-gray-300 p-3 mb-3"
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </>
  );
}