import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  BaseSlider,
  BaseSliderTrack,
  BaseSliderThumb,
  BaseSliderMark,
  BaseSliderFilledTrack,
} from "./Slider";
import { chakra, createChakra } from "@chakra-ui/system";

const stories = storiesOf("Slider", module);

stories.addDecorator(story => (
  <chakra.div maxWidth="800px" mx="auto" mt="40px">
    {story()}
  </chakra.div>
));

function HorizontalSlider() {
  return (
    <BaseSlider defaultValue={40} style={{ height: 4 }}>
      <BaseSliderTrack
        style={{
          height: "inherit",
          background: "#e2e2e2",
          borderRadius: 4,
        }}
      />
      <BaseSliderFilledTrack
        style={{ background: "tomato", height: "inherit" }}
      />
      <BaseSliderThumb
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          background: "white",
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 4px",
          transform: "translateY(-50%)",
          top: "50%",
        }}
      />
      <BaseSliderMark
        value={90}
        children="90%"
        style={{ top: 40, pointerEvents: "none" }}
      />
    </BaseSlider>
  );
}

function VerticalSlider() {
  return (
    <BaseSlider
      orientation="vertical"
      defaultValue={40}
      style={{ width: 4, height: 400 }}
    >
      <BaseSliderTrack style={{ width: "inherit", background: "#e2e2e2" }} />
      <BaseSliderFilledTrack
        style={{ background: "tomato", width: "inherit" }}
      />
      <BaseSliderThumb
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          background: "white",
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 4px",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      />
      <BaseSliderMark
        value={90}
        children="90%"
        style={{ left: 40, pointerEvents: "none" }}
      />
    </BaseSlider>
  );
}

stories.add("horizontal", () => <HorizontalSlider />);

stories.add("vertical", () => <VerticalSlider />);

const Slider = createChakra(BaseSlider, { themeKey: "Slider.Root" });
const SliderTrack = createChakra(BaseSliderTrack, { themeKey: "Slider.Track" });
const SliderFilledTrack = createChakra(BaseSliderFilledTrack, {
  themeKey: "Slider.FilledTrack",
});
const SliderThumb = createChakra(BaseSliderThumb, {
  themeKey: "Slider.Thumb",
});

const size = "md";

function ChakraHorizontalSlider() {
  return (
    <Slider defaultValue={40}>
      <SliderTrack variantSize={size} />
      <SliderFilledTrack variantSize={size} variantColor="blue" />
      <SliderThumb variantSize={size} children="#" size="30px" color="black" />
    </Slider>
  );
}

stories.add("chakra - horizontal", () => <ChakraHorizontalSlider />);
