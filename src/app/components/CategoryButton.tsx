interface CategoryButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export const CategoryButton = ({ label, isActive, onClick }: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-[25px] py-[10px] text-[16px] leading-6 transition-all duration-300 ${
        isActive
          ? 'bg-[#dcbeff] text-[#2d2f2f] font-semibold shadow-[0px_8px_20px_rgba(45,47,47,0.08)] hover:bg-[#c9a9f2]'
          : 'bg-white border border-[#e1e3e3] text-[#5a5c5c] font-medium hover:border-neutral-300 hover:text-[#2d2f2f] hover:shadow-sm'
      }`}
    >
      {label}
    </button>
  )
}
