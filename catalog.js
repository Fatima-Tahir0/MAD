export const catalog = {
  Accessories: {
    Male: ['Purses / Wallets', 'Watches'],
    Female: ['Jewellery', 'Purses']
  },
  Clothes: {
    Male: ['Stitched', 'Unstitched'],
    Female: ['Stitched', 'Unstitched']
  },
  Makeup: {
    All: ['All Makeup']
  }
};

const image = photoId => photoId.startsWith('http')
  ? photoId
  : `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=720&q=80`;

const pexelsImage = photoId => `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=800&q=85`;

export const fallbackImages = {
  wallets: image('photo-1579014134953-1580d7f123f3'),
  watches: image('photo-1524805444758-089113d48a6d'),
  jewellery: image('photo-1682823544433-aae34df4e3da'),
  purses: image('photo-1559563458-527698bf5295'),
  mensStitched: pexelsImage(1760900),
  mensUnstitched: image('photo-1705493253575-e911888621ff'),
  womensStitched: image('photo-1773439878533-77383b20577c'),
  womensUnstitched: image('photo-1623310658847-33f12eaab710'),
  makeup: image('photo-1596462502278-27bfdc403348')
};

const collection = (parent, gender, category, fallbackImage, products) => products.map(
  ([slug, title, price, photoId, description], index) => ({
    id: `${parent.toLowerCase()}-${gender.toLowerCase()}-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${slug}`,
    title,
    price,
    category,
    parent,
    gender,
    image: image(photoId),
    fallbackImage: index < products.length - 1 ? image(products[index + 1][3]) : fallbackImage,
    description,
    source: 'local'
  })
);

const walletProducts = collection('Accessories', 'Male', 'Purses / Wallets', fallbackImages.wallets, [
  ['heritage-tan', 'Heritage Tan Bifold Wallet', 2450, 'photo-1606503825008-909a67e63c3d', 'A classic tan leather-look bifold with a slim profile for everyday carry.'],
  ['black-grain', 'Black Grain Leather Wallet', 2850, 'photo-1579014134953-1580d7f123f3', 'A clean black bifold with a subtle grain finish and practical card storage.'],
  ['walnut-bifold', 'Walnut Leather Bifold', 3200, 'photo-1624538000860-24716b9050f2', 'A warm walnut-brown wallet with a traditional fold and compact silhouette.'],
  ['camel-compact', 'Camel Compact Wallet', 2150, 'photo-1614330315526-166f2d71e544', 'A compact camel-toned wallet designed to slip easily into a trouser pocket.'],
  ['espresso-slim', 'Espresso Slim Wallet', 2750, 'photo-1620109176813-e91290f6c795', 'A dark espresso bifold with a slim cut and understated everyday styling.'],
  ['open-pocket', 'Everyday Open-Pocket Wallet', 1900, 'photo-1637486069202-b1163268c240', 'A practical open-pocket design with room for cards and folded notes.'],
  ['classic-brown', 'Classic Brown Pocket Wallet', 3500, 'photo-1531190260877-c8d11eb5afaf', 'A traditional brown leather-look wallet with a polished, timeless finish.'],
  ['black-minimal', 'Minimal Black Card Wallet', 2350, 'photo-1612023395494-1c4050b68647', 'A sleek black wallet with a modern, pared-back look for light carry.']
]);

const watchProducts = collection('Accessories', 'Male', 'Watches', fallbackImages.watches, [
  ['heritage-chronograph', 'Heritage Leather Chronograph', 12500, 'photo-1590555663282-0ca237fb63aa', 'A refined leather-strap chronograph look suited to smart-casual outfits.'],
  ['silver-classic', 'Silver Classic Dress Watch', 9800, 'photo-1524805444758-089113d48a6d', 'A polished silver-tone watch with a classic dial for office and formal wear.'],
  ['black-sport', 'Black Dial Sport Watch', 11500, 'photo-1582150264904-e0bea5ef0ad1', 'A bold black-and-silver sports style with a clear, easy-to-read dial.'],
  ['fossil-brown', 'Brown Strap Formal Watch', 14900, 'photo-1542496658-e33a6d0d50f6', 'A versatile brown leather-band timepiece with a dressy chronograph face.'],
  ['active-wrist', 'Active Everyday Wristwatch', 7200, 'photo-1591352254932-6d56d9fe295b', 'A comfortable everyday watch styled for casual wear and weekend use.'],
  ['steel-link', 'Steel Link Luxury-Inspired Watch', 18500, 'photo-1547996160-81dfa63595aa', 'A polished metal-link watch with a timeless, luxury-inspired appearance.'],
  ['two-tone', 'Two-Tone Classic Watch', 13200, 'photo-1610888968213-4f6d2c068108', 'A two-tone bracelet and round dial bring a smart finish to daily outfits.'],
  ['midnight-desk', 'Midnight Dial Casual Watch', 8900, 'photo-1639736922209-793b59a41572', 'A dark-dial casual watch with a clean profile for relaxed daily styling.']
]);

const jewelleryProducts = collection('Accessories', 'Female', 'Jewellery', fallbackImages.jewellery, [
  ['gold-hoop-earrings', 'Polished Gold Hoop Earrings', 1850, 'photo-1535632787350-4e68ef0ac584', 'Lightweight silver-tone hoops with a versatile shape for everyday outfits.'],
  ['crystal-drop-necklace', 'Crystal Drop Necklace', 3250, 'photo-1722410180687-b05b50922362', 'A delicate necklace and matching drop-earring look for a special occasion.'],
  ['green-pendant', 'Green Stone Pendant Necklace', 2950, 'photo-1722410180670-b6d5a2e704fa', 'A vivid green pendant-inspired statement piece with an elegant finish.'],
  ['gold-statement-ring', 'Gold and Silver Statement Ring', 4100, 'photo-1543294001-f7cd5d7fb516', 'A set of polished gold-tone rings with decorative details for occasion wear.'],
  ['layered-bracelets', 'Layered Everyday Bracelets', 2200, 'photo-1561828995-aa79a2db86dd', 'A selection of gold-tone jewellery pieces that can be layered for everyday styling.'],
  ['mixed-metal-set', 'Silver Ring Jewellery Edit', 3650, 'photo-1586878341340-1971696a9b71', 'A set of polished silver rings with a simple, contemporary finish.'],
  ['gold-chain-bracelet', 'Fine Gold Chain Bracelet', 2450, 'photo-1721807644561-9efcabee5c42', 'A fine chain-style bracelet with a delicate, understated look.'],
  ['diamond-style-ring', 'Diamond-Style Cocktail Ring', 3900, 'photo-1605100804763-247f67b3557e', 'A silver-tone statement ring with a bright stone-inspired centre setting.']
]);

const purseProducts = collection('Accessories', 'Female', 'Purses', fallbackImages.purses, [
  ['tan-crossbody', 'Tan Everyday Crossbody Bag', 5850, 'photo-1691480250099-a63081ecfcb8', 'A compact tan handbag with a crossbody-ready shape for hands-free days.'],
  ['black-structured', 'Black Structured Shoulder Bag', 7950, 'photo-1705909237050-7a7625b47fac', 'A structured black leather-look bag with a polished, versatile silhouette.'],
  ['stone-crossbody', 'Stone Grey Crossbody Purse', 6450, 'photo-1559563458-527698bf5295', 'A soft grey crossbody bag sized for daily essentials and easy styling.'],
  ['grey-satchel', 'Grey Buckle Satchel Handbag', 8900, 'photo-1605733513597-a8f8341084e6', 'A roomy grey satchel with buckle detailing and a comfortable top handle.'],
  ['evening-brown', 'Brown Evening Handbag', 7250, 'photo-1597633244018-0201d0158aab', 'A rich brown handbag with an elegant finish for dinners and occasions.'],
  ['blue-shoulder', 'Blue Colour-Block Shoulder Bag', 6900, 'photo-1652427019217-3ded1a356f10', 'A playful blue-and-white handbag that brightens a casual look.'],
  ['sunshine-mini', 'Sunshine Mini Top-Handle Bag', 5150, 'photo-1640901555383-7335ec5a6476', 'A cheerful yellow mini bag with a neat top handle and compact proportions.'],
  ['cocoa-handbag', 'Cocoa Brown Classic Handbag', 9350, 'photo-1691480150204-66dd1eb77391', 'A classic brown handbag with a clean shape for workdays and weekends.']
]);

const mensStitchedProducts = collection('Clothes', 'Male', 'Stitched', fallbackImages.mensStitched, [
  ['maroon-kurta-shirt', 'Maroon Mandarin-Collar Kurta-Style Shirt', 5200, pexelsImage(1760900), 'A ready-to-wear maroon stitched shirt with a clean mandarin collar and a refined traditional feel.'],
  ['sky-blue-dress-shirt', 'Sky Blue Stitched Dress Shirt', 4250, pexelsImage(1043474), 'A crisp, stitched button-front shirt styled with dark trousers for polished everyday wear.'],
  ['blue-blazer-shirt', 'Blue Blazer and Shirt Set', 7800, pexelsImage(1043473), 'A smart stitched blue shirt layered under a tailored blazer for a confident occasion look.'],
  ['navy-tailored-suit', 'Navy Tailored Formal Suit', 14900, image('photo-1617137968427-85924c800a22'), 'A sharp, ready-to-wear navy suit with a white shirt, styled for formal events and celebrations.'],
  ['black-classic-suit', 'Black Classic Stitched Suit', 15900, image('photo-1519085360753-af0119f7cbe7'), 'A classic black stitched suit with a crisp shirt and tie for a polished formal finish.'],
  ['mustard-casual-hoodie', 'Mustard Stitched Casual Hoodie', 4850, pexelsImage(1681010), 'A comfortable ready-made mustard pullover with a relaxed fit for casual days.'],
  ['red-bomber-jacket', 'Red Stitched Bomber Jacket', 6900, pexelsImage(1587009), 'A standout red ready-to-wear jacket layered over a neutral tee for modern casual styling.'],
  ['black-city-jacket', 'Black City Stitched Jacket', 7350, pexelsImage(1182825), 'A sleek black ready-made jacket with a contemporary silhouette for an easy smart-casual look.']
]);

const mensUnstitchedProducts = collection('Clothes', 'Male', 'Unstitched', fallbackImages.mensUnstitched, [
  ['midnight-black', 'Midnight Black Unstitched Suit Fabric', 4250, 'photo-1630920501459-f3e99320c4a5', 'A dark textile selection ready for a custom men\'s suit.'],
  ['blue-grey-cotton', 'Blue-Grey Cotton Suit Material', 3850, 'photo-1705493253575-e911888621ff', 'A close-woven blue-grey fabric piece for tailoring a men\'s everyday outfit.'],
  ['earth-tone-blend', 'Earth-Tone Unstitched Fabric', 4450, 'photo-1705493253566-1522b9015c58', 'A distinctive brown-and-black textile suitable for custom men\'s tailoring.'],
  ['chevron-textile', 'Chevron Pattern Suit Cloth', 4950, 'photo-1627051919241-58bfffc7db9b', 'A patterned unstitched textile for a tailored men\'s waistcoat or suit detail.'],
  ['natural-cotton', 'Natural Cotton Fabric Length', 3200, 'photo-1640747669771-b82a6e40f534', 'A folded length of cloth ready for tailoring into a comfortable men\'s outfit.'],
  ['soft-blue-cloth', 'Soft Blue Men\'s Suit Fabric', 3600, 'photo-1705493254173-7c2d7a7a83fe', 'A soft blue-grey fabric close-up selected for made-to-measure clothing.'],
  ['charcoal-fold', 'Charcoal Folded Suit Material', 4700, 'photo-1757382672943-88fce6500ba3', 'A charcoal textile with visible folds, ready to be cut and tailored.'],
  ['multicolor-weave', 'Multi-Tone Unstitched Cloth', 4100, 'photo-1705412877708-659120ce6538', 'A multi-tone fabric selection for a distinctive custom men\'s garment.']
]);

const womensStitchedProducts = collection('Clothes', 'Female', 'Stitched', fallbackImages.womensStitched, [
  ['rose-embroidered', 'Rose Embroidered Stitched Suit', 8950, 'photo-1773439878533-77383b20577c', 'A ready-stitched pink traditional suit with delicate embroidery and a matching scarf.'],
  ['sage-embroidered', 'Sage Green Stitched Shalwar Kameez', 9250, 'photo-1773439878222-c383967772de', 'A stitched light-green shalwar kameez with refined white embroidery.'],
  ['blue-embroidered', 'Blue Embroidered Occasion Suit', 11200, 'photo-1773439878514-65d4aeb43046', 'A ready-to-wear blue embroidered suit with a softly draped dupatta.'],
  ['grey-formal', 'Grey Formal Stitched Suit', 10500, 'photo-1773439878174-201b8b441e75', 'A graceful grey stitched outfit with dark embroidered details.'],
  ['sage-dupatta', 'Sage Dupatta Stitched Set', 9800, 'photo-1773439878193-be7f99e3bd49', 'A light-green ready-made outfit with coordinating embroidery and dupatta.'],
  ['grey-embroidered', 'Grey Embroidered Shalwar Kameez', 10900, 'photo-1773439878281-5aa23c34dcaa', 'A stitched grey traditional suit finished with black embroidery.'],
  ['beige-pink', 'Beige and Pink Stitched Suit', 8750, 'photo-1773439878390-05ec136e70a8', 'A warm beige stitched outfit accented with a contrasting pink scarf.'],
  ['light-green', 'Light Green Embroidered Ready Suit', 11900, 'photo-1773439877127-ecfe17c9eb62', 'A ready-to-wear light-green embroidered suit for festive daytime events.']
]);

const womensUnstitchedProducts = collection('Clothes', 'Female', 'Unstitched', fallbackImages.womensUnstitched, [
  ['multicolor-stack', 'Multicolour Unstitched Fabric Stack', 5850, 'photo-1624516268152-1e48624026ed', 'A stack of colourful unstitched fabric lengths for creating a custom women\'s suit.'],
  ['market-embroidered', 'Market-Style Embroidered Fabric Set', 7250, 'photo-1771074153197-89af3a969042', 'A bright selection of patterned unstitched cloth suited to a made-to-measure set.'],
  ['folded-cotton', 'Folded Cotton Suit Fabric', 4950, 'photo-1623310658847-33f12eaab710', 'Folded cloth pieces ready for tailoring into a comfortable women\'s suit.'],
  ['printed-dupatta-fabric', 'Printed Suit and Dupatta Fabric', 6250, 'photo-1622532470022-24107cac5ef3', 'A coordinated unstitched textile selection with scarf-weight fabric for a dupatta.'],
  ['assorted-textiles', 'Assorted Unstitched Textile Bundle', 5450, 'photo-1507434745378-235a6297156b', 'An assorted textile bundle for mixing and matching a custom outfit.'],
  ['embroidered-folds', 'Embroidered Folded Fabric Pieces', 7850, 'photo-1712852733629-c5b8194290e8', 'A selection of displayed fabric pieces with colour and surface detail for tailoring.'],
  ['soft-color-bundle', 'Folded Women\'s Unstitched Fabric Bundle', 5650, 'photo-1705250466297-90035b3a2b26', 'A folded bundle of unstitched cloth ready for a personalised women\'s suit.'],
  ['layered-cloth', 'Layered Unstitched Suit Material', 6950, 'photo-1722957533029-6b62a3826d05', 'Layered fabric pieces ready to be measured and tailored into a women\'s outfit.']
]);

const makeupProducts = collection('Makeup', 'All', 'All Makeup', fallbackImages.makeup, [
  ['rose-lipstick', 'Velora Rose Satin Lipstick', 1850, 'photo-1631214524115-9942bf927d4a', 'A smooth rose-toned lipstick with a comfortable satin finish for everyday wear.'],
  ['lip-gloss', 'Peach Glass Lip Gloss', 1450, 'photo-1631214524042-6177152a3980', 'A glossy lip finish in wearable peach tones with a smooth, non-sticky feel.'],
  ['liquid-foundation', 'Radiant Finish Liquid Foundation', 3250, 'photo-1776015036380-4022fe844ed8', 'A blendable liquid foundation designed to create an even-looking base.'],
  ['concealer', 'Soft Cover Concealer', 2150, 'photo-1643185450492-6ba77dea00f6', 'A creamy concealer product for targeted coverage and a smooth makeup base.'],
  ['face-powder', 'Velvet Touch Face Powder', 1950, 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp', 'A finely milled face powder to set makeup and soften visible shine.'],
  ['blush', 'Petal Pink Powder Blush', 1750, 'photo-1706067003154-bf1a01c58bbb', 'A soft pink powder blush for a natural-looking flush of colour.'],
  ['mascara', 'Lash Defining Mascara', 1650, 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp', 'A lash-defining mascara that helps add visible length and volume.'],
  ['eyeliner', 'Precision Black Eyeliner', 1350, 'https://d3t32hsnjxo7q6.cloudfront.net/i/4e88f928ad91c88e2ecb8596431ce799_ra,w158,h184_pa,w158,h184.png', 'A rich black eyeliner designed for smooth, controlled definition.'],
  ['eyeshadow-palette', 'Everyday Neutrals Eyeshadow Palette', 2850, 'photo-1590156424570-698d124ec7dd', 'A compact eyeshadow palette with wearable neutral shades for day or evening.'],
  ['face-primer', 'Smooth Wear Makeup Primer', 2450, 'photo-1623882150544-6e55b195a115', 'A makeup primer to prepare skin for an even, comfortable foundation application.'],
  ['setting-spray', 'Long-Wear Makeup Setting Spray', 2350, 'photo-1706067501076-b747fe8978aa', 'A fine mist setting spray to finish a makeup routine and help it wear well.'],
  ['brush-set', 'Soft Touch Makeup Brush Set', 2950, 'photo-1596462502278-27bfdc403348', 'A set of soft makeup brushes for applying and blending face and eye products.']
]);

export const localProducts = [
  ...walletProducts,
  ...watchProducts,
  ...jewelleryProducts,
  ...purseProducts,
  ...mensStitchedProducts,
  ...mensUnstitchedProducts,
  ...womensStitchedProducts,
  ...womensUnstitchedProducts,
  ...makeupProducts
];

export function combineProducts(apiProducts = []) {
  const seen = new Set();
  return [...localProducts, ...apiProducts].filter(product => {
    const key = `${product.source || 'local'}:${product.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function searchProducts(products, query) {
  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const terms = normalize(query).split(/\s+/).filter(term => term && term !== 's');
  if (!terms.length) return [];

  const equivalents = {
    accessory: ['accessories'],
    accessories: ['accessory'],
    clothes: ['clothing', 'apparel'],
    clothing: ['clothes', 'apparel'],
    cosmetics: ['makeup'],
    female: ['women', 'womens'],
    jewelry: ['jewellery'],
    jewellery: ['jewelry'],
    male: ['men', 'mens'],
    men: ['male', 'mens'],
    mens: ['male', 'men'],
    purse: ['purses'],
    purses: ['purse'],
    wallets: ['wallet'],
    watch: ['watches'],
    watches: ['watch'],
    women: ['female', 'womens'],
    womens: ['female', 'women']
  };

  return products.filter(product => {
    const searchableWords = normalize([
      product.title,
      product.description,
      product.parent,
      product.gender,
      product.category?.includes('/') ? '' : product.category
    ].filter(Boolean).join(' ')).split(/\s+/);
    if (terms.includes('stitched') && product.category?.toLowerCase() === 'unstitched') return false;
    return terms.every(term => [term, ...(equivalents[term] || [])]
      .some(candidate => searchableWords.some(word => word.startsWith(candidate))));
  });
}

export function searchSections(productCatalog, query) {
  const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const sections = [];
  for (const [parent, groups] of Object.entries(productCatalog)) {
    const normalizedParent = normalize(parent);
    if (terms.every(term => normalizedParent.split(/\s+/).some(word => word.startsWith(term)))) {
      sections.push({
        id: `category-${parent}`,
        type: 'category',
        title: parent,
        parent,
        subtitle: `Browse ${parent.toLowerCase()}`
      });
    }

    for (const [gender, subcategories] of Object.entries(groups)) {
      for (const title of subcategories) {
        const visibleTitle = parent === 'Makeup' ? parent : `${gender === 'Male' ? "Men's" : "Women's"} ${title}`;
        const searchableTitle = normalize(visibleTitle);
        const words = searchableTitle.split(/\s+/);
        if (!terms.every(term => words.some(word => word.startsWith(term)))) continue;
        if (parent === 'Accessories' && title.includes('/') && terms.some(term => ['purse', 'purses'].includes(term))) continue;

        sections.push({
          id: `subcategory-${parent}-${gender}-${title}`,
          type: 'subcategory',
          title: visibleTitle,
          parent,
          gender,
          subcategory: title,
          subtitle: `${parent} · ${gender} · ${title}`
        });
      }
    }
  }
  return sections;
}
