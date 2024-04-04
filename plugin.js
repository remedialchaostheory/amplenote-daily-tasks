// Given a note (template) will populate current or given note with tasks
//
// Note template format:
// 7 am - wake up, meditate
// 8 am - workout
// 6 pm - dinner

//

let plugin = {
  settings: {
    templateNoteUUID: null,
  },

  dailyTasks: {
    async "Add daily tasks to current note"(app, noteHandle) {
      // set template note
      const templateNote = await app.findNote({
        uuid: this.settings.templateNoteUUID,
      });
      console.log(JSON.stringify(templateNote));

      let templateContents = await app.getNoteContent(templateNote);
      console.log(templateContents);

      // parse content/lines

      // get current note

      // tasks to current note
    },
  },
};
