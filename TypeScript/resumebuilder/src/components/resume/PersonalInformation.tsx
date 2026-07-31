"use client";

import { memo } from "react";
import { GitBranch, Globe, Link2, Mail, MapPin, Phone, User } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { Input } from "@/components/ui/Field";
import type { IPersonalInfo } from "@/types/resume.types";

interface PersonalInformationProps {
  data: IPersonalInfo;
  onChange: (data: IPersonalInfo) => void;
}

interface FieldDef {
  name: keyof IPersonalInfo;
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  /** Full-width on the two-column grid. */
  span?: boolean;
}

const fields: FieldDef[] = [
  {
    name: "fullName",
    label: "Full name",
    icon: User,
    placeholder: "Jane Doe",
    span: true,
  },
  {
    name: "email",
    label: "Email",
    icon: Mail,
    type: "email",
    placeholder: "jane@example.com",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    icon: Phone,
    type: "tel",
    placeholder: "+1 555 000 0000",
    autoComplete: "tel",
  },
  {
    name: "location",
    label: "Location",
    icon: MapPin,
    placeholder: "San Francisco, CA",
  },
  {
    name: "github",
    label: "GitHub",
    icon: GitBranch,
    type: "url",
    placeholder: "github.com/username",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: Link2,
    type: "url",
    placeholder: "linkedin.com/in/username",
  },
  {
    name: "portfolio",
    label: "Portfolio",
    icon: Globe,
    type: "url",
    placeholder: "yoursite.com",
  },
];

const PersonalInformation = memo(function PersonalInformation({
  data,
  onChange,
}: PersonalInformationProps) {
  const handleChange = (field: keyof IPersonalInfo, value: string) => {
    if (data[field] === value) return;
    onChange({ ...data, [field]: value });
  };

  return (
    <SectionShell
      icon={User}
      title="Personal information"
      description="How recruiters reach you"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.span ? "sm:col-span-2" : undefined}>
            <Input
              label={field.label}
              icon={field.icon}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={data[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
});

export default PersonalInformation;
