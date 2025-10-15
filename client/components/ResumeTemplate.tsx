"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ResumeTemplate({ data }: { data: any }) {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-10 text-gray-900 dark:text-gray-100 font-sans space-y-8">
      {/* Header */}
      <div className="text-center border-b pb-6">
        <h1 className="text-3xl font-bold tracking-wide">{data.fullName}</h1>
        <p className="text-gray-600 dark:text-gray-400">{data.title}</p>
        <p className="mt-2 text-sm">
          {data.email} | {data.phone} | {data.location}
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, i: number) => (
              <div key={i}>
                <h3 className="font-semibold text-md">{exp.role}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.company} | {exp.years}
                </p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu: any, i: number) => (
              <div key={i}>
                <h3 className="font-semibold text-md">{edu.degree}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {edu.institution} ({edu.years})
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="bg-gray-50 dark:bg-gray-800 border-none shadow-none">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
