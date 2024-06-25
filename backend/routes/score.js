const router = require('express').Router();

const Score = require('../models').Score;
const Competition = require('../models').Competition;

const { scoreValidator, scoreUpdateValidator } = require('../validations/scoreValidations');

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');

// Get one by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Score.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Score with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error retrieving Score with id=" + id
            });
        });
});

// Create new competition
router.post('/', authMiddleware, (req, res) => {
    const {error} = scoreValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Validate that Competition exists
    const competitionId = req.body.competitionId
    Competition.findByPk(competitionId)
        .then(competition => {
            if(!competition) {
                res.status(404).send({
                    message: `Cannot find Competition with id=${competitionId}.`
                });
            } else {
                const newScore = {
                    team: req.body.team,
                    score: req.body.score,
                    competitionId: req.body.competitionId,
                    active: true
                }

                Score.create(newScore)
                    .then(savedScore => {
                        res.status(201).json({ status: "Success", new_score_id: savedScore.id });
                    })
                    .catch(err => res.status(500).send(err.message));
            }
        })
        .catch(err => res.status(500).send(err.message));
});

// Update a competition
router.put('/:id', authMiddleware, (req, res) => {
    const id = req.params.id;

    const {error} = scoreUpdateValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    Score.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Score was updated successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Score with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error updating Score with id=" + id
            });
        })
});

// Delete a competition
router.delete('/:id', authMiddleware, (req, res) => {
    const id = req.params.id;

    Score.update(
        {
            active: false
        }, {
            where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Score was deleted successfully."
                });
            } else {
                res.status(404).send({
                    message: `Cannot find Score with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:  "Error deleting Score with id=" + id
            });
        })
});

module.exports = router;