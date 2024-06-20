const router = require('express').Router();

const Competition = require('../models').Competition;
const Score = require('../models').Score;

const { competitionValidator } = require('../validations/competitionValidation');

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');

// Get All
router.get('/', (req, res) => {
    Competition.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving competitions."
            });
        });
});

// Get one by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Competition.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Competition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error retrieving Competition with id=" + id
            });
        });
});

// Create new competition
router.post('/', authMiddleware, (req, res) => {
    const {error} = competitionValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newCompetition = {
        name: req.body.name,
        date: req.body.date
    }

    Competition.create(newCompetition)
        .then(savedCompetition => {
            res.status(201).json({ status: "Success", new_competition_id: savedCompetition.id });
        })
        .catch(err => res.status(500).send(err.message));
});

// Update a competition
router.put('/:id', authMiddleware, (req, res) => {
    const id = req.params.id;

    const {error} = competitionValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    Competition.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Competition was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Competition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error updating Competition with id=" + id
            });
        });
});

// Delete a competition
router.delete('/:id', authMiddleware, (req, res) => {
    const id = req.params.id;

    Competition.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Competition was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Competition with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error deleting Competition with id=" + id
            });
        })
});

// Get scores by competition Id
router.get('/:id/scores', (req, res) => {
    const id = req.params.id;

    Score.findAll({
        where: { competitionId: id}
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving scores of competition with id=${id}.`
            });
        });
});

module.exports = router;