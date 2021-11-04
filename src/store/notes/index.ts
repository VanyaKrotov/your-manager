import { format, isToday, isYesterday } from "date-fns";
import { makeAutoObservable } from "mobx";

import { NoteType } from "enums/notes";
import { Note } from "types/notes";
import NoteModel from "models/note/NoteModel";

import { i18n, pageView } from "..";

class NotesStore {
  public rawItems: Note[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.init(userId);
  }

  private async init(userId: number) {
    await this.loadItems(userId);

    if (this.todayItem) {
      return;
    }

    this.addNote({ userId, title: null, type: NoteType.time });
  }

  public get items(): Note[] {
    return this.rawItems.map((item) => {
      const { type, dateCreated } = item;

      switch (type) {
        case NoteType.base:
          return item;

        case NoteType.time:
          const title = isToday(dateCreated)
            ? i18n.t("Today")
            : isYesterday(dateCreated)
            ? i18n.t("Yesterday")
            : format(dateCreated, "dd.MM.yyyy", pageView.formatOptions);

          return { ...item, title };

        default:
          return item;
      }
    });
  }

  public get sortedItems() {
    return [...this.items]
      .filter(({ type }) => type !== NoteType.time)
      .sort((a, b) => (!a.priority && b.priority ? 1 : -1));
  }

  public get timeItems() {
    return [...this.items]
      .filter(({ type }) => type === NoteType.time)
      .map(({ id, title, ...additional }) => ({
        value: id,
        label: title,
        additional,
      }));
  }

  public get todayItem(): Note | null {
    const item = this.rawItems.find(
      ({ dateCreated, type }) => isToday(dateCreated) && type === NoteType.time
    );

    return item || null;
  }

  public get notesMap(): Record<number, Note> {
    return this.items.reduce(
      (acc, item) => Object.assign(acc, { [item.id]: item }),
      {}
    );
  }

  public async loadItems(userId: number) {
    this.rawItems = await NoteModel.selectAllByUserId(userId);
  }

  public async addNote(
    note: Pick<Note, "title" | "userId" | "type">
  ) {
    const addedNote = await NoteModel.add(note);

    if (addedNote) {
      this.rawItems.push(addedNote);
    }

    return addedNote;
  }

  public async updateNote(
    noteId: number,
    note: Partial<Omit<Note, "id" | "userId" | "dateCreated">>
  ) {
    const item = await NoteModel.update(
      noteId,
      Object.assign(this.notesMap[noteId], note)
    );

    if (item) {
      const index = this.rawItems.findIndex(({ id }) => id === noteId);

      this.rawItems[index] = item;
    }
  }

  public async deleteNote(noteId: number) {
    const isDeleted = await NoteModel.delete(noteId);

    if (isDeleted) {
      this.rawItems = this.rawItems.filter(({ id }) => id !== noteId);
    }
  }

  public async changePriority(noteId: number) {
    this.updateNote(noteId, { priority: !this.notesMap[noteId].priority });
  }
}

export default NotesStore;
