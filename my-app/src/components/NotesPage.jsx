import { useEffect, useState } from "react";

const NotesPage = () => {
  const [NOTES, setNotes] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`http://localhost:3000/notes`, {credentials: "include"});
      const resJson = await res.json();
      setNotes(resJson.notes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = { title, body };

    try {
      const res = await fetch(`http://localhost:3000/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Allow sending cookies with the request
      });

      const resJson = await res.json();
      setNotes([...NOTES, { _id: resJson.note._id, title, body }]);
    } catch (err) {
      console.log(err);
    }

    // clearing the form state
    setTitle("");
    setBody("");
  };

  const deleteHandler = async (id) => {
    // Delete the Note
    try {
      const res = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allow sending cookies with the request
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // update the state
    const newNotes = [...NOTES].filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  const updateFormFieldChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (id) => {
    // Get the current notes values
    const note = NOTES.find((note) => note._id === id);

    // setting the updating the form
    setUpdateForm({
      _id: id,
      title: note.title,
      body: note.body,
    });
  };

  const updateFormHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/notes/${updateForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateForm),
        credentials: "include", // Allow sending cookies with the request
      });

      const resJson = await res.json();

      console.log("resJson=================", resJson);

      // update the state of the updated note
      const newNotes = [...NOTES];
      const noteIdx = newNotes.findIndex((note) => note._id === updateForm._id);

      newNotes[noteIdx] = { ...updateForm };
      setNotes(newNotes);

      // clearing the update form state
      setUpdateForm({
        _id: null,
        title: "",
        body: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Create Note */}
      <div>
        <h2>Create Note</h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 border border-slate-500 p-5 w-fit"
        >
          <input
            className="border border-slate-400"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border border-slate-400"
            type="text"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <button type="submit">Create Note</button>
        </form>
      </div>

      {/* Update Note */}
      {updateForm._id !== null && (
        <div className="border border-slate-400 rounded-sm">
          <h2>Update Form</h2>

          <form
            onSubmit={updateFormHandler}
            className="flex flex-col gap-5 border border-slate-500 p-5 w-fit"
          >
            <input
              className="border border-slate-400"
              type="text"
              name="title"
              value={updateForm.title}
              onChange={updateFormFieldChangeHandler}
            />

            <textarea
              className="border border-slate-400"
              type="text"
              name="body"
              value={updateForm.body}
              onChange={updateFormFieldChangeHandler}
            />

            <button type="submit">Update Note</button>
          </form>
        </div>
      )}

      {NOTES === null ? (
        <>Loading...</>
      ) : (
        <div className="flex gap-5 mt-10">
          {NOTES.map((note) => {
            const { _id: id, title, body } = note;

            return (
              <div
                key={id}
                className="flex flex-col gap-3 border border-gray-500 p-3 max-w-40"
              >
                <h4>{title}</h4>
                <p>{body}</p>
                <button
                  className="p-2 bg-slate-300 rounded-sm"
                  onClick={() => deleteHandler(id)}
                >
                  Delete
                </button>

                <button
                  className="p-2 bg-slate-300 rounded-sm"
                  onClick={() => toggleUpdate(id)}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NotesPage;
