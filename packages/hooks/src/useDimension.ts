import * as React from "react"
import { getBox, BoxModel } from "@chakra-ui/utils"
import useIsomorphicEffect from "./useIsomorphicEffect"

export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  observe?: boolean,
) {
  const [dimensions, setDimensions] = React.useState<BoxModel | null>(null)
  const rafId = React.useRef<number>()

  useIsomorphicEffect(() => {
    if (!ref.current) return

    const node = ref.current

    function measure() {
      rafId.current = requestAnimationFrame(() => {
        const boxModel = getBox(node)
        setDimensions(boxModel)
      })
    }

    measure()

    if (observe) {
      window.addEventListener("resize", measure)
      window.addEventListener("scroll", measure)

      return () => {
        rafId.current && cancelAnimationFrame(rafId.current)
        window.removeEventListener("resize", measure)
        window.removeEventListener("scroll", measure)
      }
    }

    return () => {
      rafId.current && cancelAnimationFrame(rafId.current)
    }
  }, [ref, observe])

  return dimensions
}

export default useDimensions
