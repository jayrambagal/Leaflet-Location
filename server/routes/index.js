const express = require("express");
const router = express.Router();
const Emp = require("../model/empSchema");

// ********************* Post All Data to database ********************************
router.post("/postEmp", async (req, res) => {
  try {
    const { name, department, address, longitude, latitude } = req.body;

    const findName = await Emp.findOne({ name: name });

    if (findName) {
      res.status(400).json({ message: "data already exixst" });
    } else {
      const post = new Emp({
        name,
        department,
        address,
        longitude,
        latitude,
      });
      await post.save();
      res.status(200).json({ message: "succsessfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: error });
  }
});


// ********************** getting all data from database ************************************
router.get("/getEmp", async (req, res) => {
  try {
    const employees = await Emp.find();
    const employeeData = employees.map((employee) => {
      return {
        name: employee.name,
        dept: employee.department,
        address: employee.address,
        position: [employee.latitude,employee.longitude],
      };
    });
    res.json(employeeData);
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: error });
  }
});

module.exports = router;
