import { React, useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  Grid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import mockData from "./mockData";
import KanbanCard from "./KanbanCard";


const Kanban = () => {
  const [data, setData] = useState(mockData);
  const [input, setInput] = useState("");

  const saveDataToLocalStorage = () => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  };

  const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem("kanban-data");
    data ? setData(JSON.parse(data)) : setData(mockData);
  };

  const addNewTask = (e) => {
    e.preventDefault();

    if (!input) {
      return;
    } else {
      const newTask = {
        id: uuidv4(),
        title: input,
      };
      const newTaskList = [...data[0].tasks, newTask];
      const newData = [...data];
      newData[0].tasks = newTaskList;
      setData(newData);
      saveDataToLocalStorage();
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
      saveDataToLocalStorage();
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [input]);

  return (
    <Flex
      bg='gray.800'
      direction='column'
      minH='100vh'
      h='fit-content'
      w='100vw'>
      <Heading as='h2' fontSize='3xl' color='gray.100' px='4' py='1'>
        Kanban Board
      </Heading>
      <Text color='gray.100' fontSize='sm' px='4' py='1'>
        Tasks are saved to LocalStorage
      </Text>

      {/* Make component for form */}
      <Flex
        as='form'
        onSubmit={addNewTask}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        bg='blue.800'
        p='4'
        gap='2'>
        <FormControl id='task'>
          <Input
            type='text'
            value={input}
            onChange={handleInputChange}
            placeholder='Add a new task'
            color='gray.100'
          />
        </FormControl>
        <Button type='submit' colorScheme='green' leftIcon={<AddIcon />}>
          Add Task
        </Button>
      </Flex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          p='4'
          gap='4'
          gridTemplateColumns={[
            "1fr",
            "1fr 1fr",
            "1fr 1fr 1fr 1fr 1fr",
            "1fr 1fr 1fr 1fr 1fr",
          ]}>
          {data.map((col) => (
            <Box
              key={col.id}
              h='fit-content'
              p='2'
              bg='gray.600'
              color='gray.100'
              borderRadius='16px'
              boxShadow='0 0 10px rgba(0,0,0,0.1)'>
              <Heading as='h3' size='md' mb='4'>
                {col.title}
              </Heading>

              <Droppable droppableId={col.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    bg='green.500'
                    p='2'
                    borderRadius='16px'>
                    {col.tasks.map((task, index) => (
                      //Seperate col.tasks.map() to a function
                      //Move draggable code to KanbanCard component
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            borderRadius='16'
                            bg='gray.800'
                            color='gray.100'
                            px='4'
                            py='2'
                            mb='2'
                            boxShadow='md'
                            userSelect={"none"}
                            _hover={{
                              bg: "blue.600",
                            }}>
                            <KanbanCard
                              title={task.title}
                              id={task.id}
                              task={task}
                            />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Grid>
      </DragDropContext>
    </Flex>
  );
};

export default Kanban;
