const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
  },
  itemName: {
    type: String,
  },
  itemImage: {
    type: String,
  },
  itemDescription: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  itemCalorie: {
    type: String,
  },
  itemTag: {
    type: Boolean,
    default: false,
  },
  itemLabel: [
    {
      Name: {
        type: String,
      },
      Signature: {
        type: String,
      },
      Special_Presentation: {
        type: String,
      },
    },
  ],
  itemWarning: [
    {
      Alcohol: {
        type: String,
      },
      AlcoholFree: {
        type: String,
      },
    },
  ],
  itemPrepTime: {
    type: String,
  },
  itemPrice: {
    type: String,
  },
  itemCalories: {
    type: String,
  },
  itemPriceOption: [
    {
      name: {
        type: String,
      },
      price: {
        type: String,
      },
      calories: {
        type: String,
      },
    },
  ],
  itemSaturatedFatPercentage: {
    type: String,
  },
  itemTransFat: {
    type: String,
  },
  itemTransFatPercentage: {
    type: String,
  },
  itemCholesterol: {
    type: String,
  },
  itemCholesterolPercentage: {
    type: String,
  },
  itemSodium: {
    type: String,
  },
  itemSodiumPercentage: {
    type: String,
  },
  itemTotalCarbs: {
    type: String,
  },
  itemTotalCarbsPercentage: {
    type: String,
  },
  itemDietaryFiber: {
    type: String,
  },
  itemDietaryFiberPercentage: {
    type: String,
  },
  itemSugar: {
    type: String,
  },
  itemSugarPercentage: {
    type: String,
  },
  itemProtein: {
    type: String,
  },
  itemProteinPercentage: {
    type: String,
  },
  itemVitaminA: {
    type: String,
  },
  itemVitaminC: {
    type: String,
  },
  itemIron: {
    type: String,
  },
  itemCalcium: {
    type: String,
  },
  itemTotalFat: {
    type: String,
  },
  itemSaturatedFat: {
    type: String,
  },
  itemNutritionCalories: {
    type: String,
  },
  itemCaloriesFat: {
    type: String,
  },
  itemServingSize: {
    type: String,
  },
  itemModifier: [
    {
      groupname: {
        type: String,
      },
      min: {
        type: String,
      },
      max: {
        type: String,
      },
      reference: [
        {
          Name: {
            type: String,
          },
          Price: {
            type: String,
          },
          Calorie: {
            type: String,
          },
        },
      ],
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Item", itemSchema);
