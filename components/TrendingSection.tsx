"use client"

import { type FC, type MouseEvent, type TouchEvent, useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

const ethIcon = "/logo/ethereum-logo.svg"

const collections = [
  { id: 1, name: "Daki Da", image: "/nft-collection/DakiDa.svg", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
  {
    id: 2,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 3,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus2.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 4,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus3.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 5,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus4.jpeg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
]

const TrendingSection: FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Create a triple set of items to ensure smooth looping
  const displayItems = [...collections, ...collections, ...collections]

  // Initialize scroll position to the middle set
  // useEffect(() => {
  //   if (carouselRef.current) {
  //     // Scroll to the middle set of items without animation
  //     const scrollToMiddle = () => {
  //       const itemWidth = 300 // Approximate width of each item including gap
  //       const middlePosition = collections.length * itemWidth
  //       carouselRef.current!.scrollLeft = middlePosition
  //     }

  //     scrollToMiddle()
  //   }
  // }, [])

  // Handle infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current || isTransitioning) return

      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const itemWidth = 300 // Approximate width of each item including gap
      const totalItems = collections.length

      // If we're near the end, jump to the middle set
      if (scrollLeft + clientWidth >= scrollWidth - itemWidth) {
        setIsTransitioning(true)
        // Wait a bit to ensure the scroll animation completes
        setTimeout(() => {
          if (carouselRef.current) {
            carouselRef.current.style.scrollBehavior = "auto"
            carouselRef.current.scrollLeft = totalItems * itemWidth
            carouselRef.current.style.scrollBehavior = "smooth"
            setIsTransitioning(false)
          }
        }, 100)
      }

    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isTransitioning])

  const startDragging = useCallback((e: MouseEvent | TouchEvent) => {
    setIsDragging(true)
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }, [])

  const stopDragging = useCallback(() => setIsDragging(false), [])

  const onDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX
      const walk = (pageX - startX) * 2
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = scrollLeft - walk
      }
    },
    [isDragging, startX, scrollLeft],
  )

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current && !isTransitioning) {
      const scrollAmount = direction === "left" ? -300 : 300
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isTransitioning && !isDragging) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isTransitioning, isDragging])

  return (
    <div className="relative py-8 px-8">
      <div className="w-full flex items-center justify-between flex-row mb-9">
        <h1 className="text-[22px] font-bold leading-6 text-white mb-6">Trending in Gaming</h1>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-[#FFFFFF33] p-2 w-12 h-12 rounded-lg text-white hover:bg-[#FFFFFF44]"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-[#FFFFFF33] p-2 w-12 h-12 rounded-lg text-white hover:bg-[#FFFFFF44]"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <motion.div
        ref={carouselRef}
        className="overflow-x-scroll scrollbar-hide flex gap-4 py-4 px-4"
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDrag}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayItems.map((collection, index) => (
          <motion.div key={`${collection.id}-${index}`} className="flex-none w-[243px] md:w-[300px] hover:scale-[1.02]">
            <div className="bg-[#FFFFFF1A] w-[241px] h-[276px] md:w-[298px] md:h-[336px] cursor-grab active:cursor-grabbing rounded-xl overflow-hidden">
              <div className="w-full h-[66%] relative">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm md:text-lg mb-3">{collection.name}</h3>
                <div className="flex items-center w-full gap-[41px]">
                  <div>
                    <p className="text-[#FFFFFF99] text-xs md:text-sm font-medium mb-1">Floor Price</p>
                    <div className="flex flex-row items-center gap-2">
                      <Image src={ethIcon || "/placeholder.svg"} alt="ethereum" width={17} height={17} />
                      <p className="text-white text-xs md:text-sm font-medium">{collection.floorPrice}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#FFFFFF99] text-xs md:text-sm font-medium mb-1">Total Volume</p>
                    <div className="flex flex-row items-center gap-2">
                      <Image src={ethIcon || "/placeholder.svg"} alt="ethereum" width={17} height={17} />
                      <p className="text-white text-xs md:text-sm font-medium">{collection.totalVolume}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default TrendingSection

