import PrivateLayoutContainer from "@/components/LayoutProvider/PrivateLayout";
import React from "react";

export default function PrivateLay({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayoutContainer>{children}</PrivateLayoutContainer>;
}
