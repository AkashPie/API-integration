// URL
// https://uservision.com

// axios setup
axios.defaults.headers.common["Content-Type"] = "application/json";

const dummyProject = [
  {
    brandName: "Demo",
    projectName: "Demo Project",
    projectDescription: "Demo Project 1",
    ParticipantCount: "5",
    questionSet: "C:\\fakepath\\sample.csv",
    isQuestionSetAsked: true,
    id: 1,
  },
  {
    brandName: "Demo",
    projectName: "Demo Project",
    projectDescription: "Demo Project 2",
    ParticipantCount: "2",
    questionSet: "C:\\fakepath\\sample.csv",
    isQuestionSetAsked: false,
    id: 2,
  },
];

// apis
const getProjects = async () => {
  try {
    const res = await axios.get(`http://localhost:4080/projects`);
    if (res.status === 200) return await res.data;
    return res;
  } catch (error) {
    return dummyProject;
  }
};

const uploadqQestionSet = () => {
  let questionSet = $("#questionSet").prop("files");
  const { name, size, type } = questionSet[0];
  if (type !== "text/csv") {
    alert("Please upload csv only !");
    return;
  }
  $("#questionSetFileName").text(name);
};

const saveProject = async () => {
  let brandName = $("#brandName").val();
  let projectName = $("#projectName").val();
  let projectDescription = $("#projectDescription").val();
  let numberOfParticipant = $("#numberOfParticipant").val();
  let questionSet = $("#questionSet").val();
  let isQuestionSetAsked = $("#isQuestionSetAsked").is(":checked");

  const payload = {
    brandName,
    projectName,
    projectDescription,
    ParticipantCount: numberOfParticipant,
    questionSet,
    isQuestionSetAsked,
  };

  try {
    console.log(payload);
    const res = await axios.post(`http://localhost:4080/projects`, payload);

    if (res.status === 200) return await res.data;
  } catch (error) {
    console.log(err.message);
  }
};

const deleteProject = async (id) => {
  const prompt = confirm("Are you sure?");
  if (prompt) {
    try {
      const res = axios.delete(`http://localhost:4080/projects/${id}`);
      if (res.status === 200) return await res.json();
    } catch (err) {
      console.log(err.message);
    }
  }
  return false;
};

const getProjectDetails = async (id) => {
  try {
    const res = await axios.get(
      `https://uservision.com/project-details?projectId=${id}`
    );
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const updateProjectDescription = async () => {
  const payload = new FormData();
  try {
    const res = await axios.post(
      `https://uservision.com/update-project-description`,
      payload
    );
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const uploadVideo = async () => {
  const payload = new FormData();
  try {
    const res = await axios.post(
      `https://uservision.com/upload-video`,
      payload
    );
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const meetingDetails = async () => {
  try {
    const res = await axios.get(`https://uservision.com/meeting-details`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const getCalendar = async () => {
  try {
    const res = await axios.get(`https://uservision.com/calendar`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const addAnswer = async () => {
  const payload = {
    meetingId: 0,
    questionId: 0,
    answer: "",
    timestamp: new Date(),
  };
  try {
    const res = await axios.post(`https://uservision.com/add-answer`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const redirectWithData = (fileName, id) => {
  let url = `/${fileName}?id=${id}`;
  document.location.href = url;
};

const searchProject = (e) => {
  console.log(e.target.value);
};

// Projects Loop
function projects_winload() {
  fetch("projects.html")
    .then((response) => response.text())
    .then((text) => (document.getElementById("content-area").innerHTML = text));
}
projects_winload();
// Projects on Windows Load
const projectData = async () => {
  const data = (await getProjects()) ?? dummyProject;
  console.log(data);
  console.log(data);
  getProjects();
  //  .then() use here and remove setTimeout
  setTimeout(function () {
    for (let i = 0; i < data.length; i++) {
      // buttonPressed(\'project-details.html\',{id:${data[i].id}})
      var ProjectItem =
        `<div class="col-lg-6 "><div class="card cursor-pointer" onclick="redirectWithData(\'project-details.html\',${data[i].id})"><div class="card-body"><div class="d-flex justify-content-end"><a href="" class="icon me-4"><img src="assets/img/svg/share-social.svg" alt=""></a><a href="" class="icon"><img src="assets/img/svg/trash.svg" alt="" onclick="return deleteProject(${data[i].id})"></a></div><h3 class="card-title">` +
        data[i].projectName +
        '</h3><p class="card-text">' +
        data[i].projectDescription +
        '</p><div class="progress-bar-wrapper"><h5 class="title">Participant Count</h5><div class="progress"><div class="progress-bar" role="progressbar" style="width:' +
        data[i].percentage +
        '%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div></div></div></div></div>';
      $("#projectRow").append(ProjectItem);
    }
  }, 50);
};
projectData();
// Button Pressed
function buttonPressed(e) {
  // Get Content Through Navigation
  fetch(e)
    .then((response) => response.text())
    .then((text) => (document.getElementById("content-area").innerHTML = text));

  setTimeout(function () {
    // Projects load on Navigation click
    projectData();
    // Calendar load on Navigation click
  }, 20);
}

$(document).ready(function () {
  // Nav Links active Class
  $(".sidebar .nav .nav-item").each(function () {
    $(".nav-link", this).on("click", function () {
      $(".sidebar .btn-row .btn").removeClass("active");
      $(".sidebar .nav .nav-item .nav-link").removeClass("active");
      $(this).addClass("active");
    });
  });
  $(".sidebar .btn-row .btn").each(function () {
    $(this).on("click", function () {
      $(".sidebar .nav .nav-item .nav-link").removeClass("active");
      $(this).addClass("active");
    });
  });

  // Meeting
  $("textarea")
    .each(function () {
      this.setAttribute(
        "style",
        "height:" + this.scrollHeight + "px;overflow-y:hidden;"
      );
    })
    .on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

  // Recents
  $(".table-input-search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#recent-table tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // meeting video sec start
  $(".video-view-port").on("click", function () {
    $(".custom-modal").fadeOut();
  });
  $("#create-link").on("click", function () {
    $(".link-box").fadeToggle();
  });
  $("#chat-box").on("click", function () {
    $(".chat-box").fadeToggle();
  });
  $("#participants-box").on("click", function () {
    $(".participants-box").fadeToggle();
  });
  $("#participants-box-close").on("click", function () {
    $(".participants-box").fadeToggle();
  });
});
