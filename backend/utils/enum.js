function auditLogTypes(quantity, room, issuetype) {
    const enumObject = {
        RESERVE: { name: "RESERVE", template: `${quantity} ${quantity > 1 ? "items" : "item"} assigned to ${room}.`},
        LOSS: { name: "LOSS", template: `${quantity} ${quantity > 1 ? "items" : "item"} missing from ${room}.`},
        DAMAGE: { name: "DAMAGE", template: `${quantity} ${quantity > 1 ? "items" : "item"} damaged from ${room}.`},
        RECOUNT: { name: "RECOUNT", template: `Stock count updated to ${quantity} ${quantity > 1 ? "items" : "item"}.`},
        RECEIVE: { name: "RECEIVE", template: `Restocked ${quantity} ${quantity > 1 ? "items" : "item"}.`},
        RESOLVE: { name: "RESOLVE", template: `${quantity} ${quantity > 1 ? "items" : "item"} resolved and returned to inventory.`},
        RETURN: { name: "RETURN", template: `${quantity} ${quantity > 1 ? "items" : "item"} returned from ${room}`},   
        REPORT: { name: "REPORT", template: `${quantity} ${quantity > 1 ? "items" : "item"} reported${issuetype ? " " + issuetype : ""}${room ? " from " + room : ""}.`},   
    }
    return Object.freeze(enumObject);
  }

module.exports = {auditLogTypes}