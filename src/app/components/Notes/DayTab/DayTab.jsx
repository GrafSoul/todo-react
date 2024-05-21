import NoteItem from "../NoteItem";

const DayTab = ({ day }) => {
  const notes = [
    { id: 1, title: "Title name", checked: false },
    { id: 2, title: "Title name", checked: true },
  ];

  console.log(day);

  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          title={note.title}
          checked={note.checked}
          onCheckChange={() => {}}
        />
      ))}
    </div>
  );
};

export default DayTab;
