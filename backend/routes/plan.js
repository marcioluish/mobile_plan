const express = require('express');

const router = express.Router();

const Plan = require('../models/plan');

router.post('/', async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const dataLimit = req.body.dataLimit;
    let callLimit = req.body.callLimit;

    // Check for empty name field
    if (!name || name.trim().length === 0) {
        console.log('Invalid INPUT - Plan Name');
        return res.status(400).json({ message: 'Invalid plan name.' });
    }

    // Check for empty price field
    if (!price || price.trim().length === 0) {
        console.log('Invalid INPUT - Plan Price');
        return res.status(400).json({ message: 'Invalid plan price.' });
    }

    // Check for empty dataLimit field
    if (!dataLimit || dataLimit.trim().length === 0) {
        console.log('Invalid INPUT - Plan Data Limit');
        return res.status(400).json({ message: 'Invalid plan data limit.' });
    }

    if (!callLimit || callLimit.trim().length === 0) callLimit = '';

    const plan = new Plan({
        name: name,
        price: price,
        dataLimit: dataLimit,
        callLimit: callLimit,
    });

    try {
        plan.save();
        res.status(201).json({
            message: 'Plan Created!',
            plan: {
                id: plan.id,
                name: name,
                price: price,
                dataLimit: dataLimit,
                callLimit: callLimit,
            },
        });
        console.log('CREATED PLAN!');
    } catch (err) {
        console.error('ERROR CREATING PLAN');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to create plan.' });
    }
});

router.get('/', async (req, res, next) => {
    Plan.find()
        .then((planDocs) => {
            return res.status(200).json({
                message: 'Plans retrieved!',
                plans: {
                    plans: planDocs,
                },
            });
        })
        .catch((err) => {
            console.log('Failed retrieving plans.');
            return res.status(400).json({ message: err });
        });
});

router.post('/delete-plan/:planId', async (req, res, next) => {
    const planId = req.params.planId;

    // Check for empty plan ID field
    if (!planId || planId.trim().length === 0) {
        console.log('Invalid INPUT - PlanID');
        return res.status(400).json({ message: 'Invalid Plan ID.' });
    }

    Plan.findOneAndRemove({ id: planId })
        .then((planDoc) => {
            if (!planDoc) {
                return res.status(400).json({ message: 'Plan not Found.' });
            }

            return res.status(200).json({
                message: 'Resource Deleted Successfully.',
            });
        })
        .catch((err) => {
            console.log('Failed deleting plan.');
            return res.status(400).json({ message: err });
        });
});

router.get('/:planId', async (req, res, next) => {
    const planId = req.params.planId;

    // Check for empty plan ID field
    if (!planId || planId.trim().length === 0) {
        console.log('Invalid INPUT - PlanID');
        return res.status(400).json({ message: 'Invalid Plan ID.' });
    }

    Plan.findOne({ id: planId })
        .then((planDoc) => {
            if (!planDoc) {
                return res.status(400).json({ message: 'Plan not Found.' });
            }

            return res.status(201).json({
                message: 'Plan Found!',
                plan: {
                    id: planDoc.id,
                    name: planDoc.name,
                    price: planDoc.price,
                    dataLimit: planDoc.dataLimit,
                    callLimit: planDoc.callLimit,
                },
            });
        })
        .catch((err) => {
            console.log('Failed retrieving plan.');
            return res.status(400).json({ message: err });
        });
});

module.exports = router;
