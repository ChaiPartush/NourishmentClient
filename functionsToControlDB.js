import { db } from "./config"
import { FoodTypes } from "./constants/Logics/FoodTypes"

export const AddItem = (foodType, docName, objectProerties) => {
    db.collection('/foodType_' + FoodTypes[foodType]).doc(docName).set(objectProerties)
}

export const DeleteItem = (foodType, docName) => {
    db.collection('/foodType_' + FoodTypes[foodType]).doc(docName).delete()
}

export const UpdateItemFields = (foodType, docName, objectUpdateFields) => {
    db.collection('/foodType_' + FoodTypes[foodType]).doc(docName).update(objectUpdateFields)
}

export const UpdateDocName = (foodType, curentDocName, newDocName) => {
    // get the data from 'name@xxx.com'
    db.collection('/foodType_' + FoodTypes[foodType]).doc(curentDocName).get().then((doc) => {
        if (doc && doc.exists) {
            var data = doc.data();
            // saves the data to 'name'
            db.collection('/foodType_' + FoodTypes[foodType]).doc(newDocName).set(data).then(() => {
                // deletes the old document
                db.collection('/foodType_' + FoodTypes[foodType]).doc(curentDocName).delete()
            });
        }
    });

}

export const getProductObject = async (productName) => {
    for (let foodType in FoodTypes) {
        const parentFoodString = "/foodType_" + foodType
        const item = db.collection(parentFoodString).doc(productName)
        const doc = await item.get()
        if (doc.exists) {
            const itemObj = {
                caloriesFor100Grams: doc.data()["caloriesFor100Grams"],
                carbohydratesFor100Grams: doc.data()["carbohydratesFor100Grams"],
                fatsFor100Grams: doc.data()["fatsFor100Grams"],
                name: doc.data()["name"],
                protainsFor100Grams: doc.data()["protainsFor100Grams"],
                type: doc.data()["type"]
            }
            console.log(itemObj)
            return itemObj
        }
    }
}

