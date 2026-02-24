const sessionService = require("../services/sessionNote.service");

exports.create = async (req, res, next) => {
  try {
    if (req.user.role !== "coach") {
      return res.status(403).json({ 
        success: false, message: "Only coaches can create notes" });
    }

    const note = await sessionService.createNote(req.user._id, req.body);
    
    res.status(201).json({ success: true, data: note });
  
  } catch (e) {
    next(e);
  }
};

exports.listNotes = async (req, res, next) => {
  try {
    const data =
      req.user.role === "coach"
        ? await sessionService.listForCoach(req.user._id)
        : await sessionService.listForAthlete(req.user._id);

    res.json({ success: true, data });
  
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const note = await sessionService.getByIdForUser(req.params.id, req.user);
    res.json({ success: true, data: note });
  
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.user.role !== "coach") {
      return res.status(403).json({ 
        success: false, message: "Only coaches can update notes" });
    }

    const note = await sessionService.updateNote(req.params.id, req.user._id, req.body);
    res.json({ success: true, data: note });
  
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    if (req.user.role !== "coach") {
      return res.status(403).json({ 
        success: false, message: "Only coaches can delete notes" });
    }

    await sessionService.deleteNote(req.params.id, req.user._id);
    res.json({ success: true, message: "Deleted" });
  
  } catch (e) {
    next(e);
  }
};