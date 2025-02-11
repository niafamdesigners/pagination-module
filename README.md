# Pagination Module

This is a pagination module that supports both standard and Ajax-based pagination.

## Installation

Add `pagination.js` and `pagination.css` to your project by including the following tags:

```html
<link rel="stylesheet" href="/uploads/assets/css/pagination.css" />
<script src="/uploads/assets/js/pagination.js"></script>
```

## Usage

1. Add the following HTML tags to your file:

   ```html
   <!-- Content Container -->
   <div id="contentContainer"></div>
   <!-- Pagination -->
   <div id="paginationInfo" class="pagination-info"></div>
   <div id="paginationContainer" class="pagination"></div>
   ```

2. Initialize the pagination module using the following configuration:

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
  firstText: "First", // "First" button text
  lastText: "Last", // "Last" button text
  prevText: "Previous", // "Previous" button text
  nextText: "Next", // "Next" button text
});
```

3. To properly reset pagination in Ajax mode, add `data-cnt='totalCount'` to each data item.
