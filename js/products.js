const products = [
    // --- Accessories ---
    { id: 1, name: "Hair Scrunchie", price: 39, category: "Accessories", image: "https://placehold.co/400x400?text=Hair+Scrunchie" },
    { id: 2, name: "Hair Clips Set", price: 49, category: "Accessories", image: "https://placehold.co/400x400?text=Hair+Clips+Set" },
    { id: 3, name: "Claw Clip Large", price: 79, category: "Accessories", image: "https://placehold.co/400x400?text=Claw+Clip+Large" },
    { id: 4, name: "Mobile Cover Basic", price: 249, category: "Accessories", image: "https://placehold.co/400x400?text=Mobile+Cover+Basic" },
    { id: 5, name: "Women's Wallet", price: 399, category: "Accessories", image: "https://placehold.co/400x400?text=Women's+Wallet" },
    { id: 6, name: "Women Belt", price: 299, category: "Accessories", image: "https://placehold.co/400x400?text=Women+Belt" },
    { id: 7, name: "Fashion Sunglasses", price: 499, category: "Accessories", image: "https://placehold.co/400x400?text=Fashion+Sunglasses" },

    // --- Imitation Jewellery ---
    { id: 8, name: "Oxidised Earrings", price: 129, category: "Imitation Jewellery", image: "https://placehold.co/400x400?text=Oxidised+Earrings" },
    { id: 9, name: "Jhumkas Pair", price: 159, category: "Imitation Jewellery", image: "https://placehold.co/400x400?text=Jhumkas+Pair" },
    { id: 10, name: "Kundan Necklace Set", price: 349, category: "Imitation Jewellery", image: "https://placehold.co/400x400?text=Kundan+Necklace+Set" },
    { id: 11, name: "Daily Wear Chain", price: 149, category: "Imitation Jewellery", image: "https://placehold.co/400x400?text=Daily+Wear+Chain" },
    { id: 12, name: "Bracelet Fashion", price: 129, category: "Imitation Jewellery", image: "https://placehold.co/400x400?text=Bracelet+Fashion" },

    // --- Makeup ---
    { id: 13, name: "Lipstick Value", price: 199, category: "Makeup", image: "https://placehold.co/400x400?text=Lipstick+Value" },
    { id: 14, name: "Liquid Matte Lipstick", price: 349, category: "Makeup", image: "https://placehold.co/400x400?text=Liquid+Matte+Lipstick" },
    { id: 15, name: "Compact Powder", price: 249, category: "Makeup", image: "https://placehold.co/400x400?text=Compact+Powder" },
    { id: 16, name: "Foundation Mass", price: 349, category: "Makeup", image: "https://placehold.co/400x400?text=Foundation+Mass" },
    { id: 17, name: "Kajal Basic", price: 180, category: "Makeup", image: "https://placehold.co/400x400?text=Kajal+Basic" },
    { id: 18, name: "Kajal Premium", price: 315, category: "Makeup", image: "https://placehold.co/400x400?text=Kajal+Premium" },
    { id: 19, name: "Mascara Value", price: 299, category: "Makeup", image: "https://placehold.co/400x400?text=Mascara+Value" },
    { id: 20, name: "Nail Paint Basic", price: 69, category: "Makeup", image: "https://placehold.co/400x400?text=Nail+Paint+Basic" },
    { id: 21, name: "Nail Paint Premium", price: 149, category: "Makeup", image: "https://placehold.co/400x400?text=Nail+Paint+Premium" },

    // --- Skincare ---
    { id: 22, name: "Face Wash Basic", price: 149, category: "Skincare", image: "https://placehold.co/400x400?text=Face+Wash+Basic" },
    { id: 23, name: "Face Wash Premium", price: 259, category: "Skincare", image: "https://placehold.co/400x400?text=Face+Wash+Premium" },
    { id: 24, name: "Moisturizer Basic", price: 159, category: "Skincare", image: "https://placehold.co/400x400?text=Moisturizer+Basic" },
    { id: 25, name: "Moisturizer Premium", price: 349, category: "Skincare", image: "https://placehold.co/400x400?text=Moisturizer+Premium" },
    { id: 26, name: "Sunscreen Basic", price: 249, category: "Skincare", image: "https://placehold.co/400x400?text=Sunscreen+Basic" },
    { id: 27, name: "Sunscreen Premium", price: 399, category: "Skincare", image: "https://placehold.co/400x400?text=Sunscreen+Premium" },
    { id: 28, name: "Serum Vit C", price: 299, category: "Skincare", image: "https://placehold.co/400x400?text=Serum+Vit+C" },
    { id: 29, name: "Serum Niacinamide", price: 449, category: "Skincare", image: "https://placehold.co/400x400?text=Serum+Niacinamide" },
    { id: 30, name: "Sheet Mask Single", price: 59, category: "Skincare", image: "https://placehold.co/400x400?text=Sheet+Mask+Single" },

    // --- Haircare ---
    { id: 31, name: "Shampoo Basic", price: 149, category: "Haircare", image: "https://placehold.co/400x400?text=Shampoo+Basic" },
    { id: 32, name: "Shampoo Premium", price: 299, category: "Haircare", image: "https://placehold.co/400x400?text=Shampoo+Premium" },
    { id: 33, name: "Conditioner Basic", price: 169, category: "Haircare", image: "https://placehold.co/400x400?text=Conditioner+Basic" },
    { id: 34, name: "Conditioner Premium", price: 299, category: "Haircare", image: "https://placehold.co/400x400?text=Conditioner+Premium" },
    { id: 35, name: "Hair Oil Basic", price: 129, category: "Haircare", image: "https://placehold.co/400x400?text=Hair+Oil+Basic" },
    { id: 36, name: "Hair Oil Premium", price: 249, category: "Haircare", image: "https://placehold.co/400x400?text=Hair+Oil+Premium" },
    { id: 37, name: "Hair Serum Basic", price: 249, category: "Haircare", image: "https://placehold.co/400x400?text=Hair+Serum+Basic" },
    { id: 38, name: "Hair Serum Premium", price: 399, category: "Haircare", image: "https://placehold.co/400x400?text=Hair+Serum+Premium" },

    // --- Private Label ---
    { id: 39, name: "Cotton Leggings Basic", price: 299, category: "Private Label", image: "https://placehold.co/400x400?text=Leggings+Basic" },
    { id: 40, name: "Cotton Leggings Premium", price: 399, category: "Private Label", image: "https://placehold.co/400x400?text=Leggings+Premium" },
    { id: 41, name: "Jeggings Basic", price: 499, category: "Private Label", image: "https://placehold.co/400x400?text=Jeggings+Basic" },
    { id: 42, name: "Jeggings Premium", price: 799, category: "Private Label", image: "https://placehold.co/400x400?text=Jeggings+Premium" },
    { id: 43, name: "Cotton Top Basic", price: 349, category: "Private Label", image: "https://placehold.co/400x400?text=Cotton+Top+Basic" },
    { id: 44, name: "Cotton Top Premium", price: 499, category: "Private Label", image: "https://placehold.co/400x400?text=Cotton+Top+Premium" },
    { id: 45, name: "Long Tunic", price: 499, category: "Private Label", image: "https://placehold.co/400x400?text=Long+Tunic" },

    // --- Women Fashion ---
    { id: 46, name: "Casual Top Basic", price: 399, category: "Women Fashion", image: "https://placehold.co/400x400?text=Casual+Top+Basic" },
    { id: 47, name: "Casual Top Premium", price: 799, category: "Women Fashion", image: "https://placehold.co/400x400?text=Casual+Top+Premium" },
    { id: 48, name: "Casual Dress Basic", price: 699, category: "Women Fashion", image: "https://placehold.co/400x400?text=Casual+Dress+Basic" },
    { id: 49, name: "Casual Dress Premium", price: 1199, category: "Women Fashion", image: "https://placehold.co/400x400?text=Casual+Dress+Premium" },
    { id: 50, name: "Jeans Basic", price: 699, category: "Women Fashion", image: "https://placehold.co/400x400?text=Jeans+Basic" },
    { id: 51, name: "Jeans Premium", price: 1499, category: "Women Fashion", image: "https://placehold.co/400x400?text=Jeans+Premium" },
    { id: 52, name: "Palazzo Basic", price: 349, category: "Women Fashion", image: "https://placehold.co/400x400?text=Palazzo+Basic" },
    { id: 53, name: "Palazzo Premium", price: 699, category: "Women Fashion", image: "https://placehold.co/400x400?text=Palazzo+Premium" },

    // --- Ethnic Wear ---
    { id: 54, name: "Kurti Basic", price: 399, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Kurti+Basic" },
    { id: 55, name: "Kurti Premium", price: 799, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Kurti+Premium" },
    { id: 56, name: "Kurti Set Basic", price: 899, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Kurti+Set+Basic" },
    { id: 57, name: "Kurti Set Premium", price: 1699, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Kurti+Set+Premium" },
    { id: 58, name: "Dupatta Basic", price: 149, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Dupatta+Basic" },
    { id: 59, name: "Dupatta Premium", price: 349, category: "Ethnic Wear", image: "https://placehold.co/400x400?text=Dupatta+Premium" },

    // --- Men Fashion ---
    { id: 60, name: "T-shirt Basic", price: 349, category: "Men Fashion", image: "https://placehold.co/400x400?text=T-shirt+Basic" },
    { id: 61, name: "T-shirt Premium", price: 499, category: "Men Fashion", image: "https://placehold.co/400x400?text=T-shirt+Premium" },
    { id: 62, name: "Casual Shirt Basic", price: 499, category: "Men Fashion", image: "https://placehold.co/400x400?text=Casual+Shirt+Basic" },
    { id: 63, name: "Casual Shirt Premium", price: 799, category: "Men Fashion", image: "https://placehold.co/400x400?text=Casual+Shirt+Premium" },
    { id: 64, name: "Joggers Basic", price: 499, category: "Men Fashion", image: "https://placehold.co/400x400?text=Joggers+Basic" },
    { id: 65, name: "Joggers Premium", price: 899, category: "Men Fashion", image: "https://placehold.co/400x400?text=Joggers+Premium" },
    { id: 66, name: "Men Wallet", price: 299, category: "Men Fashion", image: "https://placehold.co/400x400?text=Men+Wallet" },

    // --- Beauty Tools ---
    { id: 67, name: "Makeup Sponge", price: 149, category: "Beauty Tools", image: "https://placehold.co/400x400?text=Makeup+Sponge" },
    { id: 68, name: "Tweezers Basic", price: 99, category: "Beauty Tools", image: "https://placehold.co/400x400?text=Tweezers+Basic" },
    { id: 69, name: "Tweezers Premium", price: 199, category: "Beauty Tools", image: "https://placehold.co/400x400?text=Tweezers+Premium" },
    { id: 70, name: "Compact Mirror", price: 99, category: "Beauty Tools", image: "https://placehold.co/400x400?text=Compact+Mirror" },
    { id: 71, name: "Travel Bottle Set", price: 199, category: "Beauty Tools", image: "https://placehold.co/400x400?text=Travel+Bottle+Set" },

    // --- Seasonal ---
    { id: 72, name: "Gift Hamper Basic", price: 499, category: "Seasonal", image: "https://placehold.co/400x400?text=Gift+Hamper+Basic" },
    { id: 73, name: "Gift Hamper Premium", price: 999, category: "Seasonal", image: "https://placehold.co/400x400?text=Gift+Hamper+Premium" },
    { id: 74, name: "Rain Poncho Basic", price: 299, category: "Seasonal", image: "https://placehold.co/400x400?text=Rain+Poncho+Basic" },
    { id: 75, name: "Rain Poncho Premium", price: 499, category: "Seasonal", image: "https://placehold.co/400x400?text=Rain+Poncho+Premium" },
    { id: 76, name: "Winter Beanie", price: 249, category: "Seasonal", image: "https://placehold.co/400x400?text=Winter+Beanie" },
    { id: 77, name: "Winter Gloves", price: 499, category: "Seasonal", image: "https://placehold.co/400x400?text=Winter+Gloves" }
];