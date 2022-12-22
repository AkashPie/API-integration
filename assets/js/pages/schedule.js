$(document).ready(function () {
  Get_Calendar();
  let isNewParticipant = false;
  let participantWraaper = $("#participantWraaper");
  let partiipantInput = $("#participantWraaper input");
  let partiipantBtn = $("#participantWraaper button");
  let partiipants = ["One", "Two", "Three"];
  let removePartiipantBtn = $(".removePartiipantBtn");

  function showPartiipants() {
    $("#participantsSelect").html("");
    removePartiipantBtn.hide();
    $("#participantsSelect").append(
      ` <option disabled selected value>Select an option</option>">`
    );
    partiipants.forEach((partiipant) => {
      $("#participantsSelect").append(`<option value="${partiipant.trim()}">
      ${partiipant.trim()}
  </option>`);
    });
  }
  showPartiipants();

  if ($("#participantsSelect").val() === null) {
    removePartiipantBtn.hide();
  }
  $("#participantsSelect").on("change", function () {
    if ($("#participantsSelect").val() !== null) {
      removePartiipantBtn.show();
    }
  });
  removePartiipantBtn.on("click", function () {
    console.log($("#participantsSelect").val());
    let filtered = partiipants.filter(
      (parti) => parti !== $("#participantsSelect").val()
    );
    partiipants = filtered;
    showPartiipants();
  });
  partiipantInput.hide();

  $("#scheduleMeeting").submit(async function (event) {
    const payload = {
      brandId: $("#brandId").find(":selected").val(),
      projectId: $("#projectId").find(":selected").val(),
      meetingDate: $("#calendar-static").val(),
      meetingHour: $("#meetingHour").val(),
      meetingDurationMinutes: $("#meetingDurationMinutes").val(),
    };
    console.log(payload);
    try {
      const res = await axios.post(`http://localhost:4080/schedules`, payload);
      if (res.status === 200) return await res.data;
    } catch (error) {
      console.log(error.message);
    }
    window.location.href = "/index.html";
    event.preventDefault();
  });

  partiipantBtn.on("click", function () {
    if (!isNewParticipant) {
      isNewParticipant = true;
      partiipantInput.show();
    }
    if (isNewParticipant && partiipantInput.val().length) {
      isNewParticipant = false;

      let value = partiipantInput.val();
      let trimmed = value.replace(/ /g, "");

      partiipants.push(trimmed);

      showPartiipants();
      partiipantInput.val(null);
      partiipantInput.hide();
    }
  });
});
