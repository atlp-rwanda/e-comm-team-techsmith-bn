async function validateQuantity(model, modelId, desiredQuantity, res) {
  try {
    const result = await model.findOne({
      where: { id: modelId },
    });
    if (desiredQuantity > result.dataValues.quantity) {
      return false;
    }
    return result.dataValues.quantity;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
export default validateQuantity;
