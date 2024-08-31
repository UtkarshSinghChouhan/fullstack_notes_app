import { create } from "zustand";

const useNotesStore = create((set) => ({
  NOTES: null,
  updateForm: {
    _id : null,
    title: "",
    body : ""
  },

  fetchNotes: async () => {
    try {
      const res = await fetch(`http://localhost:3000/notes`);
      const resJson = await res.json();

      //   set the state
      set({ NOTES: resJson.notes });
    } catch (err) {
      console.log(err);
    }
  },

  updateFormFieldChangeHandler : (e) => {

    const {name, value} = e.target

    set ((state) => ({
        
        ...state.updateForm,
        [name] : value
        
    }))

  }
}));

export default useNotesStore;
