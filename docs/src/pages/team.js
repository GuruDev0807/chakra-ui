import * as React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Icon,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  SimpleGrid,
  Link,
  Wrap,
  // Tooltip,
} from "@chakra-ui/core"
import { IoLogoTwitter, IoLogoGithub, IoIosGlobe } from "react-icons/io"
import SEO from "../components/seo"

const SocialLink = ({ icon, href }) => (
  <Link display="inline-block" href={href} isExternal>
    <Icon
      as={icon}
      transition="all 0.2s"
      _hover={{ color: "teal.600" }}
      fontSize="xl"
      color="teal.500"
    />
  </Link>
)

function Member({ member }) {
  const { avatarUrl, bio, name, twitterUsername, url, websiteUrl } = member

  return (
    <Box>
      <Stack direction="row" spacing={6}>
        <Avatar size="xl" src={avatarUrl} />
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="md">
            {name}
          </Text>

          <Stack direction="row" spacing={2} justify="center">
            <SocialLink href={url} icon={IoLogoGithub} />
            {twitterUsername && (
              <SocialLink
                href={`https://twitter.com/${twitterUsername}`}
                icon={IoLogoTwitter}
              />
            )}
            {websiteUrl && <SocialLink href={websiteUrl} icon={IoIosGlobe} />}
          </Stack>
          <Text>{bio}</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

function Contributor({ contributor }) {
  const { login, avatarUrl } = contributor

  return (
    <Box>
      <Link href={`https://github.com/${login}`} isExternal>
        <Avatar size="md" src={avatarUrl} />
      </Link>
      {/* <Tooltip hasArrow label={login} placement="top">
      </Tooltip> */}
    </Box>
  )
}

const sortMembers = (a, b) => {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
}

function Team({ data }) {
  const { github, contributors } = data
  const { nodes: memberNodes } = github.organization.membersWithRole
  const { nodes: contributorNodes } = contributors
  const memberLogins = memberNodes.map(({ login }) => login)
  const contributorsWithoutTeam = contributorNodes.filter(
    ({ login }) => !memberLogins.includes(login),
  )
  const sortedMemberNodes = memberNodes.sort(sortMembers)

  return (
    <>
      <SEO
        title="Chakra UI Team &amp; Contributors"
        description="List of team members and contributors that make the Chakra UI project possible"
        slug="/team"
      />
      <Box py="56px">
        <Box py="80px">
          <Container maxWidth="lg" paddingX="24px">
            <Heading as="h1" size="xl" mb="5">
              Chakra UI Team &amp; Contributors
            </Heading>
            <Text maxW="60ch">
              The people listed on this page have contributed time, effort, and
              thought to Chakra UI. Without them, this project would not be
              possible.
            </Text>
          </Container>
        </Box>
        <Container maxWidth="lg" paddingX="24px">
          <Stack spacing={8}>
            <Heading size="md">Core Team</Heading>
            <SimpleGrid columns={[1, 1, 2]} spacing="40px">
              {sortedMemberNodes.map((member) => (
                <Member key={member.login} member={member} />
              ))}
            </SimpleGrid>
          </Stack>

          <Stack spacing={8} mt="100px">
            <Heading size="md">Project Contributors</Heading>
            <Wrap spacing="3">
              {contributorsWithoutTeam.map((contributor) => (
                <Contributor
                  key={contributor.login}
                  contributor={contributor}
                />
              ))}
            </Wrap>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Team

export const query = graphql`
  query TeamQuery {
    github {
      organization(login: "chakra-ui") {
        membersWithRole(first: 50) {
          nodes {
            avatarUrl
            bio
            login
            name
            twitterUsername
            url
            websiteUrl
          }
        }
      }
    }
    contributors: allChakraContributor {
      nodes {
        login
        avatarUrl
      }
    }
  }
`
