import React from "react";
import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { createZustandContext } from "./zustandContext";


type State = {
  generating : boolean
  setGenerating : (generating : boolean) => void
}

const getStore = (
  initialState : {
    generating : boolean
  }
) => {
  return createStore<State>()(
    persist(
      (set) => ({
        generating : initialState.generating,
        setGenerating : (generating) => set({generating}),
      }),
      {name : "imageStore", storage :createJSONStorage(() => localStorage)}

    )
  )
}

export const ImageStore = createZustandContext(getStore)


export function useImageStore<T>(selector : (state : State) => T) {
  const store = React.useContext(ImageStore.Context)
  if (!store) throw new Error("No Image Store Found");
  return useStore(store, selector);
}
