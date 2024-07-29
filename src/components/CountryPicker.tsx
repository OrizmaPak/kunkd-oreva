import { Button, Group, Menu } from "@mantine/core";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Countries } from "@/utils/constants";
import { TCountry } from "@/api/types";

type CountryPickerProps = {
  onSelect?: (option: TCountry) => void;
  selected?: TCountry;
};

const CountryPicker = ({
  onSelect,
  selected: defaultSelected,
}: CountryPickerProps) => {
  const [search, setSearch] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<TCountry | null>(
    () => defaultSelected ?? null
  );

  const handleOptionSelect = (option: TCountry) => {
    setSelectedItem(option);
    if (onSelect) onSelect(option);
  };

  const selectedOption = selectedItem ?? Countries[0];

  const options = Countries.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase().trim())
  ).map((item) => (
    <Menu.Item
      color="red"
      // active={item.alpha2Code === selectedItem?.alpha2Code}
      value={item.alpha2Code}
      key={item.alpha2Code}
    >
      <Group>
        <img src={item.flags.svg} className="w-5" alt={item.name} />
        {item.name}
      </Group>
    </Menu.Item>
  ));

  const onCountSelect = (val: string) => {
    const selected = Countries?.find((el) => el.alpha2Code === val);
    if (selected) handleOptionSelect(selected);
  };
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant="transparent"
            fullWidth
            px="0px"
            className="flex gap-2 !outline-none border-2 border-red-700 "
            leftIcon={<IoIosArrowDown />}
          >
            <span className="flex gap-1 text-[#B8B8B8] font-mono">
              <img
                src={selectedOption?.flags?.svg}
                className="w-5 hidden md:block"
                alt={selectedOption.name}
              />
              +{selectedOption?.callingCodes?.[0]}
            </span>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>{options}</Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CountryPicker;
