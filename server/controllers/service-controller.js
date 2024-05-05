const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();

        if (!response) {
            return res.status(402).json({
                msg: "No Service Found",
            });
        }
        res.status(200).json({msg:  response })
    } catch (error) {
        console.log(`services: ${error}`);
    }
};

module.exports = services;
