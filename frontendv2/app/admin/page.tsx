"use client"

import type * as React from "react"
import { Navigation } from "@/components/navigation"
import { BarChart3, Users, Briefcase, TrendingUp, CheckCircle2, Clock, Award } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock statistics
const stats = {
  totalStudents: 10,
  placedStudents: 3,
  averageCGPA: 8.4,
  topCompanies: ["Google", "Microsoft", "Amazon"],
  recentPlacements: [
    { name: "John Doe", company: "Tech Corp", package: "12 LPA", date: "2 days ago" },
    { name: "Neha Iyer", company: "StartupX", package: "10 LPA", date: "5 days ago" },
    { name: "Aditya Verma", company: "Data Labs", package: "15 LPA", date: "1 week ago" },
  ],
  placementRate: 30,
  skillDemand: [
    { skill: "Python", count: 6 },
    { skill: "React", count: 4 },
    { skill: "SQL", count: 3 },
    { skill: "ML", count: 3 },
  ],
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="stats" userName="Admin User" userRole="admin" />

      <main className="max-w-7xl mx-auto px-10 py-16">
        <header className="mb-12">
          <h1 className="mb-2">Admin Dashboard</h1>
          <p className="text-[18px] text-muted-foreground">Overview of placement statistics and student performance</p>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents.toString()}
            sublabel={`${stats.placedStudents} placed`}
          />
          <StatCard
            icon={CheckCircle2}
            label="Placement Rate"
            value={`${stats.placementRate}%`}
            sublabel="3 out of 10"
            color="success"
          />
          <StatCard
            icon={Award}
            label="Average CGPA"
            value={stats.averageCGPA.toFixed(2)}
            sublabel="Across all students"
          />
          <StatCard icon={Briefcase} label="Active Openings" value="12" sublabel="New this week" color="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Placements */}
          <section className="border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold">Recent Placements</h2>
                <p className="text-sm text-muted-foreground">Latest student success stories</p>
              </div>
            </div>

            <div className="space-y-4">
              {stats.recentPlacements.map((placement, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-[16px]">{placement.name}</p>
                    <p className="text-sm text-muted-foreground">{placement.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{placement.package}</p>
                    <p className="text-xs text-muted-foreground">{placement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Skills in Demand */}
          <section className="border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-[24px] font-bold">Top Skills</h2>
                <p className="text-sm text-muted-foreground">Most common among students</p>
              </div>
            </div>

            <div className="space-y-4">
              {stats.skillDemand.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{item.skill}</p>
                    <p className="text-sm text-muted-foreground">{item.count} students</p>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(item.count / stats.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quick Actions */}
        <section className="border-2 border-dashed border-border rounded-xl p-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-[24px] font-bold mb-2">Quick Actions</h3>
          <p className="text-muted-foreground mb-6">Manage students, placements, and reports</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <ActionButton label="Add Student" />
            <ActionButton label="Post Job Opening" />
            <ActionButton label="Generate Report" />
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color = "default",
}: {
  icon: React.ElementType
  label: string
  value: string
  sublabel: string
  color?: "default" | "success" | "warning"
}) {
  const colorClasses = {
    default: "bg-primary/10 text-primary",
    success: "bg-[#D1FAE5] text-[#065F46]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
  }

  return (
    <div className="border border-border rounded-xl p-6">
      <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center mb-4", colorClasses[color])}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-[32px] font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{sublabel}</p>
    </div>
  )
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="h-[48px] px-8 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all">
      {label}
    </button>
  )
}
