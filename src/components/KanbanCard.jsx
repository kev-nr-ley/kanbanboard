import React from "react";
import { Box, Flex, Heading, Text, Input, Button } from "@chakra-ui/react";

const KanbanCard = (props) => {
  //Move all code from Kanban Draggable here
  return <Box>{props.task.title}</Box>;
};

export default KanbanCard;
