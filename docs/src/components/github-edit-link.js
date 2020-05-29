import * as React from "react"
import { chakra, Box, Stack, Link } from "@chakra-ui/core"
import { DiGithubBadge } from "react-icons/di"
import { graphql, useStaticQuery } from "gatsby"

export const GithubLink = ({ path }) => {
  const {
    site: {
      siteMetadata: { repository },
    },
  } = useStaticQuery(graphql`
    query REPOSITORY_QUERY {
      site {
        siteMetadata {
          repository
        }
      }
    }
  `)

  if (!repository || !path) {
    return null
  }

  const href = `${repository}/blob/master${path}`
  return (
    <Stack
      as={Link}
      direction="row"
      spacing={1}
      href={href}
      isExternal
      alignItems="center"
    >
      <Box as={DiGithubBadge} boxSize="32px" />
      <chakra.span>Edit this page on GitHub</chakra.span>
    </Stack>
  )
}
