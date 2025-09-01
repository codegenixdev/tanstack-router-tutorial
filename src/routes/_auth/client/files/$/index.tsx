import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/client/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  const [filepath, setFilepath] = useState(_splat);

  return (
    <>
      <input
        className="input"
        type="text"
        value={filepath}
        onChange={(e) => setFilepath(e.target.value)}
      />
      <Link
        className="button"
        to="/client/files/$"
        params={{ _splat: filepath }}
      >
        Go to file
      </Link>
      {_splat ? (
        <h2 className="title">File: {_splat}</h2>
      ) : (
        <h2 className="title">No file found</h2>
      )}
    </>
  );
}
