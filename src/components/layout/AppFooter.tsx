import { Flex, Footer, Group, Header, Text } from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

const AppFooter = () => {
  return (
    <Footer height={48} p="sm">
      <Flex justify="space-between" align="center" direction="row">
        <Text size="sm">Papantla © 2023</Text>
        <Text size="sm">Creado por Frutero Club</Text>
        <Group position="apart">
          <IconBrandTwitter size={24} strokeWidth={0.5} color={"black"} />
          <IconBrandDiscord size={24} strokeWidth={0.5} color={"black"} />
          <IconBrandInstagram size={24} strokeWidth={0.5} color={"black"} />
        </Group>
      </Flex>
    </Footer>
  );
};

export default AppFooter;
