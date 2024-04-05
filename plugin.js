// Given a note (template) will populate current or given note with tasks
//
// Note template format:
// 7 am - wake up, meditate
// 8 am - workout
// 6 pm - dinner

//

{
  settings: {
    sourceNoteUUID: null
  },

  dailyJotOption: {
    async "Add daily tasks to current note" (app, noteHandle) {
      // set template note
      console.log('settings', this.settings);
      console.log(this.settings.sourceNoteUUID);
      const templateNote = await app.findNote({
        uuid: this.settings.sourceNoteUUID,
      });
      console.log(templateNote);
      console.log("json", JSON.stringify(templateNote));

      // let templateContents = await app.getNoteContent(templateNote);
      // console.log("template contents", templateContents);

      // parse content/lines

      // get current note

      // tasks to current note
    }
  }
}

