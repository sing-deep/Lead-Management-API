"use client";

import { useEffect, useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

type Lead = {
  _id: string;
  name: string;
  email: string;
  status: string;
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const fetchLeads = async () => {
    const res = await fetch("http://localhost:5000/api/v1/leads");
    const data = await res.json();
    console.log("data", data)
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleNewLead = (newLead: Lead) => {
  setLeads((prev) => [newLead, ...prev]);
};

  return (
    <div className="flex flex-col gap-7 p-16">
      <h1 className="font-bold text-2xl">Lead Management</h1>

      <LeadForm onLeadCreated={handleNewLead} />
      <LeadList leads={leads} />
    </div>
  );
}