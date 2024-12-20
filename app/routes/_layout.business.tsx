import {createFileRoute, Outlet} from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/business")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
