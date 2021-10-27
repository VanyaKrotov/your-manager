import { makeAutoObservable } from "mobx";
import NoteModel from "../../models/note/NoteModel";
import { Note } from "../../types/notes";

class NotesStore {
  public items: Note[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.loadItems(userId);
  }

  public async loadItems(userId: number) {
    this.items = await NoteModel.selectAllByUserId(userId);
  }

  public async addNote(note: Pick<Note, "title" | "userId">) {
    const addedNote = await NoteModel.add(note);

    if (addedNote) {
      this.items.push(addedNote);
    }

    return addedNote;
  }

  public async updateNote(
    noteId: number,
    note: Partial<Omit<Note, "id" | "userId" | "dateCreated">>
  ) {
    const item = await NoteModel.update(noteId, note);

    if (item) {
      const index = this.items.findIndex(({ id }) => id === noteId);

      this.items[index] = item;
    }
  }
}

export default NotesStore;
