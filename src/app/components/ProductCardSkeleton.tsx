export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-[20px] border border-[#ececec] bg-white p-4">
      <div className="mb-4 aspect-square rounded-2xl bg-[#f1f1f1]" />
      <div className="mb-2 h-6 w-2/3 rounded bg-[#f1f1f1]" />
      <div className="mb-4 h-4 w-full rounded bg-[#f1f1f1]" />
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/3 rounded bg-[#f1f1f1]" />
        <div className="h-8 w-24 rounded-full bg-[#f1f1f1]" />
      </div>
    </div>
  )
}
