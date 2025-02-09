class Pagination {
  constructor(options) {
    this.totalItems = options.totalItems;
    this.itemsPerPage = options.itemsPerPage || 10;
    this.paginationContainer = document.getElementById(
      options.paginationContainerId
    );
    this.paginationInfo = document.getElementById(options.paginationInfoId);
    this.visiblePages = options.visiblePages || 5;
    this.baseUrl = options.baseUrl || window.location.pathname;
    this.onPageChange = options.onPageChange; // Callback for AJAX mode
    this.ajaxMode = !!options.ajaxMode;
    this.firstText = options.firstText || "ابتدا";
    this.lastText = options.lastText || "انتها";
    this.prevText = options.prevText || "قبلی";
    this.nextText = options.nextText || "بعدی";

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    const urlParams = new URLSearchParams(window.location.search);
    this.currentPage = parseInt(urlParams.get("page")) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    } else if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    this.render();
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    if (this.ajaxMode) {
      // AJAX mode
      this.currentPage = page;
      this.render();
      if (this.onPageChange) {
        this.onPageChange(page);
      }
    } else {
      // Regular page reload mode
      const url = new URL(this.baseUrl, window.location.origin);
      url.searchParams.set("page", page);

      // Preserve other URL parameters
      const currentParams = new URLSearchParams(window.location.search);
      for (const [key, value] of currentParams.entries()) {
        if (key !== "page") {
          url.searchParams.set(key, value);
        }
      }

      window.location.href = url.toString();
    }
  }

  updateTotal(newTotal) {
    this.totalItems = newTotal;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Adjust current page if it exceeds the new total
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.render();
  }

  setAjaxMode(isAjaxMode) {
    this.ajaxMode = isAjaxMode;
    this.goToPage(1);
    this.render();
  }

  createButton(text, onClick, isDisabled = false, className = "") {
    const button = document.createElement("button");
    button.innerText = text;
    button.className = `pagination-button ${className}`;
    button.disabled = isDisabled;
    if (!isDisabled) {
      button.onclick = (e) => {
        e.preventDefault();
        onClick();
      };
    }
    return button;
  }

  renderPaginationInfo() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    this.paginationInfo.innerHTML = `نمایش ${start} تا ${end} از ${this.totalItems} مورد`;
  }

  getVisiblePageNumbers() {
    let pages = [];
    const halfVisible = Math.floor(this.visiblePages / 2);

    let startPage = Math.max(this.currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + this.visiblePages - 1, this.totalPages);

    if (endPage - startPage + 1 < this.visiblePages) {
      startPage = Math.max(endPage - this.visiblePages + 1, 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) pages.push("...");
      pages.push(this.totalPages);
    }

    return pages;
  }

  render() {
    this.renderPaginationInfo();
    this.paginationContainer.innerHTML = "";

    // First button
    const firstButton = this.createButton(
      this.firstText,
      () => this.goToPage(1),
      this.currentPage === 1,
      "nav-button"
    );
    this.paginationContainer.appendChild(firstButton);

    // Previous button
    const prevButton = this.createButton(
      this.prevText,
      () => this.goToPage(this.currentPage - 1),
      this.currentPage === 1,
      "nav-button"
    );
    this.paginationContainer.appendChild(prevButton);

    // Page numbers
    const pages = this.getVisiblePageNumbers();
    pages.forEach((page) => {
      if (page === "...") {
        const dots = document.createElement("span");
        dots.className = "dots";
        dots.innerText = "...";
        this.paginationContainer.appendChild(dots);
      } else {
        const button = this.createButton(
          page,
          () => this.goToPage(page),
          false,
          this.currentPage === page ? "active" : ""
        );
        this.paginationContainer.appendChild(button);
      }
    });

    // Next button
    const nextButton = this.createButton(
      this.nextText,
      () => this.goToPage(this.currentPage + 1),
      this.currentPage === this.totalPages,
      "nav-button"
    );
    this.paginationContainer.appendChild(nextButton);

    // Last button
    const lastButton = this.createButton(
      this.lastText,
      () => this.goToPage(this.totalPages),
      this.currentPage === this.totalPages,
      "nav-button"
    );
    this.paginationContainer.appendChild(lastButton);
  }
}
