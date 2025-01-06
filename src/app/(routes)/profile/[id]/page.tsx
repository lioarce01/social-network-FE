import React from "react";
import ProfilePage from "@/components/profile/profilePage";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);

  return (
    <div className="container mx-auto py-8">
      <ProfilePage userId={resolvedParams.id} />
    </div>
  );
}
