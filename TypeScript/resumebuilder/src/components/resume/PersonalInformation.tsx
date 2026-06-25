export default function PersonalInfo({ resume, setResume }: any) {
  const info = resume.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow text-black">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="fullName"
          value={info.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-3 rounded-lg"
        />

        <input
          name="profile"
          value={info.profile}
          onChange={handleChange}
          placeholder="Job Title"
          className="border p-3 rounded-lg"
        />

        <input
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
        />

        <input
          name="location"
          value={info.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-3 rounded-lg"
        />

        <input
          name="github"
          value={info.github}
          onChange={handleChange}
          placeholder="Github"
          className="border p-3 rounded-lg"
        />

        <input
          name="linkedin"
          value={info.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          className="border p-3 rounded-lg"
        />
      </div>
    </div>
  );
}
