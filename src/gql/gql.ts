/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartChangeProductQuantity($orderItemId: ID!, $productId: ID!, $quantity: Int!, $orderId: ID!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $orderItemId}\n    data: {quantity: $quantity, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, total: $total}\n  ) {\n    id\n  }\n}": types.CartChangeProductQuantityDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...CartCreate\n  }\n}": types.CartCreateDocument,
    "mutation CartDeleteOrderItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartDeleteOrderItemDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...CartCreate\n  }\n}": types.CartGetByIdDocument,
    "fragment CartCreate on Order {\n  id\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      id\n      name\n      price\n    }\n  }\n}": types.CartCreateFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    description\n    slug\n  }\n}": types.CategoryGetBySlugDocument,
    "fragment CollectionListItem on Collection {\n  name\n  slug\n  image {\n    url\n  }\n}": types.CollectionListItemFragmentDoc,
    "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetCategoryBySlug($slug: String!, $skip: Int, $first: Int) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: $first, skip: $skip) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetCategoryBySlugDocument,
    "query ProductsGetList($first: Int, $skip: Int, $price: Int) {\n  products(first: $first, skip: $skip, where: {price_lte: $price}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListByCollectionSlug($collectionSlug: String!) {\n  collections(where: {slug: $collectionSlug}) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetListByCollectionSlugDocument,
    "query ProductsGetListBySearchInpu($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListBySearchInpuDocument,
    "query ProductsGetRelatedProductsByCategory($categoryName: String!) {\n  products(where: {categories_some: {name: $categoryName}}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRelatedProductsByCategoryDocument,
    "mutation ReviewAddReview($content: String!, $email: String!, $name: String!, $rating: Int!, $headline: String!, $productId: ID!) {\n  createReview(\n    data: {content: $content, email: $email, name: $name, rating: $rating, headline: $headline, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.ReviewAddReviewDocument,
    "query ReviewsGetListByProductId($productId: ID!) {\n  reviews(where: {product: {id: $productId}}) {\n    id\n    rating\n    email\n    name\n    content\n    headline\n  }\n}": types.ReviewsGetListByProductIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeProductQuantity($orderItemId: ID!, $productId: ID!, $quantity: Int!, $orderId: ID!, $total: Int!) {\n  updateOrderItem(\n    where: {id: $orderItemId}\n    data: {quantity: $quantity, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}, total: $total}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartChangeProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...CartCreate\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartDeleteOrderItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartDeleteOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...CartCreate\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartCreate on Order {\n  id\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      id\n      name\n      price\n    }\n  }\n}"): typeof import('./graphql').CartCreateFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    name\n    description\n    slug\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionListItem on Collection {\n  name\n  slug\n  image {\n    url\n  }\n}"): typeof import('./graphql').CollectionListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCategoryBySlug($slug: String!, $skip: Int, $first: Int) {\n  categories(where: {slug: $slug}) {\n    name\n    products(first: $first, skip: $skip) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCategoryBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int, $price: Int) {\n  products(first: $first, skip: $skip, where: {price_lte: $price}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByCollectionSlug($collectionSlug: String!) {\n  collections(where: {slug: $collectionSlug}) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListBySearchInpu($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListBySearchInpuDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetRelatedProductsByCategory($categoryName: String!) {\n  products(where: {categories_some: {name: $categoryName}}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetRelatedProductsByCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewAddReview($content: String!, $email: String!, $name: String!, $rating: Int!, $headline: String!, $productId: ID!) {\n  createReview(\n    data: {content: $content, email: $email, name: $name, rating: $rating, headline: $headline, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewAddReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewsGetListByProductId($productId: ID!) {\n  reviews(where: {product: {id: $productId}}) {\n    id\n    rating\n    email\n    name\n    content\n    headline\n  }\n}"): typeof import('./graphql').ReviewsGetListByProductIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
