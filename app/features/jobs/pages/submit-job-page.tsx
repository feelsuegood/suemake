import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-job-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constans";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Post a Job | suemake" },
    { name: "description", content: "Post a job on suemake" },
  ];
};

export default function SubmitJobPage() {
  return (
    <div>
      <Hero title="Post a Job" subtitle="Post a job on suemake" />
      <Form className="max-w-screen-2xl mx-auto flex flex-col items-center gap-10">
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputPair
            id="position"
            label="Position"
            name="position"
            placeholder="i.e.Software Engineer"
            description="(40 characters max)"
            maxLength={40}
            type="text"
            required
          />
          <InputPair
            id="overview"
            label="Overview"
            name="overview"
            placeholder="i.e. We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and MongoDB."
            description="(400 characters max)"
            maxLength={400}
            type="textarea"
            required
            textArea
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            name="responsibilities"
            placeholder="i.e. Write clean, maintainable code, etc."
            description="(400 characters max, comma separated)"
            maxLength={400}
            type="text"
            required
            textArea
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            name="qualifications"
            placeholder="i.e. Bachelor's degree in Computer Science or related field, 3+ years of experience in React, Node.js, and MongoDB, etc."
            description="(400 characters max, comma separated)"
            maxLength={400}
            type="text"
            required
            textArea
          />
          <InputPair
            id="benefits"
            label="Benefits"
            name="benefits"
            placeholder="i.e. Health insurance, Dental insurance, Vision insurance, 401(k) retirement plan, Paid time off, etc."
            description="(400 characters max, comma separated)"
            maxLength={400}
            type="text"
            required
            textArea
          />
          <InputPair
            id="skills"
            label="Skills"
            name="skills"
            placeholder="i.e. React, Node.js, MongoDB, TypeScript, JavaScript, etc."
            description="(400 characters max, comma separated)"
            maxLength={400}
            type="text"
            required
            textArea
          />
          <InputPair
            id="companyName"
            label="Company Name"
            name="companyName"
            placeholder="Company Name"
            description="(40 characters max)"
            maxLength={40}
            type="text"
            required
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            name="companyLogoUrl"
            placeholder="i.e. https://example.com/logo.png"
            description="(200 characters max)"
            type="text"
            required
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            name="companyLocation"
            placeholder="i.e. Remote, San Francisco, etc."
            description="(200 characters max)"
            type="text"
            required
          />
          <InputPair
            id="applyUrl"
            label="Apply URL"
            name="applyUrl"
            placeholder="i.e. https://example.com/apply"
            description="(100 characters max)"
            type="text"
            required
          />
          <SelectPair
            label="Job Type"
            name="jobType"
            placeholder="Select the type of job"
            description="Select the type of job"
            required
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="Location Type"
            name="locationType"
            placeholder="Select the location type"
            description="Select the location type"
            required
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          <SelectPair
            label="Salary Range"
            name="salaryRange"
            placeholder="Select the salary range"
            description="Select the salary range"
            required
            options={SALARY_RANGES.map((salary) => ({
              label: salary,
              value: salary,
            }))}
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size={"lg"}>
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
