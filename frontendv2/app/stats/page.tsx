"use client"
import { Navigation } from "@/components/navigation"
import { TrendingUp, Users, Target, Activity } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

const data = [
  { name: "Jan", placed: 12, target: 20 },
  { name: "Feb", placed: 18, target: 20 },
  { name: "Mar", placed: 25, target: 30 },
  { name: "Apr", placed: 32, target: 35 },
  { name: "May", placed: 40, target: 45 },
]

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navigation currentPage="stats" userName="Admin User" userRole="admin" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
          <p className="text-xl text-muted-foreground">Placement trends and performance metrics</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border-2 border-border rounded-2xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Placed</p>
            <p className="text-4xl font-black">127</p>
            <div className="mt-4 flex items-center gap-2 text-secondary font-bold">
              <TrendingUp className="h-4 w-4" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Average Package</p>
            <p className="text-4xl font-black">8.4 LPA</p>
            <p className="mt-4 text-muted-foreground font-medium">Top offer: 42 LPA</p>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
              <Activity className="h-6 w-6 text-secondary" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Placement Rate</p>
            <p className="text-4xl font-black">74.2%</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[74%]" />
            </div>
          </div>
        </div>

        <section className="bg-white border-2 border-border rounded-3xl p-10 shadow-sm">
          <h3 className="text-2xl font-bold mb-8">Placement Growth (2024)</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "16px", border: "2px solid #e5e5e5", boxShadow: "none" }}
                  cursor={{ fill: "#FFD608", opacity: 0.1 }}
                />
                <Bar dataKey="placed" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FFD608" : "#0B8A0E"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  )
}
