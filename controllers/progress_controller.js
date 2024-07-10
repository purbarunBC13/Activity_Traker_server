const {
  setValidation,
  postProgress,
  checkValidation,
  findWorkID,
  updateWorkStatus,
  checkWorkStatus,
  updateListOfActivity,
  fetchWorkId,
} = require("../models/progress_schema");

const postProgressData = async (req, res) => {
  try {
    const data = req.body;

    if (!data.work_id) {
      res.status(400).send({
        message: "Please provide a work id",
      });
      return;
    } else if (!data.work_status) {
      res.status(400).send({
        message: "Please provide a work status",
      });
      return;
    }

    const WorkId = await findWorkID(data);
    const work_status = await checkWorkStatus(data);
    const valid = await checkValidation(data);

    if (WorkId.length === 0) {
      if (
        data.work_status === "Completed" ||
        data.work_status === "Work in progress"
      ) {
        res.status(404).send({
          message: "Work is not yet initialized",
        });
        return;
      }

      if (data.work_status === "Yet to be started") {
        const workData = await postProgress(data);
        const ListOfActivity = await updateListOfActivity(data);
        if (workData.affectedRows === 0 || ListOfActivity.affectedRows === 0) {
          res.status(404).send({
            message: "Failed to initialize progress",
          });
          return;
        }
        res.status(200).send({
          message: "Progress initialized successfully",
        });
        return;
      }
    }

    if (WorkId.length === 1 && valid[0].valid === 0) {
      res.status(404).send({message: "Work is not yet validated"});
      return;
    }

    if (data.work_status === "Yet to be started" && WorkId.length === 1) {
      res.status(404).send({
        message: "Work is already initialized",
      });
      return;
    }

    if (work_status.length === "new") {
      res.status(404).send({
        message: "Work is not yet initialized",
      });
      return;
    }

    if (
      work_status[0].work_status === "Yet to be started" &&
      data.work_status === "Yet to be started"
    ) {
      res.status(404).send({
        message: "Work is already initialized",
      });
      return;
    }

    if (data.work_status === "Work in progress") {
      if (
        work_status[0].work_status === "Yet to be started" ||
        work_status[0].work_status === "Work in progress"
      ) {
        const workData = await updateWorkStatus(data);
        const ListOfActivity = await updateListOfActivity(data);
        if (workData.affectedRows === 0 || ListOfActivity.affectedRows === 0) {
          res.status(404).send({
            message: "Failed to update progress",
          });
          return;
        }
        res.status(200).send({
          message: "Work in progress",
        });
        return;
      }
    }

    if (data.work_status === "Completed") {
      if (work_status[0].work_status === "Work in progress") {
        const workData = await updateWorkStatus(data);
        const ListOfActivity = await updateListOfActivity(data);
        const valid = await setValidation(data);
        if (
          workData.affectedRows === 0 ||
          valid.affectedRows === 0 ||
          ListOfActivity.affectedRows === 0
        ) {
          res.status(404).send({
            message: "Failed to update progress",
          });
          return;
        }
        res.status(200).send({
          message: "Work completed",
        });
        return;
      } else {
        res.status(404).send({
          message: "Work is not in progress",
        });
        return;
      }
    }
    res.status(400).send({
      message: "Invalid request",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// make a api to fetch all work ids 

const getWorkIds = async (req, res) => {
  try {
    const workId = await fetchWorkId();
    res.status(200).send(workId);
  } catch (error) {
    res.status(500).send(error);
}
};

// get the current status of the work

// const getWorkStatus = async (req, res) => {
//   try {
//     const workStatus = await fetchWorkStatus();
//     res.status(200).send(workStatus);
//   } catch (error) {
//     res.status(500).send(error);
// };
// };
   





module.exports = { postProgressData, getWorkIds };
