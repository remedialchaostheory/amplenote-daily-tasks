/* Given a note (template) will populate current or given note with tasks

Note template format:
7 am - wake up, meditate
8 am - workout
6 pm - dinner

*/

{

  dailyJotOption: {
    async "Add daily tasks to current note"(app, noteHandle) {
      console.log('notehandle', noteHandle);
      console.log('this', this);
      console.log('settings', this.settings);
      console.log('app', app);

      // get note uuid
      const templateNoteUUID = app.settings["Source note UUID"]
      console.log('templateNoteUUID', templateNoteUUID);

      const templateNote = await app.findNote({
        uuid: templateNoteUUID,
      });
      console.log('templateNote', templateNote);
      console.log("json", JSON.stringify(templateNote));

      // get template note contents
      let templateContents = await app.getNoteContent(templateNote);
      console.log("template contents", templateContents);

      // parse content/lines
      const parsedSchedule = this._parseSchedule(templateContents);
      console.log("parsedSchedule", parsedSchedule);

      // get current note

      // tasks to current note
    }
  },

  _parseSchedule(text) {
    /*
    Example usage:
      const text = `7 am - laundry, clean
      9:30 am - eat
      4:45 pm - gym, cook dinner`;
    output:
      [
        ["7 am", "laundry", "clean"],
        ["9:30 am", "eat"],
        ["4:45 pm", "gym", "cook dinner"]
      ]
    */

    // Split the text into lines
    const lines = text.split('\n');
    // Initialize an empty array to store the parsed schedule
    let schedule = [];

    // Regular expression to match the time format
    const timeRegex = /\b(\d{1,2}:\d{2}|\d{1,2})\s?(am|pm)?\b/i;

    // Iterate over each line
    lines.forEach(line => {
      // Find the time using the regex
      const timeMatch = line.match(timeRegex);
      if (timeMatch) {
        // Extract the time from the match
        const time = timeMatch[0];
        // Remove the time from the line to isolate the tasks
        let tasksPart = line.replace(timeRegex, '').trim();
        // Remove leading characters like "- " from tasks
        tasksPart = tasksPart.replace(/^-\s*/, '');
        // Split the tasks by comma
        const tasks = tasksPart.split(',').map(task => task.trim());
        // Combine the time and tasks into a single array and add it to the schedule
        schedule.push([time, ...tasks]);
      }
    });

    return schedule;
  },

  /**
 * Converts a date string of the format "April 5th, 2024 7 pm" to a Unix timestamp.
 * This function first removes ordinal suffixes (like "st", "nd", "rd", "th") from the date string,
 * then adjusts the time part to ensure it includes minutes for proper parsing,
 * and finally converts the date to a Unix timestamp in seconds.
 * 
 * Example:
 * Input: "April 5th, 2024 7 pm" (7:30 pm also valid)
 * Output: Unix timestamp in seconds (e.g., 1712347200)
 * 
 * @param {string} dateStr - The date string to convert.
 * @return {number} The Unix timestamp in seconds.
 */
  _convertDateToUnixTimestamp(dateStr) {
    const formattedDateStr = dateStr.replace(/(st|nd|rd|th)/g, '');

    // adjust time without minutes e.g "7 pm" -> "7:00 pm"
    const adjustedDateStr = formattedDateStr.replace(/(\d+)( am| pm)/, '$1:00$2');

    const date = new Date(adjustedDateStr);
    const unixTimestamp = date.getTime() / 1000; // convert from ms to sec

    // test code
    // const dateStr = "April 5th, 2024 7 pm";
    // const unixTimestamp = convertDateToUnixTimestamp(dateStr);
    // console.log(unixTimestamp);

    return unixTimestamp;
  }

}






