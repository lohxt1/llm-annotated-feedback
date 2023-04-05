import create from "zustand";

type TagType = {
  label: string;
  instruction: string;
  color: string;
};

interface FeedbackState {
  tag: TagType;
  tags: TagType[];
  annotations: any;
  setTag: (string) => void;
  addTag: (TagType) => void;
  deleteTag: (number) => void;
  addAnnotation: (any) => void;
  deleteAnnotation: (number) => void;
}

export const useFeedbackStore = create<FeedbackState>()((set) => ({
  tag: {
    label: "Positive",
    instruction: "more of this.",
    color: "#37bc9b",
  },
  tags: [
    {
      label: "Positive",
      instruction: "I want to see more of this.",
      color: "#37bc9b",
    },
    {
      label: "Neutral",
      instruction: "Doesn't matter.",
      color: "#05f",
    },
    {
      label: "Negative",
      instruction: "I want to see less of this.",
      color: "#e9573f",
    },
  ],
  annotations: [],
  setTag: (val) => {
    set((state) => ({ tag: state.tags.find((_) => _?.label == val) }));
  },
  addTag: (val) => {
    set((state) => ({ tags: [val, ...state.tags] }));
  },
  deleteTag: (val) => {
    set((state) => ({ tags: state.tags.filter((_, idx) => idx != val) }));
  },
  addAnnotation: (val) => {
    set((state) => ({ annotations: [...state.annotations, val] }));
  },
  deleteAnnotation: (val) => {
    set((state) => ({
      annotations: state.annotations.filter((a, idx) => idx != val),
    }));
  },
}));
