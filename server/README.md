### response body format
```js
{
  failed: Boolean, // status of request
  message?: String,
  content?: Array,  // fetch list's content
  total?: Number, // total number of contents
  page?: Number, // current page number
  size?: Number, // page size
}
```