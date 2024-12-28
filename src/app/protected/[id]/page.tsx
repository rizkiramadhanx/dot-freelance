import DetailPage from "./_components/detail-page";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <DetailPage id={id} />;
}