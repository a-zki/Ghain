import { Spinner } from '@/components/ui/Spinner'

export default function GlobalLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] gap-4">
      <Spinner size="lg" />
      <p className="text-sm text-neutral-500">Loading...</p>
    </div>
  )
}
