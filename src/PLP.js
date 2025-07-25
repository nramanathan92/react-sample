import React, { useState, useEffect } from 'react';
import withCustomRender from './withCustomRender';
import styles from './PLP.module.css';

// Product card component following Magento schema
const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart && onAddToCart(product);
  };

  return (
    <div className={`${styles.productCard} product-card`} data-product-id={product.id}>
      <div className={styles.productImageContainer}>
        <img 
          src={product.small_image?.url || product.image?.url || 'https://placehold.co/280x280?text=No%20Image'} 
          alt={product.small_image?.label || product.name}
          className={styles.productImage}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/280x280?text=No%20Image';
          }}
        />
        {product.special_price && (
          <div className={styles.saleFlag}>SALE</div>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          <a href={product.url_key || `#product-${product.id}`} className={styles.productLink}>
            {product.name}
          </a>
        </h3>
        
        <div className={styles.priceContainer}>
          {product.special_price ? (
            <>
              <span className={styles.specialPrice}>
                ${parseFloat(product.special_price).toFixed(2)}
              </span>
              <span className={styles.regularPrice}>
                ${parseFloat(product.price_range?.minimum_price?.regular_price?.value || product.price).toFixed(2)}
              </span>
            </>
          ) : (
            <span className={styles.price}>
              ${parseFloat(product.price_range?.minimum_price?.regular_price?.value || product.price).toFixed(2)}
            </span>
          )}
        </div>

        {product.rating_summary && (
          <div className={styles.rating}>
            <div className={styles.stars} data-rating={product.rating_summary / 20}>
              {'★'.repeat(Math.floor(product.rating_summary / 20))}
              {'☆'.repeat(5 - Math.floor(product.rating_summary / 20))}
            </div>
            <span className={styles.reviewCount}>
              ({product.review_count || 0} reviews)
            </span>
          </div>
        )}

        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={product.stock_status === 'OUT_OF_STOCK'}
        >
          {product.stock_status === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Filter component
const ProductFilters = ({ filters, onFilterChange, selectedFilters }) => {
  return (
    <aside className={styles.filtersContainer}>
      <h3 className={styles.filtersTitle}>Filters</h3>
      
      {filters.map((filter) => (
        <div key={filter.attribute_code} className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>{filter.label}</h4>
          <div className={styles.filterOptions}>
            {filter.options.map((option) => (
              <label key={option.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedFilters[filter.attribute_code]?.includes(option.value) || false}
                  onChange={(e) => onFilterChange(filter.attribute_code, option.value, e.target.checked)}
                />
                <span>{option.label} ({option.count || 0})</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

// Sort component
const ProductSort = ({ sortOptions, currentSort, onSortChange }) => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
      <select 
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.sortSelect}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      <button
        className={styles.paginationBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹ Previous
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationBtn} ${page === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        className={styles.paginationBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next ›
      </button>
    </nav>
  );
};

// Main PLP component
const PLP = ({ 
  products = [], 
  filters = [],
  sortOptions = [],
  currentPage = 1,
  pageSize = 12,
  totalCount = 0,
  categoryName = "Products",
  onAddToCart,
  onFilterChange,
  onSortChange,
  onPageChange,
  loading = false,
  selectedFilters = {},
  currentSort = 'position'
}) => {
  const [localProducts, setLocalProducts] = useState(products);
  const totalPages = Math.ceil(totalCount / pageSize);

  // Default sort options following Magento patterns
  const defaultSortOptions = [
    { value: 'position', label: 'Position' },
    { value: 'name', label: 'Product Name' },
    { value: 'price', label: 'Price' },
    { value: 'created_at', label: 'Newest' },
    { value: 'rating_summary', label: 'Rating' }
  ];

  const sortOptionsToUse = sortOptions.length > 0 ? sortOptions : defaultSortOptions;

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    onAddToCart && onAddToCart(product);
  };

  const handleFilterChange = (attributeCode, value, checked) => {
    onFilterChange && onFilterChange(attributeCode, value, checked);
  };

  const handleSortChange = (sortValue) => {
    onSortChange && onSortChange(sortValue);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange && onPageChange(page);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading products...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} plp-container`}>
      <div className={styles.header}>
        <h1 className={styles.categoryTitle}>{categoryName}</h1>
        <div className={styles.toolbar}>
          <div className={styles.resultCount}>
            {totalCount} item{totalCount !== 1 ? 's' : ''}
          </div>
          <ProductSort 
            sortOptions={sortOptionsToUse}
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className={styles.content}>
        {filters.length > 0 && (
          <ProductFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}
        
        <main className={styles.productsSection}>
          {localProducts.length === 0 ? (
            <div className={styles.noProducts}>
              <h2>No products found</h2>
              <p>Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <>
              <div className={styles.productsGrid}>
                {localProducts.map((product) => (
                  <ProductCard
                    key={product.id || product.sku}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default withCustomRender(PLP);
