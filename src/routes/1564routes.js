import { addNewNote, getNotes,
updateNote, deleteNote } from '../controllers/noteController';
import { addNewCard, getCards,
updateCard, deleteCard } from '../controllers/cardController'

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

  app.route('/card/:noteId')
  .get(getCards)
  .post(addNewCard);

  app.route('/card/:noteId/:cardId')
  .put(updateCard)
  .delete(deleteCard);
}

export default routes;
