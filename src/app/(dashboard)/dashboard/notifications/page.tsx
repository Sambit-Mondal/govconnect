import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import NotificationsClient from "./NotificationsClient";
import { CheckCircle2, Clock, AlertTriangle, GraduationCap, FileText, Files, CreditCard } from "lucide-react";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const notifications = await prisma.notification.findMany({
    where: { user_id: session.userId },
    orderBy: { created_at: 'desc' }
  });

  const formattedNotifications = notifications.map(n => {
    let type = "Alerts";
    let bg = "bg-blue-100";
    let dot = "bg-blue-500";
    let icon = <AlertTriangle className="w-5 h-5 text-blue-600" />;

    if (n.type === "success") {
      type = "Applications";
      bg = "bg-green-100";
      dot = "bg-green-500";
      icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
    } else if (n.type === "warning") {
      type = "Payments";
      bg = "bg-orange-100";
      dot = "bg-orange-500";
      icon = <Clock className="w-5 h-5 text-orange-600" />;
    } else if (n.type === "error") {
      type = "Alerts";
      bg = "bg-red-100";
      dot = "bg-red-500";
      icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
    }

    return {
      id: n.id,
      type,
      title: n.title,
      message: n.message,
      time: new Date(n.created_at || new Date()).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      icon,
      bg,
      dot
    };
  });

  return <NotificationsClient initialNotifications={formattedNotifications} userId={session.userId} />;
}
