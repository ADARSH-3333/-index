"use client"

import * as React from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { StudentCard } from "@/components/student-card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Mock data based on the provided JSON
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    cgpa: 8.1,
    skills: ["Python", "SQL"],
    internships: ["Backend Stabber"],
    placed: true,
  },
  {
    id: 2,
    name: "Aarav Menon",
    email: "aarav@example.com",
    cgpa: 9.0,
    skills: ["Python", "FastAPI", "ML"],
    internships: ["DS Intern"],
    placed: false,
  },
  {
    id: 3,
    name: "Riya Sharma",
    email: "riya.sharma@example.com",
    cgpa: 9.3,
    skills: ["React", "Node.js"],
    internships: ["Frontend Intern"],
    placed: false,
  },
  {
    id: 4,
    name: "Vikram Rao",
    email: "vikram.rao@example.com",
    cgpa: 7.5,
    skills: ["C++", "DSA"],
    internships: ["nan"],
    placed: false,
  },
  {
    id: 5,
    name: "Neha Iyer",
    email: "neha.iyer@example.com",
    cgpa: 8.7,
    skills: ["Python", "SQL", "ML"],
    internships: ["Research Intern"],
    placed: true,
  },
  {
    id: 6,
    name: "Karthik Nair",
    email: "karthik.nair@example.com",
    cgpa: 7.8,
    skills: ["Go", "Docker"],
    internships: ["Backend Intern"],
    placed: false,
  },
  {
    id: 7,
    name: "Saanvi Kapoor",
    email: "saanvi.kapoor@example.com",
    cgpa: 9.5,
    skills: ["React", "Next.js", "TypeScript"],
    internships: ["Frontend Intern"],
    placed: false,
  },
  {
    id: 8,
    name: "Aditya Verma",
    email: "aditya.verma@example.com",
    cgpa: 8.3,
    skills: ["Java", "Spring Boot"],
    internships: ["Software Intern"],
    placed: true,
  },
]

export default function StudentsPage() {
  return (
    <Suspense fallback={null}>
      <StudentsContent />
    </Suspense>
  )
}

function StudentsContent() {
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "placed" | "top" | "available">("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const studentsPerPage = 5

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))

    if (filter === "placed") return matchesSearch && student.placed
    if (filter === "available") return matchesSearch && !student.placed
    if (filter === "top") return matchesSearch && (student.cgpa || 0) >= 8.5
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const endIndex = startIndex + studentsPerPage
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [search, filter])

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="students" userName="Admin User" userRole="admin" />

      <main className="max-w-7xl mx-auto px-10 py-16">
        <header className="mb-12">
          <h1 className="mb-2">Students</h1>
          <p className="text-[18px] text-muted-foreground">{filteredStudents.length} students in database</p>
        </header>

        <section className="space-y-8">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or skills..."
              className="h-[60px] pl-16 pr-12 text-[18px] rounded-xl border-border focus:border-primary focus:border-2 transition-all shadow-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-6 top-1/2 -translate-y-1/2">
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-4">
            <FilterChip label="All" isActive={filter === "all"} onClick={() => setFilter("all")} />
            <FilterChip label="Placed" isActive={filter === "placed"} onClick={() => setFilter("placed")} />
            <FilterChip label="8.5+ CGPA" isActive={filter === "top"} onClick={() => setFilter("top")} />
            <FilterChip label="Available" isActive={filter === "available"} onClick={() => setFilter("available")} />
          </div>

          {/* Student List */}
          <div className="grid gap-6">
            {currentStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}

            {filteredStudents.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-border rounded-xl">
                <p className="text-[24px] font-bold text-muted-foreground">No students found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {filteredStudents.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length}{" "}
                students
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-lg border transition-all",
                    currentPage === 1
                      ? "border-border text-muted-foreground cursor-not-allowed"
                      : "border-border hover:border-primary hover:text-primary",
                  )}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all",
                        currentPage === page
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary",
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded-lg border transition-all",
                    currentPage === totalPages
                      ? "border-border text-muted-foreground cursor-not-allowed"
                      : "border-border hover:border-primary hover:text-primary",
                  )}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function FilterChip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-[44px] px-8 rounded-lg text-[16px] font-semibold transition-all border",
        isActive
          ? "bg-primary text-white border-primary"
          : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  )
}
