import { format, isToday, isYesterday } from "date-fns";
import { makeAutoObservable } from "mobx";
import {
  child,
  DatabaseReference,
  ref,
  update,
  onValue,
  set,
  remove,
} from "firebase/database";

import { NoteType, SubType } from "enums/notes";
import { Note } from "types/notes";

import { i18n, pageView } from "..";
import { db } from "services/firebase";

class NotesStore {
  private ref: DatabaseReference;
  private unsubscribe: () => void = () => {};
  public rawItems: Note[] = [];

  constructor(userId: number) {
    makeAutoObservable(this);

    this.ref = ref(db, `notes/${userId}`);

    this.init(userId);
  }

  private async init(userId: number) {
    this.unsubscribe = onValue(this.ref, (snapshot) => {
      this.rawItems = Object.values(snapshot.val() || {});

      if (this.todayItem) {
        return;
      }

      this.addNote({ userId, title: null, type: NoteType.time });
    });
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

  public async addNote(note: Pick<Note, "title" | "userId" | "type">) {
    const currentTime = new Date().getTime();
    const newNote = {
      id: currentTime,
      content: "",
      dateCreated: currentTime,
      priority: false,
      subType: SubType.Rich,
      ...note,
    };

    await set(child(this.ref, String(currentTime)), newNote);

    return newNote;
  }

  public async updateNote(
    noteId: number,
    note: Partial<Omit<Note, "id" | "userId" | "dateCreated">>
  ) {
    const updateNote = Object.assign(this.notesMap[noteId], note);

    await update(child(this.ref, String(noteId)), updateNote);
  }

  public async deleteNote(noteId: number) {
    remove(child(this.ref, String(noteId)));
  }

  public async changePriority(noteId: number) {
    this.updateNote(noteId, { priority: !this.notesMap[noteId].priority });
  }
}

export default NotesStore;
