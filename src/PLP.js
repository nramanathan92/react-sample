import React, { useState, useEffect, useCallback } from 'react';
import withCustomRender from './withCustomRender';
import styles from './PLP.module.css';

// Utility function to get store config from environment variables
const getEnvStoreConfig = () => {
  return {
    apiUrl: process.env.REACT_APP_CATALOG_SERVICE_API_URL || 'https://catalog-service-sandbox.adobe.io/graphql',
    apiKey: process.env.REACT_APP_CATALOG_SERVICE_API_KEY || 'storefront-widgets',
    customerGroup: process.env.REACT_APP_CATALOG_SERVICE_CUSTOMER_GROUP || 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
    environmentId: process.env.REACT_APP_CATALOG_SERVICE_ENVIRONMENT_ID || '4187a815-e8da-4bee-9d33-8ab1ddd36f77',
    storeCode: process.env.REACT_APP_CATALOG_SERVICE_STORE_CODE || 'main_website_store',
    storeViewCode: process.env.REACT_APP_CATALOG_SERVICE_STORE_VIEW_CODE || 'default',
    websiteCode: process.env.REACT_APP_CATALOG_SERVICE_WEBSITE_CODE || 'base'
  };
};

// GraphQL query for product search (moved outside component to avoid re-creation)
const PRODUCT_SEARCH_QUERY = `
  query productSearch(
    $phrase: String!
    $pageSize: Int
    $currentPage: Int = 1
    $filter: [SearchClauseInput!]
    $sort: [ProductSearchSortInput!]
    $context: QueryContextInput
  ) {
    productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
      filter: $filter
      sort: $sort
      context: $context
    ) {
      total_count
      items {
        ...Product
        ...ProductView
      }
      facets {
        ...Facet
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
    }
  }
  
  fragment Product on ProductSearchItem {
    product {
      __typename
      sku
      description {
        html
      }
      short_description{
        html
      }
      name
      canonical_url
      small_image {
        url
      }
      image {
        url
      }
      thumbnail {
        url
      }
      price_range {
        minimum_price {
          fixed_product_taxes {
            amount {
              value
              currency
            }
            label
          }
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            percent_off
            amount_off
          }
        }
        maximum_price {
          fixed_product_taxes {
            amount {
              value
              currency
            }
            label
          }
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            percent_off
            amount_off
          }
        }
      }
    }
  }

  fragment ProductView on ProductSearchItem {
    productView {
      __typename
      sku
      name
      inStock
      url
      urlKey
      images {
        label
        url
        roles
      }
      ... on ComplexProductView {
        priceRange {
          maximum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
          minimum {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
          }
        }
        options {
          id
          title
          values {
            title
            ... on ProductViewOptionValueSwatch {
              id
              inStock
              type
              value
            }
          }
        }
      }
      ... on SimpleProductView {
        price {
          final {
            amount {
              value
              currency
            }
          }
          regular {
            amount {
              value
              currency
            }
          }
        }
      }
    }
    highlights {
      attribute
      value
      matched_words
    }
  }

  fragment Facet on Aggregation {
    title
    attribute
    buckets {
      title
      __typename
      ... on CategoryView {
        name
        count
        path
      }
      ... on ScalarBucket {
        count
      }
      ... on RangeBucket {
        from
        to
        count
      }
      ... on StatsBucket {
        min
        max
      }
    }
  }
`;

// Product card component following Adobe Commerce Catalog Service schema
const ProductCard = ({ item, onAddToCart }) => {
  // Extract data from both product and productView fragments
  const product = item.product || {};
  const productView = item.productView || {};
  
  // Use productView data preferentially as it's more current
  const name = productView.name || product.name;
  const sku = productView.sku || product.sku;
  const url = productView.url || product.canonical_url;
  const urlKey = productView.urlKey;
  const inStock = true; //productView.inStock;
  
  // Handle images from productView (newer format) or fallback to product
  const images = productView.images || [];
  const mainImage = images.find(img => img.roles?.includes('main')) || images[0];
  const imageUrl = mainImage?.url || product.small_image?.url || product.image?.url;
  const imageLabel = mainImage?.label || name;
  
  // Handle pricing - productView has different structure
  let finalPrice, regularPrice, hasDiscount = false;
  
  if (productView.price) {
    // SimpleProductView
    finalPrice = productView.price.final?.amount?.value;
    regularPrice = productView.price.regular?.amount?.value;
    hasDiscount = finalPrice !== regularPrice;
  } else if (productView.priceRange) {
    // ComplexProductView
    finalPrice = productView.priceRange.minimum.final?.amount?.value;
    regularPrice = productView.priceRange.minimum.regular?.amount?.value;
    hasDiscount = finalPrice !== regularPrice;
  } else if (product.price_range) {
    // Fallback to legacy product data
    finalPrice = product.price_range.minimum_price.final_price?.value;
    regularPrice = product.price_range.minimum_price.regular_price?.value;
    hasDiscount = product.price_range.minimum_price.discount?.percent_off > 0;
  }

  const handleAddToCart = () => {
    onAddToCart && onAddToCart({ ...item, finalPrice, regularPrice });
  };

  return (
    <div className={`${styles.productCard} product-card`} data-product-sku={sku}>
      <div className={styles.productImageContainer}>
        <img 
          src={imageUrl || 'https://placehold.co/280x280?text=No%20Image'} 
          alt={imageLabel}
          className={styles.productImage}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/280x280?text=No%20Image';
          }}
        />
        {hasDiscount && (
          <div className={styles.saleFlag}>SALE</div>
        )}
        {!inStock && (
          <div className={styles.outOfStockFlag}>OUT OF STOCK</div>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>
          <a href={url || urlKey || `#product-${sku}`} className={styles.productLink}>
            {name}
          </a>
        </h3>
        
        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <>
              <span className={styles.specialPrice}>
                ${parseFloat(finalPrice || 0).toFixed(2)}
              </span>
              <span className={styles.regularPrice}>
                ${parseFloat(regularPrice || 0).toFixed(2)}
              </span>
            </>
          ) : (
            <span className={styles.price}>
              ${parseFloat(finalPrice || regularPrice || 0).toFixed(2)}
            </span>
          )}
        </div>

        {/* Highlights from search results */}
        {item.highlights && item.highlights.length > 0 && (
          <div className={styles.highlights}>
            {item.highlights.map((highlight, index) => (
              <span key={index} className={styles.highlight}>
                {highlight.attribute}: {highlight.value}
              </span>
            ))}
          </div>
        )}

        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {!inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Filter component - updated for Adobe Commerce Catalog Service facets
const ProductFilters = ({ facets, onFilterChange, selectedFilters }) => {
  if (!facets || facets.length === 0) return null;

  const renderBucket = (bucket, attribute) => {
    const key = `${attribute}-${bucket.title || bucket.name || bucket.from}`;
    const label = bucket.name || bucket.title;
    const count = bucket.count;
    
    // Handle different bucket types
    if (bucket.__typename === 'CategoryView') {
      return (
        <label key={key} className={styles.filterOption}>
          <input
            type="checkbox"
            checked={selectedFilters[attribute]?.includes(bucket.path) || false}
            onChange={(e) => onFilterChange(attribute, bucket.path, e.target.checked)}
          />
          <span>{label} ({count})</span>
        </label>
      );
    } else if (bucket.__typename === 'RangeBucket') {
      const rangeKey = `${bucket.from}-${bucket.to}`;
      return (
        <label key={key} className={styles.filterOption}>
          <input
            type="checkbox"
            checked={selectedFilters[attribute]?.includes(rangeKey) || false}
            onChange={(e) => onFilterChange(attribute, rangeKey, e.target.checked)}
          />
          <span>${bucket.from} - ${bucket.to} ({count})</span>
        </label>
      );
    } else {
      // ScalarBucket or other types
      return (
        <label key={key} className={styles.filterOption}>
          <input
            type="checkbox"
            checked={selectedFilters[attribute]?.includes(label) || false}
            onChange={(e) => onFilterChange(attribute, label, e.target.checked)}
          />
          <span>{label} ({count})</span>
        </label>
      );
    }
  };

  return (
    <aside className={styles.filtersContainer}>
      <h3 className={styles.filtersTitle}>Filters</h3>
      
      {facets.map((facet) => (
        <div key={facet.attribute} className={styles.filterGroup}>
          <h4 className={styles.filterTitle}>{facet.title}</h4>
          <div className={styles.filterOptions}>
            {facet.buckets.map((bucket) => renderBucket(bucket, facet.attribute))}
          </div>
        </div>
      ))}
    </aside>
  );
};

// Sort component - updated for Adobe Commerce Catalog Service attributeMetadata
const ProductSort = ({ attributeMetadata, currentSort, onSortChange }) => {
  // Create sort options from attributeMetadata.sortable or use defaults
  const sortOptions = attributeMetadata?.sortable?.map(attr => ({
    value: attr.attribute,
    label: attr.label,
    numeric: attr.numeric
  })) || [
    { value: 'position', label: 'Position' },
    { value: 'name', label: 'Product Name' },
    { value: 'price', label: 'Price' },
    { value: 'created_at', label: 'Newest' }
  ];

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

// Main PLP component - updated for Adobe Commerce Catalog Service API
const PLP = ({ 
  // Store configuration props
  storeConfig,
  
  // Search and filter parameters
  searchPhrase = "",
  categoryPath = "",
  initialFilters = [],
  currentPage = 1,
  pageSize = 12,
  currentSort = 'position',
  selectedFilters = {},
  
  // Adobe Commerce Catalog Service productSearch response structure (optional - for direct data passing)
  productSearchData,
  attributeMetadata,
  
  // Legacy props for backward compatibility
  products = [], 
  facets = [],
  totalCount = 0,
  categoryName = "Products",
  
  // Event handlers
  onAddToCart,
  onFilterChange,
  onSortChange,
  onPageChange,
  onDataLoaded,
  onRenderComplete, // New event that fires after DOM is rendered
  
  // Loading state
  loading: externalLoading = false
}) => {
  // Use provided storeConfig or fallback to environment variables
  const effectiveStoreConfig = storeConfig || getEnvStoreConfig();
  
  // Internal state
  const [searchData, setSearchData] = useState(productSearchData || {
    items: products,
    facets: facets,
    total_count: totalCount,
    page_info: {
      current_page: currentPage,
      page_size: pageSize,
      total_pages: Math.ceil(totalCount / pageSize)
    }
  });
  const [metadata, setMetadata] = useState(attributeMetadata || null);
  const [loading, setLoading] = useState(externalLoading);
  const [error, setError] = useState(null);

  const [localProducts, setLocalProducts] = useState(searchData.items);
  const pageInfo = searchData.page_info || {};
  const totalPages = pageInfo.total_pages || Math.ceil(searchData.total_count / (pageInfo.page_size || pageSize));

  // Store configuration with environment variable fallback
  const config = effectiveStoreConfig;

  // Fetch product data from Adobe Commerce Catalog Service
  const fetchProductData = useCallback(async () => {
    if (productSearchData) {
      // If data is provided directly, don't fetch
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Build filters array
      const filters = [
        ...initialFilters,
        ...(categoryPath ? [{ attribute: "categoryPath", eq: categoryPath }] : []),
        { attribute: "visibility", in: ["Catalog", "Catalog, Search"] },
        { attribute: "inStock", eq: "true" }
      ];

      // Add selected filters to the query
      Object.entries(selectedFilters).forEach(([attribute, values]) => {
        if (values && values.length > 0) {
          if (attribute === 'price') {
            // Handle price range filters
            values.forEach(value => {
              const [from, to] = value.split('-');
              if (to === undefined) {
                filters.push({ attribute: "price", gte: parseFloat(from) });
              } else {
                filters.push({ 
                  attribute: "price", 
                  gte: parseFloat(from), 
                  lte: parseFloat(to === '+' ? '99999' : to) 
                });
              }
            });
          } else if (attribute === 'categoryPath') {
            values.forEach(value => {
              filters.push({ attribute: "categoryPath", eq: value });
            });
          } else {
            filters.push({ attribute, in: values });
          }
        }
      });

      // Build sort array
      const sort = [{ 
        attribute: currentSort, 
        direction: currentSort === 'price' ? 'ASC' : 'ASC' 
      }];

      const variables = {
        phrase: searchPhrase,
        pageSize: pageSize,
        currentPage: currentPage,
        filter: filters,
        sort: sort,
        context: {
          customerGroup: config.customerGroup,
          userViewHistory: []
        }
      };

      const headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Magento-Customer-Group': config.customerGroup,
        'Magento-Environment-Id': config.environmentId,
        'Magento-Store-Code': config.storeCode,
        'Magento-Store-View-Code': config.storeViewCode,
        'Magento-Website-Code': config.websiteCode,
        'X-Api-Key': config.apiKey
      };

      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: PRODUCT_SEARCH_QUERY,
          variables: variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
      }

      const newSearchData = result.data.productSearch;
      const newMetadata = result.data.attributeMetadata;

      setSearchData(newSearchData);
      setMetadata(newMetadata);
      setLocalProducts(newSearchData.items);

      // Call onDataLoaded callback if provided
      if (onDataLoaded) {
        onDataLoaded(newSearchData, newMetadata);
      }

    } catch (err) {
      console.error('Error fetching product data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [
    productSearchData, 
    initialFilters, 
    categoryPath, 
    selectedFilters, 
    currentSort, 
    searchPhrase, 
    pageSize, 
    currentPage, 
    config.customerGroup, 
    config.environmentId, 
    config.storeCode, 
    config.storeViewCode, 
    config.websiteCode, 
    config.apiKey, 
    config.apiUrl,
    onDataLoaded
  ]);

  // Effect to fetch data when dependencies change
  const selectedFiltersString = JSON.stringify(selectedFilters);
  
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData, searchPhrase, categoryPath, currentPage, pageSize, currentSort, selectedFiltersString]);

  useEffect(() => {
    setLocalProducts(searchData.items);
  }, [searchData.items]);

  // Effect to fire onRenderComplete after products are rendered
  useEffect(() => {
    if (localProducts.length > 0 && !loading && onRenderComplete) {
      // Use setTimeout to ensure DOM has been updated
      const timeoutId = setTimeout(() => {
        onRenderComplete(localProducts, searchData, metadata);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [localProducts, loading, onRenderComplete, searchData, metadata]);

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    onAddToCart && onAddToCart(item);
  };

  const handleFilterChange = (attribute, value, checked) => {
    onFilterChange && onFilterChange(attribute, value, checked);
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

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button onClick={fetchProductData} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} plp-container`}>
      <div className={styles.header}>
        <h1 className={styles.categoryTitle}>{categoryName}</h1>
        <div className={styles.toolbar}>
          <div className={styles.resultCount}>
            {searchData.total_count} item{searchData.total_count !== 1 ? 's' : ''}
          </div>
          <ProductSort 
            attributeMetadata={metadata || attributeMetadata}
            currentSort={currentSort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div className={styles.content}>
        {searchData.facets && searchData.facets.length > 0 && (
          <ProductFilters
            facets={searchData.facets}
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
                {localProducts.map((item, index) => (
                  <ProductCard
                    key={item.product?.sku || item.productView?.sku || index}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={pageInfo.current_page || currentPage}
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
