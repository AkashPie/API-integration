export const getProjectDetails = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4080/projects?id=${id}`);
    if (res.status === 200) {
      return await res.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProjectDescription = async (projectId) => {
  const payload = {
    projectDescription: $(".content").text(),
  };
  try {
    const res = await axios.patch(
      `http://localhost:4080/projects/${projectId}`,
      payload
    );

    if (res.status === 200) return await res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const setProjectDetalis = async (id) => {
  const [data] = await getProjectDetails(id);
  console.log(data);
  $("#brandName").text(data.brandName);
  $("#projectDescription p").text(data.projectDescription);
};

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  let projectId = "test";
  for (const param of params) {
    projectId = param[1];
  }

  setProjectDetalis(projectId);
  let edit = false;
  $("#editDescription").click(async function () {
    var conattr = $(".content").attr("contenteditable");

    console.log(conattr);
    if (edit === false) {
      console.log("proslo 1");
      $(".content").attr("contenteditable", true);
      $("#cardBody").css("border", "solid 2px red");
      edit = true;
      if ($("#saveBtn")) {
        $("#saveBtn").remove();
      }
      $(".card").after(
        `          <button id="saveBtn" class="btn btn-dark">Save</button>`
      );
      $("#saveBtn").on("click", async function () {
        if (edit === true) {
          await updateProjectDescription(projectId);
          console.log("proslo 2");
          $(".card-body").css("border", "solid 0px transparent");
          $(".content").attr("contenteditable", false);
          edit = false;
          if ($("#saveBtn")) {
            $("#saveBtn").remove();
          }
          return;
        }
      });
      return;
    }
  });

  $("#projectVideo").on("change", function () {
    let file = $("#projectVideo").prop("files");
    console.log(file);
    if (file.length) {
      alert("File Uploaded Successfully!!");
    }
  });
});
