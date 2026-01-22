// app/edit/[resumeId]/page.tsx
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { resume } from "@/db/schema";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";

export default async function EditPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  console.log("🔍 Loading resume:", resumeId);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    console.log("❌ Unauthorized");
    redirect("/login");
  }

  const [resumeData] = await db
    .select()
    .from(resume)
    .where(and(eq(resume.id, resumeId), eq(resume.userId, session.user.id)));

  if (!resumeData) {
    console.log("❌ Resume not found");
    notFound();
  }

  console.log("✅ Resume loaded:", resumeData.id);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resume Editor
          </h1>
          <p className="text-gray-600">
            Editing: <span className="font-semibold">{resumeData.title}</span>
          </p>
        </div>

        {/* Resume Details */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            Resume Details
          </h2>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">ID:</span>
              <span className="text-gray-600 font-mono text-sm">
                {resumeData.id}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Title:</span>
              <span className="text-gray-900">{resumeData.title}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">
                Template:
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {resumeData.template}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Created:</span>
              <span className="text-gray-600">
                {new Date(resumeData.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Updated:</span>
              <span className="text-gray-600">
                {new Date(resumeData.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            Resume Content (JSON)
          </h2>
          <pre className="text-xs overflow-auto bg-gray-100 p-4 rounded-lg max-h-96 border border-gray-200">
            {JSON.stringify(resumeData.content, null, 2)}
          </pre>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                How It Works
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                This page loads your resume from the database using the ID from
                the URL. The <strong>template</strong> field determines which
                preview component to show.
              </p>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <code className="text-xs text-gray-800">
                  {`if (resumeData.template === "jake-ryan") {
  return <JakeRyanResume data={resumeData.content} />
}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <h3 className="text-lg font-bold text-green-900">
                Page Working Successfully!
              </h3>
              <p className="text-sm text-green-800 mt-1">
                Your edit page is now loading data from the database. Next step:
                Build the editor component with forms and live preview!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
