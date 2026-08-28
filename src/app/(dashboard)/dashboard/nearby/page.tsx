import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import NearbyClient from "./NearbyClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const offices = await prisma.governmentOffice.findMany();

  const formattedOffices = offices.map(office => ({
    ...office,
    latitude: office.latitude ? Number(office.latitude) : null,
    longitude: office.longitude ? Number(office.longitude) : null,
  }));

  return <NearbyClient initialOffices={formattedOffices} />;
}
