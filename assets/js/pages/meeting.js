const createNote = async (note, timestamp) => {
  const payload = {
    meetingId: 0,
    note,
    timestamp,
  };
  try {
    const res = await axios.post(`http://localhost:4080/notes`, payload);
    if (res.status === 200) return await res.data;
  } catch (error) {
    console.log(error.message);
  }
};

$(document).ready(function () {
  $("#addNote").click(function (event) {
    event.preventDefault();
    const note = $("#noteEditor").val();
    note.trim().length && createNote(note, event.timeStamp);
  });
});
