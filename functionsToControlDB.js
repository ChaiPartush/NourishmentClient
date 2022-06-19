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

