const NoteCard = ({ note }) => {
  return (
    <div style={{ border: "1px solid white", padding: "10px" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteCard;