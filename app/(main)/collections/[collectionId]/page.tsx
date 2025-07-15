import CollectionClient from '@/components/collection-page/CollectionClient'

type Props = {
  params: Promise<{ collectionId: string }>
}

export default async function CollectionPage({ params }: Props) {
  const { collectionId } = await params

  return <CollectionClient collectionId={collectionId} />
}
