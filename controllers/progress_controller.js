const {
  setValidation,
  postProgress,
  checkValidation,
  findWorkID,
  updateWorkStatus,
  checkWorkStatus,
} = require("../models/progress_schema");

const postProgressData = async (req, res) => {
  try {
    const data = req.body;
    if (!data.work_id) {
      res.send("Please provide work_id").status(400);
      return;
    }

    
    const WorkId = await findWorkID(data);
    const work_status = await checkWorkStatus(data);


    if (WorkId.length === 0) {
      if (data.work_status === "Yet to be started") {
        const workData = await postProgress(data);
        if (workData.affectedRows === 0) {
          res.send("Failed to update progress").status(404);
          return;
        }
        res.send("Progress initialized successfully").status(200);
      } else {
        res.send("Work Id not found").status(404);
      }
    }

    if (data.work_status === "Work in progress") {
      if (work_status[0].work_status === "Yet to be started") {
        const workData = await updateWorkStatus(data);
        if (workData.affectedRows === 0) {
          res.send("Failed to update progress").status(404);
          return;
        }
        res.send("Progress updated successfully").status(200);
      }
    }

    if (data.work_status === "Completed") {
      if (work_status[0].work_status === "Work in progress") {
        const workData = await updateWorkStatus(data);
        const valid = await setValidation(data);
        if (workData.affectedRows === 0 || valid.affectedRows === 0) {
          res.send("Failed to update progress").status(404);
          return;
        }
        res.send("Progress updated successfully").status(200);
      }else{
        res.send("Work is not in progress").status(404);
      }
    }
  } catch (error) {
    res.send(error).status(500);
  }
};

module.exports = { postProgressData };
