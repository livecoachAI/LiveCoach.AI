const SessionNote = require("../models/SessionNote");
const User = require("../models/User");

exports.createNote = async (coachId, payload) => {
  const athlete = await User.findById(payload.athleteId);
  if (!athlete || athlete.role !== "athlete") 
    throw new Error("Invalid athlete");

  return await SessionNote.create({
    coachId,
    athleteId: payload.athleteId,
    title: payload.title,
    notes: payload.notes || "",
    sessionDate: payload.sessionDate || new Date(),
    focusArea: payload.focusArea || "",
  });
};

exports.listForCoach = async (coachId) => {
  return await SessionNote.find({ coachId }).sort({ sessionDate: -1 });
};

exports.listForAthlete = async (athleteId) => {
  return await SessionNote.find({
    athleteId,
    status: "published",
    isVisibleToAthlete: true,
  }).sort({ sessionDate: -1 });
};

exports.getByIdForUser = async (noteId, user) => {
  const note = await SessionNote.findById(noteId);
  if (!note) throw new Error("Not found");

  if (user.role === "coach" && note.coachId.toString() === user._id.toString())
    return note;

  if (
    user.role === "athlete" &&
    note.athleteId.toString() === user._id.toString() &&
    note.status === "published" &&
    note.isVisibleToAthlete
  ) 
  
  {
    return note;
  }

  throw new Error("Forbidden");
};

exports.updateNote = async (noteId, coachId, updates) => {
  const note = await SessionNote.findOne({ _id: noteId, coachId });
  if (!note) throw new Error("Not found or forbidden");

  delete updates.coachId;
  delete updates.athleteId;

  Object.assign(note, updates);
  await note.save();
  return note;
};

exports.deleteNote = async (noteId, coachId) => {
  const result = await SessionNote.deleteOne({ _id: noteId, coachId });
  if (result.deletedCount === 0) throw new Error("Not found or forbidden");
};