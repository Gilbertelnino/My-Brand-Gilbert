const ArticleValues = {
  validToken: {
    "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNWY0MmVjZjE1MTM2OGQ1NGI5N2ZkYiIsImVtYWlsIjoiZ2lsYmVydGVsbmlub0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRHcDBDZU1odUhtaFFWY0QzcE9GUk8uU29ZZWdBRzlBWUExbXdLdjNPSnNXcUlsVDk3RjVEcSIsIl9fdiI6MH0sImlhdCI6MTYwMDE2MjUyNn0.swjwnDlheGiySxqnEPVpUhSVaGBvUCzG4f9dD7U-mLg",
  },
  noTokenProvided: {
    "auth-token": "",
  },
  invalidToken: {
    "auth-token": "112",
  },
  validArticle: {
    title: "blog title for testing",
    subtitle: "blog subtitle for testing",
    image: "images/og-default.jpg",
    content: "this is content for testing article api",
    author: "gilbert",
  },
  updatedArticle: {
    title: "updated title for testing",
    subtitle: "updated subtitle for testing",
  },
};
export default ArticleValues;
