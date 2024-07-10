const {
  setValidation,
  postProgress,
  checkValidation,
  findWorkID,
  updateWorkStatus,
  checkWorkStatus,
  updateListOfActivity,
  postProgressDetails,
  findLatestWorkDeatils,
} = require("../models/progress_schema");

const getWorkStatus = async (req, res) => {
  try {
    const data = req.body;
    if (!data.work_id) {
      res.status(400).send({
        message: "Please provide a work id",
      });
      return;
    }

    const work_status = await checkWorkStatus(data);

    if (work_status.length === 0) {
      res.status(404).send({
        message: "Work status not found",
      });
      return;
    }

    res.status(200).send({
      message: "Work status found",
      data: work_status,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

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
          message: "Work progress updated successfully",
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

const ProgressDetails = async (req, res) => {
  try {

    // console.log(req.body);

    const data = {
      work_id: req.body.work_id,
      estimated_physical_progress: req.body.estimated_physical_progress,
      estimated_financial_overview: req.body.estimated_financial_overview,
      expected_completion_date: req.body.expected_completion_date,
      remark: req.body.remark,
      image: req.body.image,
    };

    // console.log(data);

    if(data.image === undefined || data.image === "" || data.image === null) {
      res.status(400).send({message: "Please provide an image"});
      return;
    }
    
    if (!data.work_id) {
      return res.status(400).send({ message: "Please provide a work id" });
    }

    const work_status = await checkWorkStatus(data);

    if (work_status.length === 0) {
      return res.status(404).send({ message: "Work status not found" });
    }

    if (
      work_status[0].work_status === "Yet to be started" ||
      work_status[0].work_status === "Completed"
    ) {
      if (!data.remark) {
        return res.status(400).send({ message: "Please provide a remark" });
      }
      const progressDetails = await postProgressDetails(data);
      if (progressDetails.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "Failed to update progress details" });
      }
      return res
        .status(200)
        .send({ message: "Progress details updated successfully" });
    }

    if (work_status[0].work_status === "Work in progress") {
      if (
        !data.estimated_physical_progress ||
        !data.estimated_financial_overview ||
        !data.expected_completion_date
      ) {
        return res.status(400).send({
          message:
            "Please provide estimated physical progress, estimated financial overview, and expected completion date",
        });
      }
      const progressDetails = await postProgressDetails(data);
      if (progressDetails.affectedRows === 0) {
        return res
          .status(404)
          .send({ message: "Failed to update progress details" });
      }
      return res
        .status(200)
        .send({ message: "Progress details updated successfully" });
    }

    return res
      .status(400)
      .send({ message: "Invalid request work id not found" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getLatestWorkDetails = async (req, res) => {
  try {
    const result = await findLatestWorkDeatils();
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ message: "Failed to get the latest work details" });
    } else {
      return res
        .status(200)
        .send({ message: "Latest work details found", data: result });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { postProgressData, ProgressDetails, getWorkStatus, getLatestWorkDetails, getWorkIds };
