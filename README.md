Nextjs/Mui/Recharts/

1. Start the app(start the finance_server first)
yarn dev
2. Visit http://localhost:3000

Route note:
1.If use app folder:
    1.1 Create a folder called test
    1.2 Create a tsx file called page.tsx in  test folder
    1.3 The router will be http://localhost:3000/test
2.If use pages folder
    2.1 Create folder called test
    2.2 Create a tsx file called index.tsx in test folder
    2.3 The router will be http://localhost:3000/test

Theme note:
1. Since we use the ThemeProvider in the app/page.tsx, so we can't visit the page component directly if we use color theme like below:
palette.grey[300]
2. Change palette.grey[300] to palette?.grey?.[300].
