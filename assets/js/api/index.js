export const getProjects = async () => {
  try {
    const res = await axios.get(`http://localhost:4080/projects`);
    if (res.status === 200) return await res.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const saveProject = async () => {
  let formData = new FormData();
  [...$("form input")].forEach((elm) => {
    if (elm.name === "questionSet") {
      formData.append(elm.name, elm.files[0]);
    } else if (elm.name === "isQuestionSetAsked") {
      formData.append(elm.name, elm.checked);
    } else {
      formData.append(elm.name, elm.value);
    }
  });

  try {
    const res = await axios.post(
      `https://uservision.com/create-project`,
      formData,
      {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      }
    );

    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(err.message);
  }
};

export const deleteProject = async (id) => {
  const prompt = confirm("Are you sure?");
  if (prompt) {
    try {
      const res = axios.delete(
        `https://uservision.com/delete-project?projectId=${id}`
      );
      if (res.status === 200) return await res.json();
    } catch (err) {
      console.log(err.message);
    }
  }
  return false;
};

export const uploadVideo = async () => {
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

export const meetingDetails = async () => {
  try {
    const res = await axios.get(`https://uservision.com/meeting-details`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const getCalendar = async () => {
  try {
    const res = await axios.get(`https://uservision.com/calendar`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = async () => {
  const payload = {
    meetingId: 0,
    note: "",
    timestamp: new Date(),
  };
  try {
    const res = await axios.post(`https://uservision.com/create-note`);
    if (res.status === 200) return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const addAnswer = async () => {
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

export const searchProject = (e) => {
  console.log(e.target.value);
};
