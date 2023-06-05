// 1. Create a component that consumes the `useRadio`
import {
  HStack,
  Radio,
  Box,
  useRadioGroup,
  useRadio,
  UseRadioProps,
} from "@chakra-ui/react";
function RadioCard(props: UseRadioProps & { children: React.ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        fontWeight="600"
        _checked={{
          color: "#8530C1",
        }}
        px={2}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function DateRadio({ onChange }: { onChange: (value: string) => void }) {
  const options = ["D", "W", "M", "Y"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "date",
    defaultValue: "D",
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default DateRadio;
