
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../_components/TemplateList";
//import CopyButton from "../_components/CopyButton"; // You'll need to make this a client component

export interface HISTORY {
  id: number;
  FormData: string;
  aiResponse: string| null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

export default async function History() {
  const user = await currentUser();

  if (!user) return <div className="p-8">Please log in to view your history.</div>;

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? ""))
    .orderBy(desc(AIOutput.id));

  const GetTemplateName = (slug: string): TEMPLATE | undefined =>
    Templates.find((item) => item.slug === slug);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="grid grid-cols-5 font-semibold border-b pb-2 mb-2">
        <span>Template</span>
        <span>AI Response</span>
        <span>Data</span>
        <span>Words</span>
        <span>Copy</span>
      </div>

      <div className="max-h-[600px] overflow-y-auto space-y-2">
        {HistoryList.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 border-b py-2 items-center text-sm"
          >
            <span>{GetTemplateName(item.templateSlug)?.name ?? item.templateSlug}</span>
            <span className="truncate">{item.aiResponse?.slice(0, 50)}...</span>
            <span className="truncate">{JSON.stringify(item.FormData)?.slice(0, 50)}...</span>
            <span>{item.aiResponse?.split(" ").length}</span>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => navigator.clipboard.writeText(item.aiResponse ?? "")}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

