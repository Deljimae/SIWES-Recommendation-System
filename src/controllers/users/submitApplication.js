const { Applications, Company } = require("../../../models");
const { notFoundResponse, successResponse, errorResponse } = require("../../utils/response");

// Controller for handling application submissions
const ApplicationController = {

  // Submit new application
  async submitApplication(req, res) {
    // check if company's uuid is passed in the header
    if (!req.headers.company_uuid) {
      return notFoundResponse(res, 'Company UUID not provided');
    }
    try {

      const { company_uuid } = req.headers;
      const { additionalInformation } = req.body;
      const { userId } = req.user;

      // check if application has already been submitted to the company already
      const application = await Applications.findOne({
        where: {
          company_uuid,
          user_uuid: userId
        }
      });

      if (application) {
        return errorResponse(res, 'Application already submitted to this company', 400);
      }


      // Create application object

      // Save to database
      const result = await Applications.create({
        company_uuid,
        additional_information: !additionalInformation ? '' : additionalInformation,
        user_uuid: userId
      })

      return successResponse(res, 'Application submitted successfully', result);

    } catch (error) {
      return errorResponse(res, error.message)
    }
  },

  // Get applications for a specific user
  async getApplications(req, res) {
    const { userId: id } = req.user;
    try {
      const applications = await Applications.findAll({
        where: {
          user_uuid: id
        },
        include: [
          { model: Company, as: 'company' }
        ]
      });

      if (applications.length === 0) {
        return notFoundResponse(res, 'No application found')
      }

      return successResponse(res, 'Application retrieved successfully', applications);

    } catch (error) {
      console.error(error)
      return errorResponse(res, error.message)
    }
  },

  // Get applications for a specific company
  // async getCompanyApplications(req, res) {
  //   const { company_uuid } = req.headers;
  //   try {
  //     const applications = await Applications.findAll({
  //       where: {
  //         company_uuid
  //       },
  //       include: [
  //         { model: Company, as: 'company' }
  //       ]
  //     });

  //     if (applications.length === 0) {
  //       return notFoundResponse(res, 'No application found')
  //     }

  //     return successResponse(res, 'Application retrieved successfully', applications);

  //   } catch (error) {
  //     console.error(error)
  //     return errorResponse(res, error.message)
  //   }
  // },

  // delelete application
  async deleteApplication(req, res) {
    const { id } = req.params;
    try {
      const application = await Applications.findByPk(id);

      if (!application) {
        return notFoundResponse(res, 'Application not found');
      }

      await application.destroy();

      return successResponse(res, 'Application deleted successfully');

    } catch (error) {
      return errorResponse(res, error.message)
    }
  }

  // // Update application status
  // async updateStatus(id, status) {
  //   try {
  //     const application = await Applications.findByIdAndUpdate(
  //       id,
  //       { status },
  //       { new: true }
  //     );

  //     if (!application) {
  //       throw new Error('Application not found');
  //     }

  //     return {
  //       success: true,
  //       application
  //     };

  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message
  //     };
  //   }
  // }
};

module.exports = ApplicationController;