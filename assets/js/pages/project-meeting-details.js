const meetingNotes = [
  {
    id: 0,
    time: "00:00",
    note: "Note 1 first tranksript ile ilgili yazılar olacak. Transript ile ilgili yazılar zaman bazlı olarak rakipteki gibi alt alta gözüecek",
  },
  {
    id: 0,
    time: "01:47",
    note: "Note 2 second Burada tamamiyle tranksript ile ilgili yazılar olacak. Transript ile ilgili yazılar zaman bazlı olarak rakipteki gibi alt alta gözüecek",
  },
  {
    id: 0,
    time: "02:31",
    note: "Note 3 third Burada tamamiyle tranksript ile ilgili yazılar olacak. Transript ile ilgili yazılar zaman bazlı olarak rakipteki gibi alt alta gözüecek",
  },
];

let filterData = meetingNotes;

$(document).ready(function () {
  const noteTag = (note, index) => `<div class="col-lg-6">
<div class="subtitle-wrapper">
  <div class="d-flex">
  <a href="">
    <img src="assets/img/svg/play.svg" alt="">
  </a>
  <div class="form-check">
    <input class="form-check-input d-none" type="checkbox" value="" id="note-${index}">
    <label class="form-check-label " for="note-${index}"></label>
  </div>
  </div>
  <div class="d-flex" data-id=${index}>
  <p class="time-tags">${note.time}</p>
  <p class="subtitle">${note.note}</p>
  </div>
  </div>
</div>
`;

  const appendNote = (data) => {
    $("#meeting-notes").html("");
    data.map((note, index) => {
      $("#meeting-notes").append(noteTag(note, index));
    });
  };

  appendNote(meetingNotes);

  $("#searchNote").on("keyup", function () {
    let searchWord = $("#searchNote").val();
    console.log(searchWord.trim().length);
    if (searchWord.trim().length === 0) {
      // console.log("nema nista");
      filterData = meetingNotes;
      appendNote(filterData);
    } else {
      // console.log("ima nesto");
      filterData = meetingNotes.filter((note) =>
        note.note.toLowerCase().includes(searchWord.toLowerCase())
      );
      appendNote(filterData);
    }
  });
});
