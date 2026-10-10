import { apiRequest } from "../src/meli.js";

const itemId = process.argv[2] || "MLC2265344933";

async function attempt(resource) {
  try {
    return { ok: true, data: await apiRequest(resource) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

const itemResult = await attempt(`/items/${itemId}?include_attributes=all`);
if (!itemResult.ok) throw new Error(itemResult.error);
const item = itemResult.data;

const [categoryResult, categoryAttributesResult, categoryShippingResult, domainShippingResult, flexResult, sellerShippingResult, optionsResult, userOptionsResult, explicitOptionsResult, freeOptionsResult] = await Promise.all([
  attempt(`/categories/${item.category_id}`),
  attempt(`/categories/${item.category_id}/attributes`),
  attempt(`/categories/${item.category_id}/shipping_preferences`),
  attempt(`/catalog_domains/${item.domain_id || "MLC-PROJECTOR_SCREENS"}/shipping_attributes`),
  attempt(`/flex/sites/MLC/items/${itemId}/v2`),
  attempt(`/users/${item.seller_id}/shipping_preferences`),
  attempt(`/items/${itemId}/shipping_options?zip_code=8320000`),
  attempt(`/users/${item.seller_id}/shipping_options?item_id=${itemId}&zip_code=8320000&verbose=true`),
  attempt(`/users/${item.seller_id}/shipping_options?dimensions=12x16x71,2800&zip_code=8320000&item_price=${item.price}&listing_type_id=${item.listing_type_id}&condition=${item.condition}&category_id=${item.category_id}&mode=me2&verbose=true`),
  attempt(`/users/${item.seller_id}/shipping_options/free?dimensions=12x16x71,2800&item_price=${item.price}&listing_type_id=${item.listing_type_id}&condition=${item.condition}&category_id=${item.category_id}&mode=me2&verbose=true`),
]);

const packageIds = new Set([
  "SELLER_PACKAGE_LENGTH",
  "SELLER_PACKAGE_WIDTH",
  "SELLER_PACKAGE_HEIGHT",
  "SELLER_PACKAGE_WEIGHT",
  "PACKAGE_LENGTH",
  "PACKAGE_WIDTH",
  "PACKAGE_HEIGHT",
  "PACKAGE_WEIGHT",
]);

const category = categoryResult.ok ? categoryResult.data : {};
const categoryAttributes = categoryAttributesResult.ok ? categoryAttributesResult.data : [];
const shippingRelatedCategoryAttributes = categoryAttributes.filter((attribute) =>
  packageIds.has(attribute.id) || /package|shipping|envío|envio|peso|weight|alto|ancho|largo/i.test(`${attribute.id} ${attribute.name}`),
).map((attribute) => ({
  id: attribute.id,
  name: attribute.name,
  value_type: attribute.value_type,
  tags: attribute.tags,
}));

console.log(JSON.stringify({
  item: {
    id: item.id,
    seller_id: item.seller_id,
    category_id: item.category_id,
    title: item.title,
    status: item.status,
    listing_type_id: item.listing_type_id,
    shipping: item.shipping,
    package_attributes: (item.attributes || []).filter((attribute) =>
      packageIds.has(attribute.id) || ["LENGTH", "WIDTH", "HEIGHT", "WEIGHT", "IS_SUITABLE_FOR_SHIPMENT", "SHIPMENT_PACKING", "SELLER_PACKAGE_DATA_SOURCE", "PACKAGE_DATA_SOURCE"].includes(attribute.id),
    ),
    warnings: item.warnings,
  },
  category: {
    id: category.id,
    name: category.name,
    settings: category.settings,
  },
  shipping_related_category_attributes: shippingRelatedCategoryAttributes,
  category_shipping_preferences: categoryShippingResult,
  domain_shipping_attributes: domainShippingResult,
  flex: flexResult,
  seller_shipping_preferences: sellerShippingResult.ok ? {
    modes: sellerShippingResult.data.modes,
    logistics: sellerShippingResult.data.logistics,
    local_pick_up: sellerShippingResult.data.local_pick_up,
    pickup: sellerShippingResult.data.pickup,
    tags: sellerShippingResult.data.tags,
  } : sellerShippingResult,
  shipping_options: optionsResult.ok ? optionsResult.data : optionsResult,
  user_shipping_options: userOptionsResult,
  explicit_dimension_shipping_options: explicitOptionsResult,
  free_shipping_options: freeOptionsResult,
}, null, 2));
