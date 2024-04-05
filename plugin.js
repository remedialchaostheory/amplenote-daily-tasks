// Given a note (template) will populate current or given note with tasks
//
// Note template format:
// 7 am - wake up, meditate
// 8 am - workout
// 6 pm - dinner

//

{

  dailyJotOption: {
    async "Add daily tasks to current note" (app, noteHandle) {
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

      // get template note contents
      let templateContents = await app.getNoteContent(templateNote);
      console.log("template contents", templateContents);


      //console.log(this.settings.sourceNoteUUID);
      console.log("json", JSON.stringify(templateNote));


      // parse content/lines

      // get current note

      // tasks to current note
    }
  }
}


