<a name="1.0.10"></a>
1.0.10 (2020-10-21)

- Added the possibility to index documents by ids. This is an ideal scenario when using .bulkInsert() as the postInsert hook doesn't get triggered. Huge thanks to @marcoancona for suggesting this!
- Fixed an async bug on PUT;

<a name="1.0.9"></a>
1.0.9 (2020-10-20)

- Fixed some typos in the docs, added new keyword;

<a name="1.0.8"></a>
1.0.8 (2020-10-20)

- Added '.searchFields' _option_ which allows targeting specific fields to search on collections;

<a name="1.0.7"></a>
1.0.4 - 1.0.7 (2020-10-19)

- Added update & remove hooks;
- Fixes for create hook;
- Cleanup;
