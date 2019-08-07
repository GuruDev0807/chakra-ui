import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Accordion from "../src/Accordion";
import Avatar, { AvatarGroup } from "../src/Avatar";
import AvatarItem, {
  AvatarSubtext,
  AvatarText,
  AvatarTextGroup
} from "../src/Avatar/AvatarItem";
import Badge from "../src/Badge";
import Icon from "../src/Icon";
import { Box } from "../src/Layout";
import List from "../src/List";
import Progress from "../src/Progress";
import Rating from "../src/Rating";
import {
  StatChangeArrow,
  StatGroup,
  StatHelpText,
  StatItem,
  StatLabel,
  StatNumber
} from "../src/Stat";
import Tag from "../src/Tag";

const stories = storiesOf("Data Display", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Badge", () => {
  return (
    <React.Fragment>
      {["purple", "green", "red", "orange", "gray", "cyan"].map(color => (
        <React.Fragment>
          <Badge color={color} mr={2}>
            {color}
          </Badge>
          <Badge color={color} variant="solid" mr={2}>
            {color}
          </Badge>
          <Badge color={color} variant="outline">
            {color}
          </Badge>
          <div />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
});

stories.add("Avatar Group", () => (
  <AvatarGroup size="md">
    <Avatar
      name="Segun Adebayo"
      src="https://zeit.co/api/www/avatar/?u=rauchg&s=60"
    />
    <Avatar
      name="Kola Tiolu"
      // src="https://zeit.co/api/www/avatar/?u=leo&s=60"
    />
    {/* <MoreIndicator label="+4" /> */}
  </AvatarGroup>
));

stories.add("Avatar Item", () => (
  <AvatarItem>
    <Avatar
      name="sage"
      size="md"
      src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
    />
    <AvatarTextGroup fontSize="md">
      <AvatarText fontWeight="semibold" display="inline-block">
        Segun Adebayo
      </AvatarText>
      <Badge fontSize="xs" ml={1} color="green">
        New
      </Badge>
      <AvatarSubtext>segun@gmail.com</AvatarSubtext>
    </AvatarTextGroup>
  </AvatarItem>
));

stories.add("Avatars", () => (
  <>
    {["sm", "md", "lg", "xl", "xxl"].map(size => (
      <Avatar
        size={size}
        name="Evil Rabbit"
        badge={<Box borderRadius="round" size="100%" bg="green.500" />}
        // size="fill"
        src="https://zeit.co/api/www/avatar/?u=rauchg&s=60"
      />
    ))}
  </>
));

stories.add("Rating", () => <Rating />);

stories.add("Tags", () => {
  return (
    <List spacing={4}>
      <Tag
        fontWeight="semibold"
        isRound
        color="cyan"
        leftElement={<Icon name="add" size="12px" />}
      >
        Green
      </Tag>
      <Tag
        fontWeight="semibold"
        isRound
        variant="solid"
        color="cyan"
        isClosable
      >
        Green
      </Tag>
      <Tag
        color="red"
        isRound
        isClosable
        leftElement={
          <Avatar
            src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
            size="xs"
          />
        }
      >
        Segun
      </Tag>
      <Tag isClosable color="gray">
        Gray
      </Tag>
      <Tag color="pink">Pink</Tag>
      <Tag color="blue">Blue</Tag>
    </List>
  );
});

// stories.add("Tags + Multiline", () => {
//   return (
//     <React.Fragment>
//       <Tag isClosable>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus
//         nunc magna, non congue mauris vulputate sit amet. Fusce imperdiet eget
//         mauris non finibus. Praesent eget ligula nec metus tincidunt hendrerit.
//         Aenean eget gravida urna. Cras laoreet, ipsum vel condimentum tincidunt,
//         orci dolor pellentesque urna, id laoreet orci orci vitae dui. Nam diam
//         est, mattis id hendrerit eu, lobortis congue odio.
//       </Tag>
//       <Text lineHeight="tall">
//         Lorem ipsum dolor sit
//         <Tag inline>amet</Tag>, consectetur adipiscing elit. Fusce a dolor sit
//         amet leo semper finibus eget id lorem. Pellentesque in
//         <Tag inline color="green">
//           tristique
//         </Tag>
//         augue. Vestibulum et leo dolor. Sed fermentum mollis tincidunt. In
//         malesuada vitae dolor a vehicula.
//         <Tag inline color="cyan">
//           Praesent
//         </Tag>
//         porta dignissim vehicula.
//       </Text>
//     </React.Fragment>
//   );
// });

stories.add("Stat Display", () => {
  return (
    <StatItem>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>£0.00</StatNumber>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
    </StatItem>
  );
});

stories.add("Stat Display with Indicators", () => {
  return (
    <StatGroup>
      <StatItem>
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatChangeArrow type="increase" />
          23.36%
        </StatHelpText>
      </StatItem>

      <StatItem>
        <StatLabel>Clicked</StatLabel>
        <StatNumber>45</StatNumber>
        <StatHelpText>
          <StatChangeArrow type="decrease" />
          9.05%
        </StatHelpText>
      </StatItem>
    </StatGroup>
  );
});

stories.add("Accordion", () => {
  return (
    <Accordion title="Curious what lorem ipsum text is?" defaultOpen>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum
      </p>
    </Accordion>
  );
});

stories.add("Progress", () => {
  return (
    <Box maxWidth="400px" mx="auto" mt={8} p={3}>
      <Progress
        borderRadius="round"
        size="sm"
        color="green"
        value={63}
        hasStripe
        isAnimated
      />
      <br />
      <Progress size="sm" color="cyan" value={34} borderRadius="round" />
      <br />
    </Box>
  );
});

// stories.add("Steps", () => {
//   return (
//     <React.Fragment>
//       <Steps
//         mx="auto"
//         mt={8}
//         variant={select("variant", ["dot", "number"], "dot")}
//         size="small"
//         titleMargin={number("Title Margin", 1)}
//         activeIndex={number("Active Index", 1)}
//       >
//         {[
//           "Contact Info",
//           "Career Profile",
//           "Education",
//           "Experience",
//           "Skills"
//         ].map(step => (
//           <Step title={step} />
//         ))}
//       </Steps>

//       <Steps
//         mx="auto"
//         direction="vertical"
//         variant="dot"
//         mt={8}
//         titleMargin={7}
//       >
//         <Step title="Select Theme" />
//         <Step title="Choose Website" />
//         <Step title="Pay" />
//         <Step title="Become a Boss" />
//       </Steps>
//     </React.Fragment>
//   );
// });
