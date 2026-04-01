export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-[30px] bg-[#f3f3f3] p-4 shadow-[0px_14px_30px_0px_rgba(26,18,38,0.08)]">
      <div className="mb-4 aspect-square rounded-[22px] bg-[#e8e8e8]" />
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="h-7 w-2/3 rounded bg-[#e5e5e5]" />
        <div className="h-6 w-14 rounded bg-[#e5e5e5]" />
      </div>
      <div className="mb-5 h-3 w-1/2 rounded bg-[#e5e5e5]" />
      <div className="rounded-full bg-[#ead6ff] px-[7px] py-[5px]">
        <div className="flex items-center justify-between">
          <div className="h-8 w-8 rounded-full bg-[#e5cdfd]" />
          <div className="h-5 w-5 rounded bg-[#e5e5e5]" />
          <div className="h-8 w-8 rounded-full bg-[#d9b8ff]" />
        </div>
      </div>
    </div>
  )
}
