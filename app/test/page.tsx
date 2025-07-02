import { ActivityTab } from "@/components/activity";

interface ActivityPageProps {
  params: {
    slug: string;
  };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-misty-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-misty-white">
            Collection Activity
          </h1>
          <p className="text-soft-grey">
            Track all transactions for this collection
          </p>
        </div>

        <ActivityTab collectionId={params.slug} isActive={true} />
      </div>
    </div>
  );
}
