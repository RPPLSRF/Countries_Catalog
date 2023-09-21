Preview: https://countries-catalog-rithpanhapich.vercel.app/

My Linkedin: https://www.linkedin.com/in/rith-panhapich/

My Portfolio: https://rith-panhapich.w3spaces.com/

### Countries Catalog Implementation
1. Please use this free api to get related data - https://restcountries.com/
2. Requirements
    - Please show the following fields on your catalog. Inside the () is the property of data.
        - Flags (Please use png file within flags property)
        - Country Name (name.official)
        - 2 character Country Code (cca2)
        - 3 character Country Code (cca3)
        - Native Country Name (name.nativeName)
        - Alternative Country Name (altSpellings)
        - Country Calling Codes (idd)
    - Search by Country Name (Fuzzy Search)
    - Sorting by Country Name (Asc,Desc)
    - Pagination (25 rows per page)
    - After clicked on country name, pop up a modal and show all others informations.
3. Please deploy your service to GitHub Pages and keep all related commit history.
4. Using any of these frontend frameworks is a plus - Vue.Js, React, Angular.

Go to the project directory

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run dev
```
Note:
```diff
@@    Fuzzy search has not been implemented yet    @@

- BUG: Antarctica and Heard Island is unclickable, need to reload website!

+ Everything else works as intended.
```
