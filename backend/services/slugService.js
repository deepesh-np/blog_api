import slugify from "slugify";
import Article from "../models/article.model.js";

export const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (await Article.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};
