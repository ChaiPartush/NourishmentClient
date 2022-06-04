const DeviceHost = "192.168.6.60";

export const GetNameAndImageByRangeInTableName = async (startIndex, endIndex, tableName) => {
    const body = { startIndex, endIndex, tableName };
    const a = await fetch(`http://${DeviceHost}:3000/food//getNameAndImageOfItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    const b = await a.json()
    return b
}

export const GetItemsToDisplay = async () => {
    it = await GetNameAndImageByRangeInTableName(1, 2, "\"foodType_fats\"")
    return it
}