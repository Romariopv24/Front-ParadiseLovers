export interface HeroProps {
  titlePrefix: string
  titleGradientLine1: string
  titleGradientLine2: string
  description: string[]
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
}

export const Hero = ({
  titlePrefix,
  titleGradientLine1,
  titleGradientLine2,
  description,
  secondaryAction,
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden ">
      <div className="mx-auto grid w-full  grid-cols-1 items-stretch lg:h-[500px] lg:grid-cols-12">
        <div className="order-2 flex flex-col justify-center gap-6 px-8 py-10 lg:order-1 lg:col-span-6 lg:justify-self-stretch lg:py-0">
          <div>
            <p className="text-[44px] font-extrabold leading-[1.02] tracking-[-0.025em] text-[#cea2fd] sm:text-[54px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.8px]">
              {titlePrefix}
            </p>
            <h1 className="bg-gradient-to-r from-[#cea2fd] to-[#bfdfee] bg-clip-text pb-3 text-[44px] font-extrabold leading-[1.02] tracking-[-0.025em] text-transparent sm:text-[54px] lg:text-[72px] lg:leading-[72px] lg:tracking-[-1.8px]">
              <span className="block">{titleGradientLine1}</span>
              <span className="block">{titleGradientLine2}</span>
            </h1>
          </div>

          <div className="w-full max-w-[512px]">
            <p className="text-[18px] font-normal leading-[29.25px] text-[#5a5c5c]">
              {description.map((line, index) => (
                <span key={`${line}-${index}`} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-4 pt-2">
            {/* <a
              href={primaryAction.href}
              className="inline-flex items-center justify-center rounded-full bg-[#dcbeff] px-8 py-4 text-base font-semibold leading-6 text-black shadow-[0px_20px_40px_0px_rgba(45,47,47,0.06)] transition-colors duration-200 hover:brightness-95"
            >
              {primaryAction.label}
            </a> */}
            <a
              href={secondaryAction.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e0f2fe] px-8 py-4 text-base font-semibold leading-6 text-[#1f5467] transition-colors duration-200 hover:brightness-95"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-4 w-4 fill-current"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 8.012 0C3.66 0 .104 3.556.104 7.908c0 1.391.364 2.748 1.057 3.944L0 16l4.249-1.114a7.93 7.93 0 0 0 3.763.957h.003c4.351 0 7.907-3.556 7.907-7.908a7.86 7.86 0 0 0-2.321-5.609Zm-5.589 12.17h-.003a6.616 6.616 0 0 1-3.368-.92l-.241-.143-2.521.661.673-2.459-.157-.252a6.611 6.611 0 0 1-1.014-3.53c0-3.648 2.968-6.615 6.617-6.615 1.769 0 3.431.689 4.68 1.938a6.57 6.57 0 0 1 1.939 4.679c-.001 3.649-2.969 6.616-6.615 6.616Z" />
                <path d="M11.656 9.829c-.2-.1-1.183-.584-1.366-.65-.182-.067-.315-.1-.448.1-.133.2-.515.65-.632.784-.116.133-.232.15-.432.05-.2-.1-.843-.311-1.606-.993-.593-.529-.994-1.183-1.11-1.383-.116-.2-.012-.308.088-.408.09-.089.2-.233.3-.35.1-.116.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.448-1.083-.614-1.482-.162-.389-.326-.336-.448-.342l-.382-.007a.732.732 0 0 0-.532.25c-.182.2-.697.682-.697 1.665 0 .982.714 1.932.814 2.065.1.133 1.404 2.144 3.401 3.006.475.205.845.328 1.134.42.476.151.909.13 1.251.079.382-.057 1.183-.483 1.35-.95.166-.467.166-.867.116-.95-.05-.083-.183-.133-.383-.233Z" />
              </svg>
              {secondaryAction.label}
            </a>
          </div>
        </div>

        <div className="order-1 hidden md:block lg:order-2 lg:col-span-6">
          <div className="h-[280px] w-full bg-neutral-100 sm:h-[360px] lg:h-full lg:min-h-[500px]">
            {/* TODO: Insertar imagen aquí */}
          </div>
        </div>
      </div>
    </section>
  )
}
