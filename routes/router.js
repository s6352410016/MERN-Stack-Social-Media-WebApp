const router = require('express').Router();

router.get('/users' , (req , res) => {
    res.send('OK');
});

module.exports = router;