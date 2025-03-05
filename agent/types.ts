import { MessagesAnnotation, Annotation } from "@langchain/langgraph";
import { uiMessageReducer } from "@langchain/langgraph-sdk/react-ui/types";

export const GenerativeUIAnnotation = Annotation.Root({
  messages: MessagesAnnotation.spec["messages"],
  ui: Annotation({ default: () => [], reducer: uiMessageReducer }),
  timestamp: Annotation<number>,
  next: Annotation<"stockbroker" | "tripPlanner" | "generalInput">(),
});

export type GenerativeUIState = typeof GenerativeUIAnnotation.State;

export type Accommodation = {
  id: string;
  name: string;
  price: number;
  rating: number;
  city: string;
  image: string;
};
