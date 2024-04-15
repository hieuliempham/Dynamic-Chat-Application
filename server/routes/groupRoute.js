const express = require("express");
const {createGroup, addMember, removeMember, getGroup, getGroupFromUser} = require('../controllers/groupController'); 

const router = express.Router();

router.post('/create', createGroup);
router.put('/:chatId/addMember', addMember);
router.put('/:chatId/removeMember', removeMember);
router.get('/:chatId', getGroup);
router.get('/user/:userId', getGroupFromUser);

module.exports = router;