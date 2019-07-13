const Partner = require('../models/Partner');

module.exports = {
    getAllPartners: (req, res) => {
        Partner
            .find({ })
            .then(partners => {
                // Filter and send to the client only a couple of partners. Currently
                // slicing randomly the first five partners. In the future the filter has to be
                // changed and applied according to other preferences (only partners willing to invest
                // more funds will be shown)
                // const slicedPartners = partners.slice(0, 5);
                res.status(200).json(partners)
            });
    },
    getApprovedPartners: (req, res) => {
        Partner
            .find({ isApproved: true })
            .then(approvedPartners => {
                // Filter and send to the client only a couple of partners. Currently
                // slicing randomly the first five partners. In the future the filter has to be
                // changed and applied according to other preferences (only partners willing to invest
                // more funds will be shown)
                const slicedApprovedPartners = approvedPartners.slice(0, 5);
                res.status(200).json(slicedApprovedPartners)
            });
    },
    deletePartner: (req, res) => {
        Partner
            .findByIdAndRemove(req.params.id)
            .then(() => res.status(200).json({
                message: `Partner with id = ${req.params.id} was deleted.`
            }))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    },
    createPartner: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(200).json({
                error: `Bad request`,
                message: `The request body is empty`
            })
        }

        console.log(req.body)

        Partner
            .create(req.body)
            .then(partner => res.status(201).json(partner))
            .catch(error => res.status(500).json({
                error: `Internal server error`,
                message: error.message
            }));
    },
    updatePartner: (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'The request body is empty'
            });
        }

        console.log(`Inside updatePartner()`);
        console.log(req.body);
        Partner
            .findByIdAndUpdate(req.body.id, {
                isApproved: true
            })
            .then(movie => res.status(200).json(movie))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            }));
    }
}