

const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hamburger.png")
}

const hamburger1 = {
    id: 2,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hamburger.png")
}

const hamburger2 = {
    id: 3,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hamburger.png")
}

const hamburger3 = {
    id: 4,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hamburger.png")
}

const hotTacos = {
    id: 5,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hot_tacos.png")
}

const hotTacos1 = {
    id: 6,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hot_tacos.png")
}

const hotTacos2 = {
    id: 7,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hot_tacos.png")
}

const hotTacos3 = {
    id: 8,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/hot_tacos.png")
}

const vegBiryani = {
    id: 9,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/veg_biryani.png")
}

const vegBiryani1 = {
    id: 10,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/veg_biryani.png")
}

const vegBiryani2 = {
    id: 11,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/veg_biryani.png")
}

const vegBiryani3 = {
    id: 12,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/veg_biryani.png")
}

const wrapSandwich = {
    id: 13,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/wrap_sandwich.png")
}

const wrapSandwich1 = {
    id: 14,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/wrap_sandwich.png")
}

const wrapSandwich2 = {
    id: 15,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/wrap_sandwich.png")
}

const wrapSandwich3 = {
    id: 16,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require('../../../../assets/images/QuestionsToUserScreensImages/ChooseCarbohydratesImages/wrap_sandwich.png')
}

export const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, hamburger1, hamburger2, hamburger3,
            hotTacos, hotTacos1, hotTacos2, hotTacos3,
            wrapSandwich, wrapSandwich1, wrapSandwich2, wrapSandwich3,
            vegBiryani, vegBiryani1, vegBiryani2, vegBiryani3,
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]




