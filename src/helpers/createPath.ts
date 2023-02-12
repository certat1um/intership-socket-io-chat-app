import { join } from 'path';

export const createHTMLPagePath = (filename: string) => {
  return join(process.cwd(), 'public/html', `${filename}.html`);
};

export const createEJSViewPath = (filename: string) => {
  return join(process.cwd(), 'views', `${filename}.ejs`);
};
