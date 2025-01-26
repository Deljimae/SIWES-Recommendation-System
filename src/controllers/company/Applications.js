const { Applications, Company } = require('../../../models');
const { successResponse, errorResponse, customResponse } = require('../../utils/response');

const applications = {
  // Get applications for a specific company
  async getCompanyApplications(req, res) {
    const { companyId } = req.user;
    try {
      const applications = await Applications.findAll({
        where: {
          company_uuid: companyId
        },
        include: [
          { model: Company, as: 'company' }
        ]
      });

      // count for how many application with the status under review
      const pending_review = applications.filter(application => application.status === 'Under Review').length;
      const interviewed = applications.filter(application => application.status === 'Interviewed').length;
      const declined = applications.filter(application => application.status === 'Declined').length;
      const totalApplicationsReceived = applications.length;


      if (applications.length === 0) {
        return customResponse(res, 404, true, 'No applciation found', { applicationsReceived: 0, received: 0, interviewed: 0, declined: 0, pending_review: 0 });
      }

      return successResponse(res, 'Application retrieved successfully', { ...applications, pending_review, interviewed, declined, applicationsReceived: totalApplicationsReceived });

    } catch (error) {
      console.error(error)
      return errorResponse(res, error.message)
    }
  },
};

module.exports = applications;