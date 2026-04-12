import { getProducts } from "./src/lib/product-actions";
const products = await getProducts();
const holder = products.find(p => p.id === 126);
console.log(holder ? "Found" : "Not Found");
if (holder) console.log(JSON.stringify(holder, null, 2));
process.exit(0);
