const AvailabilityStatus = {
  kAvailable: 0,
  kNotAvailable: 1,
  kInternalError: 2,
};

const checkIsAvailableQuantity = (itemObj, q) => {
  const quantity = Number(q)
  let result = AvailabilityStatus.kAvailable;
  try {
    let numUnavailable = itemObj.roomitems.reduce(
      (partialSum, roomitem) => partialSum + roomitem.quantity,
      0
    );
    numUnavailable += itemObj.issues.reduce(
      (partialSum, issue) => partialSum + issue.quantity,
      0
    );
    if (numUnavailable + quantity > itemObj.totalcount) {
      result = AvailabilityStatus.kNotAvailable;
    }
  } catch (err) {
    result = AvailabilityStatus.kInternalError;
  }
  return result;
};

module.exports = { AvailabilityStatus, checkIsAvailableQuantity };
