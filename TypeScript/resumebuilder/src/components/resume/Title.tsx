"use client";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Title({ resume, setResume }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-black">Resume Title</h2>

      <input
        type="text"
        placeholder="Frontend Developer"
        value={resume.title}
        onChange={(e) =>
          setResume({
            ...resume,
            title: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />
    </div>
  );
}
