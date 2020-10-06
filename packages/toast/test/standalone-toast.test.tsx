import React, { useEffect } from "react"
import { render, screen } from "@chakra-ui/test-utils"
import { createStandaloneToast } from "../src"
import theme from "@chakra-ui/theme"

test("Standalone toast renders correctly", async () => {
  const toast = createStandaloneToast(theme)
  const title = "Yay!"
  const description = "Something awesome happened"

  const ToastContainer = () => {
    useEffect(() => {
      toast({
        title,
        description,
        duration: 4000,
        isClosable: true,
      })
    }, [])

    return null
  }

  render(<ToastContainer />)

  const allByTitle = await screen.findAllByText(title)
  const allByDescription = await screen.findAllByText(description)

  expect(allByTitle).toHaveLength(1)
  expect(allByDescription).toHaveLength(1)
})
