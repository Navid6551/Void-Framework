const getRestaurantById = async(pRestaurant) => {
    const result = await SQL.execute('SELECT * FROM _restaurants WHERE code = @code', {
        ["code"]: pRestaurant
    })
    if (!result[0]) {
        return undefined
    }

    return {
        ...result[0],
        foodItems: JSON.parse(result[0].foodItems),
        dailyMenu: JSON.parse(result[0].dailyMenu),
        workHours: JSON.parse(result[0].workHours),
    }
}

RPC.register('vrp-restaurants:getFoodItems', async(pSource, pRestaurant) => {
    const result = await getRestaurantById(pRestaurant)

    if (!result) {
        return []
    }

    return result.foodItems
})

RPC.register('vrp-restaurants:getWorkHours', async(pSource, pBiz) => {
    const result = await getRestaurantById(pBiz)
    if (!result) {
        return []
    }

    return [
        { 
            title: `Opening Hour: ${result.workHours[0]}`, 
            icon: 'business-time', 
            key: 'open' 
        },
        { 
            title: `Closing Hour: ${result.workHours[1]}`, 
            icon: 'store-slash', 
            key: 'close' 
        },
    ]
})

RPC.register('vrp-restaurants:createFoodItem', async(pSource, pData) => {
    const foodIngredient = []
    const restaurant = pData.key.restaurant
    const itemData = pData.values
    const result = await getRestaurantById(restaurant)
    if (!result) {
        return []
    }

    for (let i = 1; i <= 5; i++) {
        if (pData.values[`ingredient_type_${i}`]) {
            foodIngredient.push(pData.values[`ingredient_type_${i}`])
        }
    }

    if (foodIngredient.length < 1) {
        emitNet('DoLongHudText', pSource, "You must select at least one ingredient type.", 2)
        return false
    }

    const foodItems = result.foodItems
    const newFood = {
        id: foodItems.length + 1,
        name: itemData.name,
        description: itemData.description,
        food_type: pData.key.food_type,
        image_url: itemData.image_url ?? "",
        restaurant: restaurant,
        data: JSON.stringify({ ingredients: foodIngredient })
    }
    foodItems.push(newFood)

    const update = await SQL.execute("UPDATE _restaurants SET foodItems = @foodItems WHERE code = @code", {
        foodItems: JSON.stringify(foodItems),
        code: restaurant
    })

    if (!update) {
        return false
    }
    emitNet('vrp-restaurants:changedFoodItems', -1, restaurant)
    return true
})

RPC.register('vrp-restaurants:fetchMenu', async(pSource, pRestaurant) => {
    const result = await getRestaurantById(pRestaurant)

    if (!result) {
        return []
    }

    return result.dailyMenu
})

RPC.register('vrp-restaurants:setMenu', async(pSource, pRestaurant, pDishes) => {
    const update = await SQL.execute("UPDATE _restaurants SET dailyMenu = @dailyMenu WHERE code = @code", {
        dailyMenu: JSON.stringify(pDishes),
        code: pRestaurant
    })

    if (!update) {
        return false
    }

    emitNet("vrp-restaurants:changedMenuItems", -1, pRestaurant)

    return true
})

RPC.register('vrp-restaurants:setWorkHours', async(pSource, pRestaurant, pOpen, pClose) => {
    const update = await SQL.execute("UPDATE _restaurants SET dailyMenu = @dailyMenu WHERE code = @code", {
        dailyMenu: JSON.stringify([pOpen, pClose]),
        code: pRestaurant
    })

    if (!update) {
        return false
    }

    return true
})