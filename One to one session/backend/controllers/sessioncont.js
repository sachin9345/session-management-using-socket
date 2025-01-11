const catchAsyncError = require('../middlewares/catchAsyncError'); // Assuming you have a middleware for handling async errors
const Session = require('../models/Session'); 
const { v4: uuidv4 } = require('uuid');


exports.createSession = catchAsyncError(async (req, res, next) => {
    const sessionId = uuidv4(); // Generate a unique session ID

    // Create and save the new session
    const newSession = await Session.create({ sessionId });

    // Respond with the generated URL
    res.status(201).json({
        success: true,
        url: `http://localhost:3000/session/${newSession.sessionId}`
    });
});

exports.validateSession = catchAsyncError(async (req, res, next) => {
    const { sessionId } = req.params;
    
    // Find the session by sessionId
    const session = await Session.findOne({ sessionId });
  
    // Respond with session validity status
    res.status(200).json({
      success: true,
      valid: !!session // If session exists, valid: true, otherwise valid: false
    });
  });

  exports.handleSignal = catchAsyncError(async (req, res, next) => {
    const sessionId = req.params.sessionId;
    const signal = req.body;
  
    // Find the corresponding session
    const session = await Session.findOne({ sessionId });
  
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
  
    // Forward the signal to the other peer
    const otherPeer = session.peers.find(peer => peer.id !== req.user.id);
    if (otherPeer) {
      await otherPeer.socket.emit('signal', signal);
    }
  
    res.status(200).json({ success: true });
  });