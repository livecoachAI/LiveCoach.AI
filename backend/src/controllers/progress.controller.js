// progress.controller.js
exports.getAthleteSessionDates = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // If no userId provided in URL, return empty success
    if (!userId) {
      return res.status(200).json({ success: true, dates: [] });
    }

    const sessions = await SessionNote.find({ ownerUserId: userId })
      .select('sessionDate')
      .lean();
    
    const dates = sessions.map(s => s.sessionDate);
    
    // Always return success: true so the calendar renders
    res.status(200).json({ success: true, dates: dates || [] });
  } catch (error) {
    // Even on error, send a format the frontend expects to prevent crashes
    res.status(200).json({ success: false, dates: [], message: error.message });
  }
};