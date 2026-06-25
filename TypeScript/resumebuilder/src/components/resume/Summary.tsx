type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Summary({ resume, setResume }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold mb-2">
        Professional Summary
      </h2>

      <p className="text-gray-500 mb-6">
        Write a short summary about yourself.
      </p>

      <textarea
        value={resume.summery}
        onChange={(e) =>
          setResume({
            ...resume,
            summery: e.target.value,
          })
        }
        placeholder="Example: Frontend developer with 3 years of experience building modern web apps..."
        className="w-full h-56 border rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}
