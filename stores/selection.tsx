import { create } from "zustand";

interface SelectionState {
  prompt: string;
  text: string;
  blockStartIdx: number;
  blockMovingIdx: number;
  indices: number[];
  annotations: any;
  setIndices: (number) => void;
  setBlockStartIdx: (number) => void;
  setBlockMovingIdx: (number) => void;
  addAnnotation: (any) => void;
  deleteAnnotation: (number) => void;
  resetSelection: () => void;
}

const initialState = {
  blockStartIdx: -1,
  blockMovingIdx: -1,
  indices: [],
};

export const useSelectionStore = create<SelectionState>()((set) => ({
  //   text: "Fleshers used to spin fantasies about aliens arriving to ‘conquer’ Earth, to steal their ‘precious’ physical resources, to wipe them out for fear of ‘competition’…as if a species capable of making the journey wouldn’t have had the power, or the wit, or the imagination, to rid itself of obsolete biological imperatives. Conquering the Galaxy is what bacteria with spaceships would do – knowing no better, having no choice.",
  prompt: `Can you write a short sci-fi paragraph about 'travel on an advanced alien planet' in style of Greg Egan?`,
  text: `On the advanced alien planet, travel was a dizzying affair, unlike anything the human explorers had ever experienced. The locals had developed a network of portals that could transport beings from one location to another instantaneously. The portals were powered by exotic energy sources that hummed with a strange, almost musical energy. Stepping through a portal was like diving headfirst into a kaleidoscope of colors and sensations, as space-time twisted and contorted around the traveler. The humans could only marvel at the advanced technology that allowed the aliens to traverse their world with such ease, and wondered what other secrets the planet held.`,
  blockStartIdx: -1,
  blockMovingIdx: -1,
  indices: [],
  annotations: [],
  setBlockStartIdx: (val) => {
    set((state) => ({ blockStartIdx: val }));
  },
  setBlockMovingIdx: (val) => {
    set((state) => {
      let _indices = [];
      Array.from({ length: val - state.blockStartIdx }).forEach((__, idx) => {
        _indices.push(idx + state.blockStartIdx);
      });
      return { blockMovingIdx: val, indices: [..._indices] };
    });
  },
  setIndices: (val) => {
    set((state) => {
      let _indices = [...state.indices];
      let isIndexSelected = _indices.find((i) => i == val);
      if (isIndexSelected) {
        _indices = _indices.filter((i) => i != val);
      } else {
        _indices.push(val);
      }
      return { indices: _indices };
    });
  },
  addAnnotation: (val) => {
    set((state) => ({ annotations: [...state.annotations, val] }));
  },
  deleteAnnotation: (val) => {
    set((state) => ({
      annotations: state.annotations.filter((a, idx) => idx != val),
    }));
  },
  resetSelection: () => {
    set((state) => ({ ...initialState }));
  },
}));

// {
//     tag: {
//         label: "Positive",
//         instruction: "more of this.",
//         color: "#37bc9b",
//       },
//       indices : []

// }
