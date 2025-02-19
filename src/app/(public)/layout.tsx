import PublicLayoutContainer from "@/components/LayoutProvider/PublicLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutContainer>{children}</PublicLayoutContainer>;
}
