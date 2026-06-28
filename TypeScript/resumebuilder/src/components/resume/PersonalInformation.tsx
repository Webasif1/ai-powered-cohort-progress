"use client";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function PersonalInformation({
  resume,
  setResume,
}: Props) {
  const handleChange = (field: string, value: string) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-black">
          Personal Information
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add your personal details
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block mb-2 font-medium">Full Name</label>
        <input
          type="text"
          value={resume.personalInfo.fullName}
          onChange={(e) =>
            handleChange("fullName", e.target.value)
          }
          placeholder="Asif Rahman"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={resume.personalInfo.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          placeholder="asif@gmail.com"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Profile / Role */}
      <div>
        <label className="block mb-2 font-medium">
          Job Role
        </label>
        <input
          type="text"
          value={resume.personalInfo.profile}
          onChange={(e) =>
            handleChange("profile", e.target.value)
          }
          placeholder="Frontend Developer"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-2 font-medium">
          Location
        </label>
        <input
          type="text"
          value={resume.personalInfo.location}
          onChange={(e) =>
            handleChange("location", e.target.value)
          }
          placeholder="Dhaka, Bangladesh"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Github */}
      <div>
        <label className="block mb-2 font-medium">
          Github
        </label>
        <input
          type="text"
          value={resume.personalInfo.github}
          onChange={(e) =>
            handleChange("github", e.target.value)
          }
          placeholder="github.com/asif"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Linkedin */}
      <div>
        <label className="block mb-2 font-medium">
          LinkedIn
        </label>
        <input
          type="text"
          value={resume.personalInfo.linkedin}
          onChange={(e) =>
            handleChange("linkedin", e.target.value)
          }
          placeholder="linkedin.com/in/asif"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Portfolio */}
      <div>
        <label className="block mb-2 font-medium">
          Portfolio
        </label>
        <input
          type="text"
          value={resume.personalInfo.portfolio}
          onChange={(e) =>
            handleChange("portfolio", e.target.value)
          }
          placeholder="asif.dev"
          className="w-full border rounded-lg p-3"
        />
      </div>
    </div>
  );
}
