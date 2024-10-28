import chooseArchitect from './choose-architect-in-vevey.md';
import renovateHouse from './renovate-house-in-vevey.md';

function makeMeta(id: keyof typeof articles) {
  const article = rawArticles[id];
  const content = article.content;
  const title = content.replace(/^## |\n.*/gs, '');
  const description = content.replace(/^[^\n]+\n\n|\n.*/gs, '');
  return { id, title, description, ...article, params: { id } };
}

const rawArticles = {
  chooseArchitect: { content: chooseArchitect, pathname: '/choisir-le-bon-architecte-a-vevey' },
  renovateHouse: { content: renovateHouse, pathname: '/renover-une-maison-ancienne-a-vevey' },
};

export const articles = {} as { [Key in Id]: Data };

export const articleIds = Object.keys(rawArticles) as Id[];

for (const id of articleIds) {
  articles[id] = makeMeta(id);
}

export namespace articles {
  export type Data = ReturnType<typeof makeMeta>;
  export type Id = keyof typeof rawArticles;
}

type Data = articles.Data;
type Id = articles.Id;
