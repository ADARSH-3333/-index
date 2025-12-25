"use client"
import * as React from "react"
import { Navigation } from "@/components/navigation"
import { Mail, Phone, Award, Briefcase, Code, ArrowLeft, Building2, GraduationCap } from "lucide-react"
import Link from "next/link"

const getStudentById = (id: string) => {
  // Mock data - in a real app, this would be an API call
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      cgpa: 8.1,
      skills: ["Python", "SQL", "React", "Node.js"],
      internships: ["Backend Developer at Tech Corp", "Frontend Intern at Web Solutions"],
      projects: ["E-commerce Platform", "Student Management System"],
      placed: true,
      company: "Tech Corp",
      package: "12 LPA",
      location: "Bangalore",
      joinDate: "July 2024",
    },
    // ... other students
  ]
  return students.find((s) => s.id === Number.parseInt(id)) || students[0]
}

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  const student = getStudentById(resolvedParams.id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="students" userName="Admin User" userRole="admin" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary mb-8 transition-colors font-bold uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white border-2 border-border rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex gap-6 items-center">
              <div className="h-24 w-24 rounded-2xl bg-primary flex items-center justify-center text-4xl font-black border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {student.name[0]}
              </div>
              <div>
                <h1 className="mb-2">{student.name}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{student.email}</span>
                  </div>
                  {student.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{student.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {student.placed && (
              <div className="bg-secondary text-secondary-foreground px-6 py-5 rounded-xl border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5" />
                  <span className="font-black text-lg uppercase tracking-tight">Placed</span>
                </div>
                <p className="font-bold">
                  {student.company} • {student.package}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border-2 border-border rounded-2xl p-8">
              <h2 className="mb-6 flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-secondary" />
                Experience
              </h2>
              <div className="space-y-6">
                {student.internships.map((exp, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                    <Building2 className="h-6 w-6 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-black text-xl">{exp}</h4>
                      <p className="text-muted-foreground font-bold">2023 - Present</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border-2 border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="h-6 w-6 text-secondary" />
                Technical Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.projects.map((project, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-border rounded-xl hover:border-primary transition-colors cursor-pointer"
                  >
                    <h4 className="font-bold mb-1">{project}</h4>
                    <p className="text-sm text-muted-foreground">Full Stack Development</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white border-2 border-border rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-secondary" />
                <h3 className="uppercase tracking-widest text-sm text-muted-foreground">Academic Score</h3>
              </div>
              <div className="p-8 bg-primary rounded-xl border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                <p className="text-6xl font-black">{student.cgpa.toFixed(2)}</p>
                <p className="font-bold mt-2 uppercase tracking-tighter">Current CGPA</p>
              </div>
            </section>

            <section className="bg-white border-2 border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-muted rounded-md text-sm font-bold border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
