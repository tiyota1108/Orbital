import { addNewNote, getNotes,
updateNote, deleteNote } from '../controllers/1564controller';

const routes = (app) => {
  app.route('/note')
  .get((req, res, next) => {
    //demo of the middleware
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getNotes)

  .post(addNewNote);

  app.route('/note/:noteId')
  .put(updateNote)
  .delete(deleteNote);
}

export default routes;
