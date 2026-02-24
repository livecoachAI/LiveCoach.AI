const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema({
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
      index: true,
    },

    athleteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },

    sessionDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    focusArea: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },

  { timestamps: true },
);

sessionNoteSchema.index({ coachId: 1, sessionDate: -1 });
sessionNoteSchema.index({ athleteId: 1, sessionDate: -1 });

module.exports = mongoose.model("SessionNote", sessionNoteSchema);
