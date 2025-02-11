# Pagination Module

This is a pagination module that supports both standard and Ajax-based pagination.

## Installation

Add `pagination.js` to your project by including the following script tag:

```html
<script src="/uploads/assets/js/pagination.js"></script>
```

## Usage

Initialize the pagination module using the following configuration:

```js
const pagination = new Pagination({
  ajaxMode: false, // Set to true for Ajax-based pagination
  totalItems: totalCount, // Total number of items
  itemsPerPage: 10, // Number of items per page
  visiblePages: 5, // Number of visible page buttons
  paginationContainerId: "paginationContainer", // ID of the pagination container
  paginationInfoId: "paginationInfo", // ID of the pagination info display
  baseUrl: "", // Base URL for pagination
  onPageChange: async (page) => {
    if (pagination.ajaxMode) {
      const searchFilter = document.getElementById("filterText1");
      fetchFilteredData(filters, page);
    }
  },
  firstText: "First", // "First" text translation
  lastText: "Last", // "Last" text translation
  prevText: "Previous", // "Previous" text translation
  nextText: "Next", // "Next" text translation
});
```
