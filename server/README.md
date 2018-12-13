### response body format
```js
{
  failed: Boolean, // status of request
  message: String,
  content?: Array,  // fetch list's content
  total?: Number, // total number of contents
  current?: Number, // current page number
  pageSize?: Number, // page size
  result?: String, // object of request
}
```