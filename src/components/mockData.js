import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: "New Tasks",
    tasks: [
      {
        id: uuidv4(),
        title: "Organize storage",
      },
      {
        id: uuidv4(),
        title: "Sift flour",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Started",
    tasks: [
      {
        id: uuidv4(),
        title: "Dice 1000 onions",
      },
      {
        id: uuidv4(),
        title: "Deep clean the freezer",
      },
      {
        id: uuidv4(),
        title: "Boil water",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Active",
    tasks: [
      {
        id: uuidv4(),
        title: "Grill Scraping",
      },
      {
        id: uuidv4(),
        title: "Floor Scrubbing",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Complete",
    tasks: [
      {
        id: uuidv4(),
        title: "Make the Kanban Board",
      },
    ],
  },

    {   
        id: uuidv4(),
        title: "Delete",
        tasks: [
            {
                id: uuidv4(),
                title: "Delete the Kanban Board",
            },
        ],
    },


];

export default mockData;
