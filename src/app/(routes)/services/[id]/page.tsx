import React from "react";

export default function ServiceDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = React.use(params);

    return (
        <div className="container mx-auto py-8">
            <h1>Service Detail</h1>
            <p>{resolvedParams.id}</p>
        </div>
    );
}