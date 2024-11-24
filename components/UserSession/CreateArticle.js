import React from 'react'
import Button from '../Autres/Button';

export default function CreateArticle() {
  return (
    <div>
      <h3>Modifier Article</h3>
      <form>
        <input type="text" value="Titre de l'article" />
        <br />
        <br />
        <textarea rows="10" cols="50">
        </textarea>
        <br />
        <br />
        <Link href={"/ArticleSelected"}>
          <Button>Poster</Button>
      </Link>
      </form>
    </div>
  );
}
