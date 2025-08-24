import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/account/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  const [filepath, setFilepath] = useState(_splat);

  return (
    <div>
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        value={filepath}
        onChange={(e) => setFilepath(e.target.value)}
      />
      <Link to="/account/files/$" params={{ _splat: filepath }}>
        Go to file
      </Link>
      {_splat ? <h1>File: {_splat}</h1> : <h1>No file found</h1>}
    </div>
  );
}
