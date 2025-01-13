import React from "react";
import { Suspense } from "react";
import ProfilePage from "@/components/profile/profilePage";
import ProfileSkeleton from "@/components/profile/profileSkeleton";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfilePage userId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}
