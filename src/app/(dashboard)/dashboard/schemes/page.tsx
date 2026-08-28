import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import SchemesClient from "./SchemesClient";
import { GraduationCap, Briefcase, Home } from "lucide-react";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const schemesData = await prisma.scheme.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedSchemes = schemesData.map((s, idx) => {
    let icon = <GraduationCap className="w-6 h-6 text-blue-600" />;
    let bg = "bg-blue-50";

    if (idx % 3 === 1) {
      icon = <Briefcase className="w-6 h-6 text-purple-600" />;
      bg = "bg-purple-50";
    } else if (idx % 3 === 2) {
      icon = <Home className="w-6 h-6 text-green-600" />;
      bg = "bg-green-50";
    }

    return {
      title: s.name,
      description: s.description || "Government Scheme",
      icon,
      bg
    };
  });

  return <SchemesClient initialSchemes={formattedSchemes} />;
}
